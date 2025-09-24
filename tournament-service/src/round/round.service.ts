import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddRoundRequestDto, RoundStatus, TournamentStatus } from 'assignment-duels-types';
import { DuelService } from '../duel/duel.service';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

import { TournamentResultService } from '../tournament-result/tournament-result.service';
import { ParticipantService } from '../participant/participant.service';
import { TournamentService } from '../tournament/tournament.service';

@Injectable()
export class RoundService {
  constructor(private readonly prismaService: PrismaService, private readonly duelService: DuelService, private readonly tournamentResultService: TournamentResultService) {
  }

  public async create(dto: AddRoundRequestDto, participantIds: string[]) {
    const { number, tournamentId } = dto;
    const round = await this.prismaService.round.create({
      data: {
        number,
        tournamentId,
      },
    });
    await this.duelService.create({ participantIds, roundId: round.id });

    // Возвращаем созданный раунд
    return round;
  }

  public async completeRound(roundId: string) {
    const currentRound = await this.prismaService.round.findUnique({ where: { id: roundId } });
    if (!currentRound) throw new RpcException({ code: 5, message: 'раунд не найден' });
    if (currentRound.status === 'FINISHED') throw new RpcException({ code: 6, message: 'раунд уже завершен' });
    const resultDuels = await this.duelService.completeDuels(roundId);
    resultDuels.map(async (duel) => {
      await this.prismaService.duel.update({
        where: { id: duel.id },
        data: { winnerId: duel.winnerId, status: duel.status },
      });
    });
    await this.prismaService.round.update({
      where: { id: roundId },
      data: { status: RoundStatus.FINISHED },
    });
    const tournament = await this.prismaService.tournament.findUnique({ where: { id: currentRound.tournamentId } });

    const losersResults = await this.tournamentResultService.createResultsForEliminatedPlayers(currentRound.number, currentRound.tournamentId, resultDuels);
    if (tournament && tournament.maxRounds === currentRound.number) {
      await this.prismaService.tournament.update({
        where: { id: tournament.id },
        data: { status: TournamentStatus.FINISHED },
      });
      if (!resultDuels[0].winnerId) throw new RpcException({})
      await this.tournamentResultService.createWinneResult(currentRound.number, currentRound.tournamentId, resultDuels[0].winnerId)
      return { winner: resultDuels[0].winnerId };
    }
    return losersResults;
  }

  public async findById(id: string) {
    return this.prismaService.round.findUnique({
      where: { id },
    });
  }

  // public async generateNextRound(dto: AddRoundRequestDto) {
  //   const {tournamentId, number} = dto
  //   const tournament = await this.prismaService.tournament.findUnique({where: {id: tournamentId}})
  //   if (!tournament) throw new RpcException({code: 5, message: 'турнир не найден'})
  //   if (tournament.status === TournamentStatus.FINISHED) throw new RpcException(({code: 6, message: 'турнир уже закончен'}))
  //   const participants = await this.prismaService.tournamentUser.findMany({where: {tournamentId}})
  //   const results = await this.tournamentService.getResults({tournamentId})
  //   const restParticipants = participants.filter((user) => {
  //     return !results.some(loser => loser.id === user.id)
  //   })
  // }
}

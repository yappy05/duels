import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddRoundRequestDto, RoundStatus, TournamentStatus } from 'assignment-duels-types';
import { DuelService } from '../duel/duel.service';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

import { TournamentResultService } from '../tournament-result/tournament-result.service';

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
    if (tournament && tournament.maxRounds === currentRound.number) {
      await this.prismaService.tournament.update({
        where: { id: tournament.id },
        data: { status: TournamentStatus.FINISHED },
      });
      return { winner: resultDuels[0].winnerId };
    }
    const losersResults = await this.tournamentResultService.createResultsForEliminatedPlayers(currentRound.number, currentRound.tournamentId, resultDuels);
    // return resultDuels;
    return losersResults;
  }

  public async findById(id: string) {
    return this.prismaService.round.findUnique({
      where: { id },
    });
  }
}

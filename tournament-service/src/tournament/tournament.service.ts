import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  AddRoundRequestDto,
  CreateTournamentRequestDto,
  RoundResponseDto,
  TournamentInfo, TournamentStatus,
} from 'assignment-duels-types';
import { RpcException } from '@nestjs/microservices';
// import { TournamentUserService } from '../tournament-user/tournament-user.service';
import { AddParticipantRequestDto } from 'assignment-duels-types';
import { RoundService } from '../round/round.service';
import { ParticipantService } from '../participant/participant.service';

@Injectable()
export class TournamentService {
  constructor(private readonly prismaService: PrismaService, private readonly roundService: RoundService, private readonly participantService: ParticipantService) {
  }

  public async create(dto: CreateTournamentRequestDto) {
    console.log('start');
    const { name, countParticipants, participantIds } = dto;
    if (participantIds.length !== countParticipants)
      throw new RpcException({
        code: 3,
        message:
          'количество участников и количество переданных id не совпадает',
      });
    const maxRounds = Math.ceil(Math.log2(countParticipants));
    const tour = await this.prismaService.tournament.create({
      data: {
        name,
        countParticipants,
        maxRounds,
      },
    });

    const participantsData: AddParticipantRequestDto[] = participantIds.map(userId => ({
      tournamentId: tour.id,
      userId,
    }));

    await this.participantService.create(participantsData);
    await this.roundService.create({ number: 1, tournamentId: tour.id }, participantIds);
    await this.prismaService.tournament.update({
      where: { id: tour.id },
      data: { currentRoundNumber: 1 },
    });
    return this.prismaService.tournament.findUnique({
      where: { id: tour.id },
      include: {
        rounds: true,
      },
    });
  }

  public async getRounds(dto: TournamentInfo) {
    const tournament = await this.prismaService.tournament.findUnique({ where: { id: dto.tournamentId } });
    if (!tournament) throw new RpcException({ code: 5, message: 'турнир не найден' });
    if (!tournament) throw new RpcException({ code: 5, message: 'турнир не найден' });
    const { maxRounds } = tournament;
    const activeRounds = await this.prismaService.round.findMany({
      where: { tournamentId: dto.tournamentId },
    });
    const rounds: any = [];
    for (let i = 0; i < maxRounds; i++) {
      const round = activeRounds[i];
      if (!round) rounds.push({ id: null, number: i+1 , message: 'раунд еще не начался' });
      else rounds.push(round)
    }
    return rounds
  }

  public async getResults(dto: TournamentInfo) {
    const tournament = await this.prismaService.tournament.findUnique({ where: { id: dto.tournamentId } });
    if (!tournament) throw new RpcException({ code: 5, message: 'турнир не найден' });
    const { maxRounds } = tournament;
    const eliminatedUsers = await this.prismaService.tournamentResult.findMany({
      where: { tournamentId: dto.tournamentId },
      orderBy: { stageEliminated: 'asc' },
    });
    const maxPosition = Math.pow(maxRounds, 2);
    const positions: { position: number; userId: string | null; id: string | null }[] = [];

    for (let i = 0; i < maxPosition; i++) {
      const positionNumber = maxPosition - i; // первым достается maxPosition, затем maxPosition-1 и т.д.
      const eliminatedUser = eliminatedUsers[i];

      positions.push({
        position: positionNumber,
        userId: eliminatedUser?.userId || null,
        id: eliminatedUser?.id || null,
      });
    }

    positions.sort((a, b) => a.position - b.position);

    return positions;
  }

  public async getWinner(dto: TournamentInfo) {
    const results = await this.getResults(dto);
    console.log(results)
    if (!results[0].userId) {
      return { winnerId: null, message: 'Победитель еще не определен. Турнир не закончился' };
    }
    return { winnerId: results[0].userId };
  }

  public async getParticipants(dto: TournamentInfo) {
    const { tournamentId } = dto;
    return this.prismaService.tournamentUser.findMany({ where: { tournamentId } });
  }

  public async generateNextRound(dto: AddRoundRequestDto) {
    const {tournamentId, number} = dto
    const tournament = await this.prismaService.tournament.findUnique({where: {id: tournamentId}})
    if (!tournament) throw new RpcException({code: 5, message: 'турнир не найден'})
    if (tournament.status === TournamentStatus.FINISHED) throw new RpcException(({code: 6, message: 'турнир уже закончен'}))
    const participants = await this.prismaService.tournamentUser.findMany({where: {tournamentId}})
    console.log(' participants: ', participants)
    const results = await this.getResults({tournamentId})
    console.log(' results: ', results)
    const restParticipants: string[] = participants.filter((user) => {
      return !results.some(result => result.userId === user.userId && result.userId !== null)
    }).map((user) => user.userId)
    console.log(' restParticipants: ', restParticipants)
    return  this.roundService.create(dto, restParticipants)
  }

}

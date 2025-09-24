import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTournamentRequestDto, TournamentInfo } from 'assignment-duels-types';
import { RpcException } from '@nestjs/microservices';
// import { TournamentUserService } from '../tournament-user/tournament-user.service';
import { AddParticipantRequestDto } from 'assignment-duels-types';
import { RoundService } from '../round/round.service';

@Injectable()
export class TournamentService {
  constructor(private readonly prismaService: PrismaService, private readonly roundService: RoundService) {
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

    // await this.tournamentUserService.create(participantsData)
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
    return this.prismaService.round.findMany({
      where: { tournamentId: dto.tournamentId },
    });
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
    const results = await this.getResults(dto)
    if (!results[0].userId) {
      return {winnerId: null, message: 'Победитель еще не определен. Турнир не закончился'}
    }
    return {winnerId: results[0].userId}
  }

  public
}

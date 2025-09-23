import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTournamentRequestDto } from 'assignment-duels-types';
import { RpcException } from '@nestjs/microservices';
import { TournamentUserService } from '../tournament-user/tournament-user.service';
import { AddParticipantRequestDto } from 'assignment-duels-types';
import { RoundService } from '../round/round.service';

@Injectable()
export class TournamentService {
  constructor(private readonly prismaService: PrismaService, private readonly tournamentUserService: TournamentUserService, private readonly roundService: RoundService) {
  }

  public async create(dto: CreateTournamentRequestDto) {
    console.log('start')
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

    await this.tournamentUserService.createMany(participantsData);
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
}

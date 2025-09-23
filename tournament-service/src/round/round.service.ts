import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddRoundRequestDto } from '../../../shared/lib/types/src';
import { DuelService } from '../duel/duel.service';

@Injectable()
export class RoundService {
  constructor(private readonly prismaService: PrismaService, private readonly duelService: DuelService) {
  }

  public async create(dto: AddRoundRequestDto, participantIds: string[]) {
    const { number, tournamentId } = dto;
    const round = await this.prismaService.round.create({
      data: {
        number,
        tournamentId,
      },
    });
    await this.duelService.create({participantIds, roundId: round.id})
  }
}

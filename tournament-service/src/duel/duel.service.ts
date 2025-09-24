import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DuelResponseDto, GenerateDuelsRequestDto } from 'assignment-duels-types';
import { RoundService } from '../round/round.service';
import { DUEL_CLIENT } from './constants/constants';
import { ClientProxy } from '@nestjs/microservices';
import { concatMapTo, firstValueFrom } from 'rxjs';

@Injectable()
export class DuelService {
  constructor(private readonly prismaService: PrismaService, @Inject(DUEL_CLIENT) private readonly duelClient: ClientProxy) {
  }

  public async create(dto: GenerateDuelsRequestDto) {
    const { participantIds, roundId } = dto;
    const pairs = participantIds.reduce<string[][]>((result, item, index) => {
      if (index % 2 === 0) {
        result.push(participantIds.slice(index, index + 2));
      }
      return result;
    }, []);

    const duels = pairs.map((pair) => ({
      roundId,
      player1Id: pair[0],
      player2Id: pair[1],
    }));

    return this.prismaService.duel.createMany({
      data: duels,
    });
  }

  public async completeDuels(roundId: string) {
    const duels = await this.prismaService.duel.findMany({
      where: { roundId },
    });
    const resultDuels: DuelResponseDto[] = await firstValueFrom(this.duelClient.send('process', duels));
    return resultDuels;
  }
}

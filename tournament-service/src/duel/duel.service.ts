import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GenerateDuelsRequestDto } from '../../../shared/lib/types/src';

@Injectable()
export class DuelService {
  constructor(private readonly prismaService: PrismaService) {
  }

  public create(dto: GenerateDuelsRequestDto) {
    const {participantIds, roundId} = dto
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
}

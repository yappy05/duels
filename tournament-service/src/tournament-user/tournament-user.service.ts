import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddParticipantRequestDto } from '../../../shared/lib/types';

@Injectable()
export class TournamentUserService {
  constructor(private readonly prismaService: PrismaService) {
  }

  public createMany(dto: AddParticipantRequestDto[]) {
    return this.prismaService.tournamentUser.createMany({
      data: dto
    })
  }
}

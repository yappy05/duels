import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddParticipantRequestDto } from 'assignment-duels-types';

@Injectable()
export class ParticipantService {
  constructor(public readonly prismaService: PrismaService) {
  }
  public create(dto: AddParticipantRequestDto[]) {
    console.log(dto)
    return this.prismaService.tournamentUser.createMany({data: dto})
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DuelResponse } from 'assignment-duels-types';

@Injectable()
export class TournamentResultService {
  constructor(private readonly prismaService: PrismaService) {
  }

  public async createResultsForEliminatedPlayers(stageEliminated: number, tournamentId: string, completedDuels: DuelResponse[]) {
    const losers = completedDuels.map((duel) => duel.winnerId === duel.player1Id ? duel.player2Id : duel.player1Id)
    return  Promise.all(losers.map(async (loserId) => {
      return this.prismaService.tournamentResult.create({
        data: {tournamentId, stageEliminated, userId: loserId}
      })
    }))
  }
  public async createWinneResult(stageEliminated: number, tournamentId: string, winnerId: string) {
    return this.prismaService.tournamentResult.create({
      data: {tournamentId, stageEliminated, userId: winnerId}
    })
  }
}

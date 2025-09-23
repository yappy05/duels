import { Module } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentController } from './tournament.controller';
import { TournamentUserService } from '../tournament-user/tournament-user.service';
import { RoundService } from '../round/round.service';
import { PrismaModule } from '../prisma/prisma.module';
import { DuelService } from '../duel/duel.service';

@Module({
  controllers: [TournamentController],
  providers: [TournamentService, TournamentUserService, RoundService, DuelService],
  exports: [TournamentService]
})
export class TournamentModule {}

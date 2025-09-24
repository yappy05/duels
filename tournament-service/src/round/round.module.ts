import { Module } from '@nestjs/common';
import { RoundService } from './round.service';
import { RoundController } from './round.controller';
import { DuelService } from '../duel/duel.service';
import { TournamentService } from '../tournament/tournament.service';

@Module({
  controllers: [RoundController],
  providers: [RoundService, TournamentService],
  exports: [RoundService]
})
export class RoundModule {}

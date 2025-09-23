import { Module } from '@nestjs/common';
import { RoundService } from './round.service';
import { RoundController } from './round.controller';
import { DuelService } from '../duel/duel.service';

@Module({
  controllers: [RoundController],
  providers: [RoundService, DuelService],
  exports: [RoundService]
})
export class RoundModule {}

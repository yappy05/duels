import { Module } from '@nestjs/common';
import { DuelService } from './duel.service';
import { DuelController } from './duel.controller';

@Module({
  controllers: [DuelController],
  providers: [DuelService],
  exports: [DuelService]
})
export class DuelModule {}

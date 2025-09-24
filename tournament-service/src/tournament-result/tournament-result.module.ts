import { Global, Module } from '@nestjs/common';
import { TournamentResultService } from './tournament-result.service';
import { TournamentResultController } from './tournament-result.controller';

@Global()
@Module({
  controllers: [TournamentResultController],
  providers: [TournamentResultService],
  exports: [TournamentResultService]
})
export class TournamentResultModule {}

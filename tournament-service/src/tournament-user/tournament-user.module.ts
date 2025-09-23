import { Module } from '@nestjs/common';
import { TournamentUserService } from './tournament-user.service';
import { TournamentUserController } from './tournament-user.controller';
import { TournamentService } from '../tournament/tournament.service';

@Module({
  controllers: [TournamentUserController],
  providers: [TournamentUserService],
  exports: [TournamentService]
})
export class TournamentUserModule {}

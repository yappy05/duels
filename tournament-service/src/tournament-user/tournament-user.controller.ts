import { Controller } from '@nestjs/common';
import { TournamentUserService } from './tournament-user.service';

@Controller('tournament-user')
export class TournamentUserController {
  constructor(private readonly tournamentUserService: TournamentUserService) {}
}

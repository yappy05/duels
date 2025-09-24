import { Controller } from '@nestjs/common';
import { TournamentResultService } from './tournament-result.service';

@Controller('tournament-result')
export class TournamentResultController {
  constructor(private readonly tournamentResultService: TournamentResultService) {}
}

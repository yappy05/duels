import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateTournamentRequestDto } from 'assignment-duels-types';
import { TournamentService } from './tournament/tournament.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly  tournamentService: TournamentService) {}

  @MessagePattern('ping')
  public pong() {
    return { message: 'pong' };
  }
  //tournament
  //
  //
  //
  @MessagePattern('create-tournament')
  public createTour(dto: CreateTournamentRequestDto) {
    return this.tournamentService.create(dto)
  }
}

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateTournamentRequestDto } from '../../shared/lib/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('ping')
  public pong() {
    return { message: 'pong' };
  }
  //tournament
  //
  //
  //
  @MessagePattern('tournament/create')
  public createTour(dto: CreateTournamentRequestDto) {

  }
}

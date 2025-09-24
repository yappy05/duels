import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AddRoundRequestDto, CreateTournamentRequestDto, TournamentInfo } from 'assignment-duels-types';
import { TournamentService } from './tournament/tournament.service';
import { RoundService } from './round/round.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly  tournamentService: TournamentService, private readonly roundService: RoundService) {}

  @MessagePattern('ping')
  public pong() {
    return { message: 'pong' };
  }
  //
  //
  //
  //
  //
  //tournament

  @MessagePattern('create-tournament')
  public createTour(dto: CreateTournamentRequestDto) {
    return this.tournamentService.create(dto)
  }

  @MessagePattern('new-round')
  private createNewRound(dto: AddRoundRequestDto) {
    return this.tournamentService.generateNextRound(dto)
  }

  @MessagePattern('get-rounds')
  public getAllRounds(dto: TournamentInfo) {
    return this.tournamentService.getRounds(dto)
  }

  @MessagePattern('get-results')
  public getAllResults(dto: TournamentInfo) {
    return this.tournamentService.getResults(dto)
  }

  @MessagePattern('get-winner')
  public getWinner(dto: TournamentInfo) {
    return this.tournamentService.getWinner(dto)
  }
  @MessagePattern('get-participants')
  private getParticipants(dto: TournamentInfo) {
    return this.tournamentService.getParticipants(dto)
  }

  //
  //
  //
  //
  //
  // round

  @MessagePattern('complete-round')
  public completeRound(@Payload() roundId: string) {
    return this.roundService.completeRound(roundId)
  }
}

import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  TOURNAMENT_QUEUE_CLIENT,
  USER_QUEUE_CLIENT,
} from './common/lib/constants';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateTournamentRequestDto, UserPointsRequestDto, UserRequestDto } from '../../shared/lib/types';

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(USER_QUEUE_CLIENT) private readonly userClient: ClientProxy,
    @Inject(TOURNAMENT_QUEUE_CLIENT)
    private readonly tournamentClient: ClientProxy,
  ) {}

  @Get('user-health')
  public userHealth() {
    return firstValueFrom(this.userClient.send('ping', {}));
  }

  @Get('tournament-health')
  public tournamentHealth() {
    return firstValueFrom(this.tournamentClient.send('ping', {}));
  }

  @Post('user/register')
  public createUser(@Body() dto: UserRequestDto) {
    return firstValueFrom(this.userClient.send('register', dto));
  }

  @Get('user/by-id/:id')
  public findUserById(@Param('id') id: string) {
    return firstValueFrom(this.userClient.send('find-by-id', id));
  }

  @Get('user/by-username')
  public findUserByUsername(@Query('username') username: string) {
    return firstValueFrom(this.userClient.send('find-by-username', username));
  }

  @Get('user/find-all')
  public findAllUsers() {
    return firstValueFrom(this.userClient.send('find-all', {}));
  }

  @Post('user/increase-rate')
  public increase(@Body() dto: UserPointsRequestDto) {
    this.userClient.emit('increase-rate', dto);
  }

  @Post('user/decrease-rate')
  public decrease(@Body() dto: UserPointsRequestDto) {
    this.userClient.emit('decrease-rate', dto);
  }

  //tournament
  //
  //
  //
  //
  //

  @Post('tournament/create')
  public create(@Body() dto: CreateTournamentRequestDto) {
    return firstValueFrom(this.tournamentClient.send('create-tournament', dto));
  }
}

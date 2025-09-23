import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import {
  TOURNAMENT_QUEUE_CLIENT,
  USER_QUEUE_CLIENT,
} from './common/lib/constants';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

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
}

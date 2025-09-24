import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { DuelResponseDto } from '../../shared/lib/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('process')
  public processDuels(dto: DuelResponseDto[]) {
    return this.appService.process(dto);
  }
}

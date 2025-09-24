import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserPointsRequestDto, UserRequestDto } from 'assignment-duels-types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('ping')
  public pong() {
    return { message: 'pong' };
  }

  @MessagePattern('register')
  public create(dto: UserRequestDto) {
    return this.appService.create(dto);
  }

  @MessagePattern('find-by-id')
  public findAll(@Payload() id: string) {
    return this.appService.findById(id);
  }

  @MessagePattern('find-by-username')
  public findById(@Payload() username: string) {
    return this.appService.findByUsername(username);
  }

  @MessagePattern('find-all')
  public findUsers(@Payload() participantIds: string[]) {
    return this.appService.findUsersByIds(participantIds);
  }

  @MessagePattern('find-all')
  public find() {
    return this.appService.findAll();
  }
  @MessagePattern('increase-rate')
  public increase(@Payload() dto: UserPointsRequestDto) {
    console.log(dto);
    return this.appService.increaseRate(dto);
  }

  @MessagePattern('decrease-rate')
  public decrease(@Payload() dto: UserPointsRequestDto) {
    return this.appService.decreaseRate(dto);
  }
}

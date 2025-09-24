import { Global, Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';

@Global()
@Module({
  controllers: [ParticipantController],
  providers: [ParticipantService],
  exports: [ParticipantService]
})
export class ParticipantModule {}

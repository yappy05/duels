import { Global, Module } from '@nestjs/common';
import { DuelService } from './duel.service';
import { DuelController } from './duel.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DUEL_CLIENT } from './constants/constants';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [ClientsModule.registerAsync([
    {
      name: DUEL_CLIENT,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: Transport.RMQ,
        options: {
          queue: 'duel_queue',
          urls: [config.getOrThrow<string>('RABBITMQ_URL')],
          queueOptions: {
            durable: true
          }
        }
      }),
    },
  ])],
  controllers: [DuelController],
  providers: [DuelService],
  exports: [DuelService],
})
export class DuelModule {
}

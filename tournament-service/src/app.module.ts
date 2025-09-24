import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TournamentModule } from './tournament/tournament.module';
import { RoundModule } from './round/round.module';
import { DuelModule } from './duel/duel.module';
import { TournamentResultModule } from './tournament-result/tournament-result.module';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot({
    isGlobal: true
  }), TournamentModule, RoundModule, DuelModule, TournamentResultModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

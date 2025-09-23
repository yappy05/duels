import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TournamentModule } from './tournament/tournament.module';
import { TournamentUserModule } from './tournament-user/tournament-user.module';
import { RoundModule } from './round/round.module';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot({
    isGlobal: true
  }), TournamentModule, TournamentUserModule, RoundModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

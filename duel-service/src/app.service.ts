import { Injectable } from '@nestjs/common';

import { DuelResponseDto, DuelStatus } from 'assignment-duels-types';

@Injectable()
export class AppService {
  public process(dto: DuelResponseDto[]) {
    const random = Math.random();
    const results = dto.map((duel) => {
      if (random < 0.5) duel.winnerId = duel.player1Id;
      else duel.winnerId = duel.player2Id;
      duel.status = DuelStatus.FINISHED;
      return duel;
    });
    return results;
  }
}

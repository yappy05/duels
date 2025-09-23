import { DuelResponseDto } from './duel.response.dto';

export class DuelResponse implements DuelResponseDto{
  id: string;
  player1Id: string;
  player2Id: string;
  rounded: string;
  winnerId: string;

  constructor(id: string, player1Id: string, player2Id: string, rounded: string, winnerId: string) {
    this.id = id;
    this.player1Id = player1Id;
    this.player2Id = player2Id;
    this.rounded = rounded;
    this.winnerId = winnerId;
  }
}
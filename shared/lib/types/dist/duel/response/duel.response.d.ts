import { DuelResponseDto } from './duel.response.dto';
export declare class DuelResponse implements DuelResponseDto {
    id: string;
    player1Id: string;
    player2Id: string;
    rounded: string;
    winnerId: string;
    constructor(id: string, player1Id: string, player2Id: string, rounded: string, winnerId: string);
}

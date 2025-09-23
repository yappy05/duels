import { DuelResponseDto, RoundResponseDto, TournamentParticipantDto, TournamentResponseDto } from './tournament.response.dto';
import { DuelStatus, TournamentStatus } from './enums';
export declare class TournamentResponse implements TournamentResponseDto {
    id: string;
    name: string;
    status: TournamentStatus;
    currentRoundNumber: number;
    maxRounds: number;
    participants: TournamentParticipantDto[];
    rounds: RoundResponseDto[];
    createdAt: Date;
    updatedAt: Date;
    constructor(dto: TournamentResponseDto);
}
export declare class DuelResponse implements DuelResponseDto {
    id: string;
    status: DuelStatus;
    player1Id: string;
    player2Id: string;
    winnerId?: string;
    roundId: string;
    createdAt: Date;
    updatedAt: Date;
    constructor(dto: DuelResponseDto);
}

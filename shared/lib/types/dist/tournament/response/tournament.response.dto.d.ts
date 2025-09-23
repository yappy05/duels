import { DuelStatus, RoundStatus, TournamentStatus } from './enums';
export interface TournamentResponseDto {
    id: string;
    name: string;
    status: TournamentStatus;
    currentRoundNumber: number;
    maxRounds: number;
    participants: TournamentParticipantDto[];
    rounds: RoundResponseDto[];
    createdAt: Date;
    updatedAt: Date;
}
export interface RoundResponseDto {
    id: string;
    number: number;
    status: RoundStatus;
    duels: DuelResponseDto[];
    startedAt?: Date;
    finishedAt?: Date;
}
export interface DuelResponseDto {
    id: string;
    status: DuelStatus;
    player1Id: string;
    player2Id: string;
    winnerId?: string;
    roundId: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface TournamentParticipantDto {
    id: string;
    userId: string;
    joinedAt: Date;
    position?: number;
}
export interface TournamentResultResponseDto {
    id: string;
    tournamentId: string;
    userId: string;
    position: number;
    stageEliminated?: number;
    finalRating?: number;
    createdAt: Date;
}
export interface TournamentBracketResponseDto {
    tournament: TournamentResponseDto;
    currentRound: RoundResponseDto;
    participantsInfo: UserInfoDto[];
}
export interface UserInfoDto {
    id: string;
    username: string;
    rating: number;
}

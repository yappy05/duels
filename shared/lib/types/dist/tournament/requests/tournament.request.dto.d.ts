export interface CreateTournamentRequestDto {
    name: string;
    countParticipants: number;
    participantIds: string[];
}
export interface StartTournamentRequestDto {
    tournamentId: string;
}
export interface CompleteDuelRequestDto {
    tournamentId: string;
    duelId: string;
}
export interface AddParticipantRequestDto {
    tournamentId: string;
    userId: string;
}
export interface AddRoundRequestDto {
    number: number;
    tournamentId: string;
}
export interface GenerateDuelsRequestDto {
    participantIds: string[];
    roundId: string;
}
export interface TestI {
}

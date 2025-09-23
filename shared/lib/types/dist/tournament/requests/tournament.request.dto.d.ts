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
export interface TestI {
}

export interface CreateTournamentRequestDto {
  name: string;
  countParticipants: number
  participantIds: string[]; // ID пользователей из Users Service
}

// src/dto/requests/start-tournament.request.dto.ts
export interface StartTournamentRequestDto {
  tournamentId: string;
}

// src/dto/requests/complete-duel.request.dto.ts
export interface CompleteDuelRequestDto {
  tournamentId: string;
  duelId: string;
}

// src/dto/requests/add-participant.request.dto.ts
export interface AddParticipantRequestDto {
  tournamentId: string;
  userId: string;
}

export interface AddRoundRequestDto {
  number: number,
  tournamentId: string
}

export interface GenerateDuelsRequestDto {
  participantIds: string[]
  roundId: string
}

export interface AddTournamentUserResult {
  tournamentId: string
  userId: string
  stageEliminated: number
}

export interface TournamentInfo {
  tournamentId: string
}

export interface TestI {}
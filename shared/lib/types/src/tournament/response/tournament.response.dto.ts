// src/dto/responses/tournament.response.dto.ts
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

// src/dto/responses/round.response.dto.ts
export interface RoundResponseDto {
  id: string;
  number: number;
  status: RoundStatus;
  duels: DuelResponseDto[];
  startedAt?: Date;
  finishedAt?: Date;
}

// src/dto/responses/duel.response.dto.ts
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


// src/dto/responses/tournament-participant.dto.ts
export interface TournamentParticipantDto {
  id: string;
  userId: string;
  joinedAt: Date;
  position?: number; // Занятое место (после завершения турнира)
}

// src/dto/responses/tournament-result.response.dto.ts
export interface TournamentResultResponseDto {
  id: string;
  tournamentId: string;
  userId: string;
  position: number;
  stageEliminated?: number;
  finalRating?: number;
  createdAt: Date;
}

// src/dto/responses/tournament-bracket.response.dto.ts
export interface TournamentBracketResponseDto {
  tournament: TournamentResponseDto;
  currentRound: RoundResponseDto;
  participantsInfo: UserInfoDto[]; // Обогащенные данные из Users Service
}

// src/dto/responses/user-info.dto.ts
export interface UserInfoDto {
  id: string;
  username: string;
  rating: number;
}
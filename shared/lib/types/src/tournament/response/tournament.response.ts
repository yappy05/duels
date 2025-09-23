// src/dto/responses/tournament.response.ts
import {
  DuelResponseDto,
  RoundResponseDto, TournamentBracketResponseDto,
  TournamentParticipantDto,
  TournamentResponseDto,
} from './tournament.response.dto';
import { DuelStatus, TournamentStatus } from './enums';

export class TournamentResponse implements TournamentResponseDto {
  id: string;
  name: string;
  status: TournamentStatus;
  currentRoundNumber: number;
  maxRounds: number;
  participants: TournamentParticipantDto[];
  rounds: RoundResponseDto[];
  createdAt: Date;
  updatedAt: Date;

  constructor(dto: TournamentResponseDto) {
    this.id = dto.id;
    this.name = dto.name;
    this.status = dto.status;
    this.currentRoundNumber = dto.currentRoundNumber;
    this.maxRounds = dto.maxRounds;
    this.participants = dto.participants;
    this.rounds = dto.rounds;
    this.createdAt = dto.createdAt;
    this.updatedAt = dto.updatedAt;
  }
}


export class DuelResponse implements DuelResponseDto {
  id: string;
  status: DuelStatus;
  player1Id: string;
  player2Id: string;
  winnerId?: string;
  roundId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(dto: DuelResponseDto) {
    this.id = dto.id;
    this.status = dto.status;
    this.player1Id = dto.player1Id;
    this.player2Id = dto.player2Id;
    this.winnerId = dto.winnerId;
    this.roundId = dto.roundId;
    this.createdAt = dto.createdAt;
    this.updatedAt = dto.updatedAt;
  }
}




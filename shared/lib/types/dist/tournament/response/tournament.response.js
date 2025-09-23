"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuelResponse = exports.TournamentResponse = void 0;
class TournamentResponse {
    constructor(dto) {
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
exports.TournamentResponse = TournamentResponse;
class DuelResponse {
    constructor(dto) {
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
exports.DuelResponse = DuelResponse;
//# sourceMappingURL=tournament.response.js.map
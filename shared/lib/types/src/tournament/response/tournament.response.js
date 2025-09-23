"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuelResponse = exports.TournamentResponse = void 0;
var TournamentResponse = /** @class */ (function () {
    function TournamentResponse(dto) {
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
    return TournamentResponse;
}());
exports.TournamentResponse = TournamentResponse;
var DuelResponse = /** @class */ (function () {
    function DuelResponse(dto) {
        this.id = dto.id;
        this.status = dto.status;
        this.player1Id = dto.player1Id;
        this.player2Id = dto.player2Id;
        this.winnerId = dto.winnerId;
        this.roundId = dto.roundId;
        this.createdAt = dto.createdAt;
        this.updatedAt = dto.updatedAt;
    }
    return DuelResponse;
}());
exports.DuelResponse = DuelResponse;

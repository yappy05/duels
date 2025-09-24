"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuelStatus = exports.RoundStatus = exports.TournamentStatus = void 0;
var TournamentStatus;
(function (TournamentStatus) {
    TournamentStatus["CREATED"] = "CREATED";
    TournamentStatus["ACTIVE"] = "ACTIVE";
    TournamentStatus["FINISHED"] = "FINISHED";
})(TournamentStatus || (exports.TournamentStatus = TournamentStatus = {}));
// src/types/round-status.enum.ts
var RoundStatus;
(function (RoundStatus) {
    RoundStatus["ACTIVE"] = "ACTIVE";
    RoundStatus["FINISHED"] = "FINISHED";
})(RoundStatus || (exports.RoundStatus = RoundStatus = {}));
// src/types/duel-status.enum.ts
var DuelStatus;
(function (DuelStatus) {
    DuelStatus["ACTIVE"] = "ACTIVE";
    DuelStatus["FINISHED"] = "FINISHED";
})(DuelStatus || (exports.DuelStatus = DuelStatus = {}));
//# sourceMappingURL=enums.js.map
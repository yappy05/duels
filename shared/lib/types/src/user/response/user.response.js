"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponse = void 0;
var UserResponse = /** @class */ (function () {
    function UserResponse(dto) {
        this.id = dto.id;
        this.rating = dto.rating;
        this.updatedAt = dto.updatedAt;
        this.username = dto.username;
    }
    return UserResponse;
}());
exports.UserResponse = UserResponse;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponse = void 0;
class UserResponse {
    constructor(dto) {
        this.id = dto.id;
        this.rating = dto.rating;
        this.updatedAt = dto.updatedAt;
        this.username = dto.username;
    }
}
exports.UserResponse = UserResponse;
//# sourceMappingURL=user.response.js.map
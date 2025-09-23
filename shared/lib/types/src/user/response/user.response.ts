import { UserResponseDto } from './user.response.dto';

export class UserResponse implements UserResponseDto {
  id: string;
  rating: number;
  updatedAt: Date;
  username: string;

  constructor(dto: UserResponseDto) {
    this.id = dto.id;
    this.rating = dto.rating;
    this.updatedAt = dto.updatedAt;
    this.username = dto.username;
  }
}

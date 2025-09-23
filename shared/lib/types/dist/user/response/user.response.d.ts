import { UserResponseDto } from './user.response.dto';
export declare class UserResponse implements UserResponseDto {
    id: string;
    rating: number;
    updatedAt: Date;
    username: string;
    constructor(dto: UserResponseDto);
}

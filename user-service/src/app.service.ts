import { Injectable } from '@nestjs/common';
import {
  UserPointsRequestDto,
  UserRequestDto,
  UserResponse,
} from 'assignment-duels-types';
import { PrismaService } from './prisma/prisma.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(dto: UserRequestDto): Promise<UserResponse> {
    const isExistUsername = await this.findByUsername(dto.username);
    if (isExistUsername)
      throw new RpcException({
        code: 6,
        message: 'такой пользователь уже существует',
      });
    const user = await this.prismaService.user.create({
      data: { username: dto.username },
    });
    return new UserResponse(user);
  }

  public async findById(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    if (!user)
      throw new RpcException({
        code: 5,
        message: 'пользователь не найден',
      });
    return new UserResponse(user);
  }

  public async findByUsername(username: string) {
    const user = await this.prismaService.user.findUnique({
      where: { username: username },
    });
    // if (!user)
    //   throw new RpcException({
    //     code: 5,
    //     message: 'пользователь не найден',
    //   });
    return user;
  }

  public async findAll() {
    return this.prismaService.user.findMany();
  }

  public async findUsersByIds(participants: string[]) {
    // Один запрос вместо множественных
    const users = await this.prismaService.user.findMany({
      where: {
        id: {
          in: participants, // Находим всех пользователей по массиву ID
        },
      },
    });

    if (users.length !== participants.length) {
      // Проверяем, что все пользователи найдены
      const foundIds = users.map((user) => user.id);
      const missingIds = participants.filter((id) => !foundIds.includes(id));

      throw new RpcException({
        code: 5,
        message: `Пользователи не найдены: ${missingIds.join(', ')}`,
      });
    }

    return users.map((user) => new UserResponse(user));
  }

  public async increaseRate(dto: UserPointsRequestDto) {
    const { userId, points } = dto;
    const user = await this.findById(userId);
    await this.prismaService.user.update({
      where: { id: user.id },
      data: { rating: user.rating + points },
    });
  }

  public async decreaseRate(dto: UserPointsRequestDto) {
    const { userId, points } = dto;
    const user = await this.findById(userId);
    await this.prismaService.user.update({
      where: { id: user.id },
      data: { rating: user.rating - points },
    });
  }
}

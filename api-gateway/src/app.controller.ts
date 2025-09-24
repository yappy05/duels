import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  TOURNAMENT_QUEUE_CLIENT,
  USER_QUEUE_CLIENT,
} from './common/lib/constants';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  AddRoundRequestDto,
  CreateTournamentRequestDto,
  UserPointsRequestDto,
  UserRequestDto,
} from 'assignment-duels-types';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('API Gateway') // Группировка в Swagger UI
@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(USER_QUEUE_CLIENT) private readonly userClient: ClientProxy,
    @Inject(TOURNAMENT_QUEUE_CLIENT)
    private readonly tournamentClient: ClientProxy,
  ) {}

  // @Get('user-health')
  // @ApiOperation({ summary: 'Проверка здоровья User сервиса' })
  // @ApiResponse({ status: 200, description: 'Сервис доступен' })
  // @ApiResponse({ status: 500, description: 'Сервис недоступен' })
  // public userHealth() {
  //   return firstValueFrom(this.userClient.send('ping', {}));
  // }
  //
  // @Get('tournament-health')
  // @ApiOperation({ summary: 'Проверка здоровья Tournament сервиса' })
  // @ApiResponse({ status: 200, description: 'Сервис доступен' })
  // @ApiResponse({ status: 500, description: 'Сервис недоступен' })
  // public tournamentHealth() {
  //   return firstValueFrom(this.tournamentClient.send('ping', {}));
  // }

  @Post('user/register')
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', description: 'Имя пользователя' },
      },
      required: ['username'],
    },
    description: 'Данные для регистрации',
  })
  public createUser(@Body() dto: UserRequestDto) {
    return firstValueFrom(this.userClient.send('register', dto));
  }

  // @Get('user/by-id/:id')
  // @ApiOperation({ summary: 'Поиск пользователя по ID' })
  // @ApiParam({ name: 'id', type: String, description: 'UUID пользователя' })
  // @ApiResponse({ status: 200, description: 'Пользователь найден' })
  // @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  // public findUserById(@Param('id') id: string) {
  //   return firstValueFrom(this.userClient.send('find-by-id', id));
  // }
  //
  // @Get('user/by-username')
  // @ApiOperation({ summary: 'Поиск пользователя по имени' })
  // @ApiQuery({ name: 'username', type: String, description: 'Имя пользователя' })
  // @ApiResponse({ status: 200, description: 'Пользователь найден' })
  // @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  // public findUserByUsername(@Query('username') username: string) {
  //   return firstValueFrom(this.userClient.send('find-by-username', username));
  // }
  //
  // @Get('user/find-all')
  // @ApiOperation({ summary: 'Получить всех пользователей' })
  // @ApiResponse({ status: 200, description: 'Список пользователей' })
  // public findAllUsers() {
  //   return firstValueFrom(this.userClient.send('find-all', {}));
  // }
  //
  // @Post('user/increase-rate')
  // @ApiOperation({ summary: 'Увеличить рейтинг пользователя' })
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       userId: {
  //         type: 'string',
  //         description: 'ID пользователя',
  //         example: '0fd1f98d-a639-45a0-a5b6-b23440f22f9f',
  //       },
  //       points: {
  //         type: 'number',
  //         description: 'Количество очков для увеличения',
  //         example: 10,
  //       },
  //     },
  //     required: ['userId', 'points'],
  //   },
  //   description: 'Данные для изменения рейтинга',
  // })
  // @ApiResponse({ status: 200, description: 'Рейтинг увеличен' })
  // public increase(@Body() dto: UserPointsRequestDto) {
  //   this.userClient.emit('increase-rate', dto);
  // }
  //
  // @Post('user/decrease-rate')
  // @ApiOperation({ summary: 'Уменьшить рейтинг пользователя' })
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       userId: {
  //         type: 'string',
  //         description: 'ID пользователя',
  //         example: '0fd1f98d-a639-45a0-a5b6-b23440f22f9f',
  //       },
  //       points: {
  //         type: 'number',
  //         description: 'Количество очков для уменьшения',
  //         example: 5,
  //       },
  //     },
  //     required: ['userId', 'points'],
  //   },
  //   description: 'Данные для изменения рейтинга',
  // })
  // @ApiResponse({ status: 200, description: 'Рейтинг уменьшен' })
  // public decrease(@Body() dto: UserPointsRequestDto) {
  //   this.userClient.emit('decrease-rate', dto);
  // }

  // Tournament endpoints
  @Post('tournament/create')
  @ApiOperation({ summary: 'Создать новый турнир' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Название турнира',
          example: 'Ежегодный чемпионат',
        },
        countParticipants: {
          type: 'number',
          description:
            'Количество участников (должно быть степенью двойки: 2, 4, 8, 16, ...)',
          example: 4,
        },
        participantIds: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'Массив ID участников',
          example: [
            '0fd1f98d-a639-45a0-a5b6-b23440f22f9f',
            '2c1e33ba-d739-4897-bee7-4e003d0d2c1e',
            'a4901970-28da-43d4-997a-5141d255af2f',
            'b3901970-28da-43d4-997a-5141d255af2f',
          ],
        },
      },
      required: ['name', 'countParticipants', 'participantIds'],
    },
    description: 'Данные для создания турнира',
  })
  @ApiResponse({ status: 201, description: 'Турнир успешно создан' })
  @ApiResponse({ status: 400, description: 'Неверные данные турнира' })
  public create(@Body() dto: CreateTournamentRequestDto) {
    return firstValueFrom(this.tournamentClient.send('create-tournament', dto));
  }

  @Get('tournament/rounds/:id')
  @ApiOperation({ summary: 'Получить все раунды турнира' })
  @ApiParam({ name: 'id', type: String, description: 'UUID турнира' })
  @ApiResponse({ status: 200, description: 'Список раундов' })
  @ApiResponse({ status: 404, description: 'Турнир не найден' })
  public getAllRounds(@Param('id') id: string) {
    return firstValueFrom(
      this.tournamentClient.send('get-rounds', { tournamentId: id }),
    );
  }

  @Get('tournament/results/:id')
  @ApiOperation({ summary: 'Получить результаты турнира' })
  @ApiParam({ name: 'id', type: String, description: 'UUID турнира' })
  @ApiResponse({ status: 200, description: 'Результаты турнира' })
  @ApiResponse({ status: 404, description: 'Турнир не найден' })
  public getAllResults(@Param('id') id: string) {
    return firstValueFrom(
      this.tournamentClient.send('get-results', { tournamentId: id }),
    );
  }

  @Get('tournament/winner/:id')
  @ApiOperation({ summary: 'Получить победителя турнира' })
  @ApiParam({ name: 'id', type: String, description: 'UUID турнира' })
  @ApiResponse({ status: 200, description: 'Победитель турнира' })
  @ApiResponse({
    status: 404,
    description: 'Турнир не найден или победитель не определен',
  })
  public getWinner(@Param('id') id: string) {
    return firstValueFrom(
      this.tournamentClient.send('get-winner', { tournamentId: id }),
    );
  }

  @Get('tournament/participants/:id')
  @ApiOperation({ summary: 'Получить участников турнира' })
  @ApiParam({ name: 'id', type: String, description: 'UUID турнира' })
  @ApiResponse({ status: 200, description: 'Список участников' })
  @ApiResponse({ status: 404, description: 'Турнир не найден' })
  public getParticipants(@Param('id') id: string) {
    return firstValueFrom(
      this.tournamentClient.send('get-participants', { tournamentId: id }),
    );
  }

  // Round endpoints
  @Post('tournament/round/complete')
  @ApiOperation({ summary: 'Завершить раунд' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        roundId: { type: 'string', description: 'UUID раунда' },
      },
    },
    description: 'ID раунда для завершения',
  })
  @ApiResponse({ status: 200, description: 'Раунд успешно завершен' })
  @ApiResponse({ status: 404, description: 'Раунд не найден' })
  @ApiResponse({ status: 400, description: 'Раунд уже завершен' })
  public completeRound(@Body('roundId') roundId: string) {
    return firstValueFrom(
      this.tournamentClient.send('complete-round', roundId),
    );
  }

  @Post('tournament/round/new')
  @ApiOperation({ summary: 'Создать новый раунд' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        tournamentId: {
          type: 'string',
          description: 'ID турнира',
          example: '18169d66-6761-4eb4-bcb0-b23132292ca3',
        },
        number: {
          type: 'number',
          description: 'Номер раунда',
          example: 1,
        },
      },
      required: ['tournamentId', 'number'],
    },
    description: 'Данные для создания раунда',
  })
  @ApiResponse({ status: 201, description: 'Раунд успешно создан' })
  @ApiResponse({
    status: 400,
    description: 'Неверные данные для создания раунда',
  })
  @ApiResponse({ status: 404, description: 'Турнир не найден' })
  public newRound(@Body() dto: AddRoundRequestDto) {
    return firstValueFrom(this.tournamentClient.send('new-round', dto));
  }
}

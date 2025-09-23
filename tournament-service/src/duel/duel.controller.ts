import { Controller } from '@nestjs/common';
import { DuelService } from './duel.service';

@Controller('duel')
export class DuelController {
  constructor(private readonly duelService: DuelService) {}
}

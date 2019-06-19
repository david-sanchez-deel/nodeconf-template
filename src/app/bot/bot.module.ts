import { Module } from '@nestjs/common';
import { ConsoleAdapter } from './adapters';
import { BotController } from './controllers';
import { BotHandlerService, BotService } from './services';

@Module({
  controllers: [
    BotController,
  ],
  providers: [
    BotHandlerService,
    ConsoleAdapter,
    BotService,
  ],
})
export class BotModule {}

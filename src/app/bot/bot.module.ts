import { Module } from '@nestjs/common';
import { ConsoleAdapter } from './adapters';
import { BotController } from './controllers';
import { BotHandlerService } from './services';

@Module({
  controllers: [
    BotController,
  ],
  providers: [
    BotHandlerService,
    ConsoleAdapter,
  ],
})
export class BotModule {}

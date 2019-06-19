import { Module } from '@nestjs/common';
import { ConsoleAdapter } from './adapters';
import { BotHandlerService } from './services';

@Module({
  providers: [
    BotHandlerService,
    ConsoleAdapter,
  ],
})
export class BotModule {}

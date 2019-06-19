import { Module } from '@nestjs/common';
import { ConsoleAdapter } from './adapters';
import { BotController } from './controllers';
import { DialogFlowRecognizer } from './recognizers';
import { BotHandlerService, BotService } from './services';

@Module({
  controllers: [
    BotController,
  ],
  providers: [
    BotHandlerService,
    ConsoleAdapter,
    BotService,
    DialogFlowRecognizer,
  ],
})
export class BotModule {}

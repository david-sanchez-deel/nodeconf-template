import { Module, NestModule } from '@nestjs/common';
import { ConsoleAdapter } from './adapters';
import { BotController } from './controllers';
import { BalanceDialog, DefaultDialog } from './dialogs';
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
    DefaultDialog,
    BalanceDialog,
  ],
})
export class BotModule  implements NestModule {
  constructor(private botService: BotService) {
  }

  public configure() {
    this.botService.configureDialogs();
  }
}

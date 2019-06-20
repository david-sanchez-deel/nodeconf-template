import { Module, NestModule } from '@nestjs/common';
import UniversalConnector from 'universal-connector-client';
import { ConsoleAdapter } from './adapters';
import { BotController } from './controllers';
import { BalanceDialog, ChangeLanguageDialog, DefaultDialog } from './dialogs';
import { DialogFlowRecognizer } from './recognizers';
import { BotHandlerService, BotService } from './services';

@Module({
  controllers: [
    BotController,
  ],
  imports: [
    UniversalConnector.UniversalConnectorModule.forRoot(),
  ],
  providers: [
    BotHandlerService,
    ConsoleAdapter,
    BotService,
    DialogFlowRecognizer,
    DefaultDialog,
    BalanceDialog,
    ChangeLanguageDialog,
  ],
})
export class BotModule  implements NestModule {
  constructor(private botService: BotService) {
  }

  public configure() {
    this.botService.configureDialogs();
  }
}

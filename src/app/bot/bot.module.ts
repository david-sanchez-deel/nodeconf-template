import { i18n } from '@app/i18n';
import { Module, NestModule } from '@nestjs/common';
import { TurnContext } from 'botbuilder';
import i18next from 'i18next';
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

    const self = this;
    (TurnContext as any).prototype.translate = async function(key, options?: i18next.TOptions<i18next.StringMap>) {
      const profile = await self.botService.getProfile(this);
      return i18n(key, { ...options, lng: profile.language });
    };
  }
}

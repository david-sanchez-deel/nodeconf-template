import { Injectable, Logger } from '@nestjs/common';
import { ActivityHandler, TurnContext } from 'botbuilder';
import { DialogContext } from 'botbuilder-dialogs';
import { ConsoleAdapter } from '../adapters';
import { DialogId } from '../enums';
import { DialogFlowRecognizer } from '../recognizers';
import { BotService } from './bot.service';

@Injectable()
export class BotHandlerService extends ActivityHandler {

  private logger = new Logger(BotHandlerService.name);

  constructor(private consoleAdapter: ConsoleAdapter, private botService: BotService, private dialogFlowRecognizer: DialogFlowRecognizer) {
    super();

    this.onMessage(this.messageReceived.bind(this));
    this.onMembersAdded(this.newUser.bind(this));
    this.onDialog(this.dialogFinalyzed.bind(this));

    this.logger.debug('Say "quit" to end.');
    this.consoleAdapter.listen((context: TurnContext) => this.run(context));
  }

  private async newUser(context: TurnContext, next) {
    const membersAdded = context.activity.membersAdded;
    for (const member of membersAdded) {
      if (member.id !== context.activity.recipient.id) {
        await context.sendActivity('Bievenido!');
      }
    }
    await next();
  }

  private async messageReceived(context: TurnContext, next: () => Promise<void>) {
    const dialogContext = await this.botService.dialogSet.createContext(context);
    const results = await dialogContext.continueDialog();
    this.logger.debug(`Dialog continued with status ${results.status}`);
    await this.recognizeMessage(context, dialogContext);
  }

  private async recognizeMessage(context: TurnContext, dialogContext: DialogContext) {
    const recognitionResult = await this.dialogFlowRecognizer.recognize(context);
    const dialogOfIntent = this.botService.intentMap[recognitionResult.intent];
    if (dialogOfIntent) {
      await dialogContext.beginDialog(dialogOfIntent, { recognitionResult });
    } else {
      await dialogContext.beginDialog(DialogId.default, { recognitionResult });
    }
  }

  private async dialogFinalyzed(turnContext, next) {
    await this.botService.conversationState.saveChanges(turnContext, false);
    await this.botService.userState.saveChanges(turnContext, false);
    await next();
  }
}

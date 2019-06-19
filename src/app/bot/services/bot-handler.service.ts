import { Injectable, Logger } from '@nestjs/common';
import { ActivityHandler, TurnContext } from 'botbuilder';
import { ConsoleAdapter } from '../adapters';
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
     const response = await this.recognizeMessage(context);
     await context.sendActivity(response);
     await next();
  }

  private async recognizeMessage(context: TurnContext) {
    const recognitionResult = await this.dialogFlowRecognizer.recognize(context);
    return recognitionResult.entities.response;
  }

  private async dialogFinalyzed(turnContext, next) {
    await this.botService.conversationState.saveChanges(turnContext, false);
    await this.botService.userState.saveChanges(turnContext, false);
    await next();
  }
}

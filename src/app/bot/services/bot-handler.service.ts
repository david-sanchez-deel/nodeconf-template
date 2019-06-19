import { Injectable, Logger } from '@nestjs/common';
import { ActivityHandler, TurnContext } from 'botbuilder';
import { ConsoleAdapter } from '../adapters';
import { BotService } from './bot.service';

@Injectable()
export class BotHandlerService extends ActivityHandler {

  private logger = new Logger(BotHandlerService.name);

  constructor(private consoleAdapter: ConsoleAdapter, private botService: BotService) {
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
    // Check to see if the user sent a simple "quit" message.
    if (context.activity.text.toLowerCase() === 'quit') {
      // Send a reply.
      context.sendActivity(`Bye!`);
      process.exit();
    } else {
      const userProfile = await this.botService.userProfile.get(context, { times: 0 });
      userProfile.times += 1;
      // Echo the message text back to the user.
      await context.sendActivity(`I heard you say "${context.activity.text}", this is your message ${userProfile.times}`);
    }
    await next();
  }

  private async dialogFinalyzed(turnContext, next) {
    await this.botService.conversationState.saveChanges(turnContext, false);
    await this.botService.userState.saveChanges(turnContext, false);
    await next();
  }
}

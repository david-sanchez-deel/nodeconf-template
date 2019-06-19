import { Injectable, Logger } from '@nestjs/common';
import { ActivityHandler, TurnContext } from 'botbuilder';
import { ConsoleAdapter } from '../adapters';

@Injectable()
export class BotHandlerService extends ActivityHandler {

  private logger = new Logger(BotHandlerService.name);

  constructor(private consoleAdapter: ConsoleAdapter) {
    super();

    this.onMessage(this.messageReceived.bind(this));
    this.onMembersAdded(this.newUser.bind(this));

    this.logger.debug('Say "quit" to end.');
    this.consoleAdapter.listen((context: TurnContext) => this.run(context));
  }

  private async newUser(context: TurnContext, next) {
    const membersAdded = context.activity.membersAdded;
    for (const member of membersAdded) {
      // Send the message to the new member, excluding the bot!
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
      // Echo the message text back to the user.
      return context.sendActivity(`I heard you say "${context.activity.text}"`);
    }
    await next();
  }
}

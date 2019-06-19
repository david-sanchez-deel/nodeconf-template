import { constants } from '@app/constants';
import { environment } from '@app/environment';
import { MongoStorage } from '@kevit/botbuilder-storage-mongo-v4';
import { Injectable, Logger } from '@nestjs/common';
import { ConversationState, MemoryStorage, StatePropertyAccessor, UserState } from 'botbuilder';
import { DialogSet } from 'botbuilder-dialogs';

@Injectable()
export class BotService {
  public conversationState: ConversationState;
  public userState: UserState;
  public userProfile: StatePropertyAccessor;
  public dialogSet: DialogSet;
  public intentMap: { [intentName: string]: string } = {};
  private storage: MongoStorage;
  private userProfileProperty = 'userProfile';
  private logger = new Logger(BotService.name);

  constructor() {
    this.storage = new MemoryStorage();
    // Replace the storage with this to use a DB
    /* this.storage = new MongoStorage(
      environment.bot.storage.uri,
      environment.bot.storage.database,
      environment.bot.storage.collection,
    ); */
    // This is the memory, 3 types: Conversation level (different users). User level (Only to the user)
    this.conversationState = new ConversationState(this.storage);
    this.userState = new UserState(this.storage);
    this.userProfile = this.userState.createProperty(this.userProfileProperty);

    const dialogState = this.conversationState.createProperty('dialogState');
    this.dialogSet = new DialogSet(dialogState);
  }

  public configureDialogs() {
    const dialogs = Reflect.getMetadata('dialogs', BotService) || [];
    this.intentMap = Reflect.getMetadata('intents', BotService) || [];
    // Add dialogs
    for (const dialog of dialogs) {
      this.logger.log(`Dialog registered {${dialog.dialogId}}`);
      this.dialogSet.add(constants.app.get(dialog.constructor));
    }
  }
}

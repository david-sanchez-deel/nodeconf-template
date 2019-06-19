import { environment } from '@app/environment';
import { MongoStorage } from '@kevit/botbuilder-storage-mongo-v4';
import { Injectable } from '@nestjs/common';
import { ConversationState, MemoryStorage, StatePropertyAccessor, UserState } from 'botbuilder';

@Injectable()
export class BotService {
  public conversationState: ConversationState;
  public userState: UserState;
  public userProfile: StatePropertyAccessor;
  private storage: MongoStorage;
  private userProfileProperty = 'userProfile';

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
  }
}

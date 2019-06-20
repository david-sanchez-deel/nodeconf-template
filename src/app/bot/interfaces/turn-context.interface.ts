import { TurnContext } from 'botbuilder';
import i18next from 'i18next';

export interface ITurnContext extends TurnContext {
  translate(key, options?: i18next.TOptions<i18next.StringMap>): Promise<string>;
}

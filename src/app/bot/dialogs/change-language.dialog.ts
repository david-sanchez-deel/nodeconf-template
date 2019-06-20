import { ActionTypes } from 'botbuilder';
import { Dialog, Step } from '../decorators';
import { DialogId, Intent } from '../enums';
import { IStepContext } from '../interfaces';
import { BotService } from '../services';
import { BaseDialog } from './base.dialog';

@Dialog({ dialogId: DialogId.language, intent: Intent.language })
export class ChangeLanguageDialog extends BaseDialog {

  constructor(private botService: BotService) {
    super(DialogId.language);
  }

  @Step(1)
  public async start(context: IStepContext) {
    return context.prompt(
      DialogId.choicePrompt,
      'selecciona tu nuevo lenguaje',
      [
        { value: 'es', synonyms: ['español', 'spanish'], action: { title: 'Español', value: 'es', type: ActionTypes.ImBack } },
        { value: 'en', synonyms: ['ingles', 'english'], action: { title: 'Ingles', value: 'en', type: ActionTypes.ImBack } },
      ],
    );
  }

  @Step(2)
  public async changeLanguage(context: IStepContext) {
    const profile = await this.botService.getProfile(context.context);
    profile.language = context.result.value;
    await context.context.sendActivity(`Tu lenguaje ha sido cambiado a: "${profile.language}"`);
    return await context.endDialog();
  }
}

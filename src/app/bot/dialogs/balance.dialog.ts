import { dictionary } from '@app/i18n';
import { Dialog, Step } from '../decorators';
import { DialogId, Intent } from '../enums';
import { IStepContext } from '../interfaces';
import { BaseDialog } from './base.dialog';

@Dialog({ dialogId: DialogId.balance, intent: Intent.balance })
export class BalanceDialog extends BaseDialog {

  constructor() {
    super(DialogId.balance);
  }

  @Step(1)
  public async start(stepContext: IStepContext) {
    await stepContext.context.sendActivity(await stepContext.context.translate(dictionary.civica.balance));
    await stepContext.endDialog();
  }
}

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
  public async start(context: IStepContext) {
    await context.context.sendActivity('Tu saldo es 3000 COP');
    await context.endDialog();
  }
}

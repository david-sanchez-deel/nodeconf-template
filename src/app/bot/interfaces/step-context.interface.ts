import { WaterfallStepContext } from 'botbuilder-dialogs';
import { IRecognitionResult } from './entity.interface';
import { ITurnContext } from './turn-context.interface';

export interface IStepContext extends WaterfallStepContext<{ recognitionResult: IRecognitionResult }> {
  context: ITurnContext;
}

import { BotModule } from '@app/bot';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    BotModule,
  ],
})
export class AppModule { }

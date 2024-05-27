import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './payment/payment.module';
import * as dotenv from 'dotenv';
import { DatabaseModule } from './core/database/database.module';
import { EventModule } from './event/event.module';
dotenv.config();
@Module({
  imports: [PaymentModule, DatabaseModule, EventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

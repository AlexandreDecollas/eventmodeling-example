import { Module } from '@nestjs/common';

import { AddRoomCommand } from './features/add-room/add-room.command';
import { BookRoomCommand } from './features/book-room/book-room.command';
import { CheckInCommand } from './features/check-in/check-in.command';
import { CleaningRoomCommand } from './features/cleaning-room/cleaning-room.command';
import { HotelProximityCommand } from './features/hotel-proximity/hotel-proximity.command';
import { CheckOutCommand } from './features/check-out/check-out.command';
import { PayementRequestedCommand } from './features/payement-requested/payement-requested.command';
import { PayementProcessorCommand } from './features/payement-processor/payement-processor.command';
import { IdGeneratorModule } from './utils/id-generator/id-generator.module';
import { RegisterCommand } from './features/register/register.command';
import { EventModellingModule } from 'cavia-js';

const commands = [
  RegisterCommand,
  AddRoomCommand,
  BookRoomCommand,
  CleaningRoomCommand,
  CheckInCommand,
  HotelProximityCommand,
  CheckOutCommand,
  PayementRequestedCommand,
  PayementProcessorCommand,
];

@Module({
  imports: [
    EventModellingModule.forRoot({
      checkHeartBeatOnInterval: 10_000,
      eventstoreConnectionString:
        process.env.CONNECTION_STRING ||
        'esdb://admin:changeit@127.0.0.1:2113?tls=false',
      redisQueueConfiguration: {
        queueName: 'tutu',
        options: { connection: { host: 'localhost', port: 6379 } },
      },
    }),
    IdGeneratorModule,

    ...commands,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RegisterModule } from './features/register/register.module';
import { EventbusModule } from './eventbus/eventbus.module';
import { AddRoomModule } from './features/add-room/add-room.module';
import { BookRoomModule } from './features/book-room/book-room.module';
import { EventStoreConnectorModule } from './eventstore-connector/event-store-connector.module';
import { CheckInModule } from './features/check-in/check-in.module';

const features = [RegisterModule, AddRoomModule, BookRoomModule, CheckInModule];

@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: true,
    }),
    EventbusModule,
    EventStoreConnectorModule,

    ...features,
  ],
})
export class AppModule {}

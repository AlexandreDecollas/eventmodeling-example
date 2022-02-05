import { IdGeneratorService } from '../../utils/id-generator/id-generator.service';
import { RoomAddedEvent } from '../../model/room-added.event';
import { Get, Param } from '@nestjs/common';
import { Cli, Command, Eventbus } from 'cavia-js';

@Command({
  restOptions: { path: 'add-room' },
})
export class AddRoomCommand {
  constructor(
    private readonly eventEmitter: Eventbus,
    private readonly idGeneratorService: IdGeneratorService,
  ) {}

  @Get('/:roomNumber')
  public addRoom(@Param('roomNumber') roomNumber: number): void {
    const event: RoomAddedEvent = {
      type: 'RoomAddedEvent',
      data: {
        id: this.idGeneratorService.generateId(),
        roomNumber,
      },
      metadata: { streamName: 'manager.room-added' },
    };
    this.eventEmitter.emit(event.metadata.streamName, event);
  }

  @Cli()
  toto(val1, val2: any) {
    console.log('val1 : ', val1);
    console.log('val2 : ', val2);
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { HotelProximityService } from './hotel-proximity.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IdGeneratorService } from '../../../utils/id-generator/id-generator.service';

describe('HotelProximityService', () => {
  let service: HotelProximityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HotelProximityService,
        {
          provide: EventEmitter2,
          useValue: {},
        },
        {
          provide: IdGeneratorService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<HotelProximityService>(HotelProximityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

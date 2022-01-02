import { Test, TestingModule } from '@nestjs/testing';
import { CleaningService } from './cleaning.service';
import { IdGeneratorService } from '../../../utils/id-generator/id-generator.service';
import { ESDBConnectionService } from '../../../eventstore-connector/connection-initializer/esdb-connection.service';
import { Eventbus } from '../../../eventbus/eventbus.service';

describe('CleaningService', () => {
  let service: CleaningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CleaningService,
        {
          provide: Eventbus,
          useValue: {},
        },
        {
          provide: IdGeneratorService,
          useValue: { generateId: jest.fn() },
        },
        {
          provide: ESDBConnectionService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<CleaningService>(CleaningService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

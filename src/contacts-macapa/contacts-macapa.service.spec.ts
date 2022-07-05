import { Test, TestingModule } from '@nestjs/testing';
import { ContactsMacapaService } from './contacts-macapa.service';

describe('ContactsMacapaService', () => {
  let service: ContactsMacapaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactsMacapaService],
    }).compile();

    service = module.get<ContactsMacapaService>(ContactsMacapaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

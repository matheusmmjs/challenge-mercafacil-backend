import { Test, TestingModule } from '@nestjs/testing';
import { ContactsVarejaoService } from '../contacts-varejao.service';

describe('ContactsVarejaoService', () => {
  let service: ContactsVarejaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactsVarejaoService],
    }).compile();

    service = module.get<ContactsVarejaoService>(ContactsVarejaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

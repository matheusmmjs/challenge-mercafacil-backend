import { Test, TestingModule } from '@nestjs/testing';
import { ContactsMacapaController } from './contacts-macapa.controller';
import { ContactsMacapaService } from './contacts-macapa.service';

describe('ContactsMacapaController', () => {
  let controller: ContactsMacapaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsMacapaController],
      providers: [ContactsMacapaService],
    }).compile();

    controller = module.get<ContactsMacapaController>(ContactsMacapaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ContactsVarejaoController } from '../contacts-varejao.controller';
import { ContactsVarejaoService } from '../contacts-varejao.service';

describe('ContactsVarejaoController', () => {
  let controller: ContactsVarejaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsVarejaoController],
      providers: [ContactsVarejaoService],
    }).compile();

    controller = module.get<ContactsVarejaoController>(
      ContactsVarejaoController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

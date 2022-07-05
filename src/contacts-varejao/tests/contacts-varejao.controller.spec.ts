import { Test, TestingModule } from '@nestjs/testing';
import { Chance } from 'chance';
import { ContactsVarejaoController } from '../contacts-varejao.controller';
import { ContactsVarejaoService } from '../contacts-varejao.service';
import { CreateContactsVarejaoDto } from '../dto/create-contacts-varejao.dto';
import { contactsVarejaoMock } from './contacts-varejao.mock';

describe('ContactsVarejaoController', () => {
  let controller: ContactsVarejaoController;
  let service: ContactsVarejaoService;
  const chance = new Chance();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsVarejaoController],
      providers: [
        {
          provide: ContactsVarejaoService,
          useValue: {
            create: jest.fn().mockResolvedValue(contactsVarejaoMock),
            findAll: jest.fn().mockResolvedValue(contactsVarejaoMock),
          },
        },
      ],
    }).compile();

    controller = module.get<ContactsVarejaoController>(
      ContactsVarejaoController,
    );
    service = module.get<ContactsVarejaoService>(ContactsVarejaoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('#create', () => {
    it('should return created news varejao contacts successfuly', async () => {
      const createContactsVarejaoDto: CreateContactsVarejaoDto = {
        contacts: [
          {
            name: chance.string({ length: 20 }),
            cellphone: chance.string({ length: 13 }),
          },
        ],
      };

      const result = await controller.create(createContactsVarejaoDto);

      expect(result).toStrictEqual(contactsVarejaoMock);
    });
  });

  describe('#findAll', () => {
    it('should return find all macapa contacts successfuly', async () => {
      const result = await controller.findAll();

      expect(result).toStrictEqual(contactsVarejaoMock);
    });
  });
});

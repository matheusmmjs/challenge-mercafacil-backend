import { Test, TestingModule } from '@nestjs/testing';
import { Chance } from 'chance';
import { ContactsMacapaController } from '../contacts-macapa.controller';
import { ContactsMacapaService } from '../contacts-macapa.service';
import { CreateContactsMacapaDto } from '../dto/create-contacts-macapa.dto';
import { contactsMacapaMock } from './contacts-macapa.mock';

describe('ContactsMacapaController', () => {
  let controller: ContactsMacapaController;
  let service: ContactsMacapaService;
  const chance = new Chance();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsMacapaController],
      providers: [
        {
          provide: ContactsMacapaService,
          useValue: {
            create: jest.fn().mockResolvedValue(contactsMacapaMock),
            findAll: jest.fn().mockResolvedValue(contactsMacapaMock),
          },
        },
      ],
    }).compile();

    controller = module.get<ContactsMacapaController>(ContactsMacapaController);
    service = module.get<ContactsMacapaService>(ContactsMacapaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('#create', () => {
    it('should return created news macapa contacts successfuly', async () => {
      const createContactsMacapaDto: CreateContactsMacapaDto = {
        contacts: [
          {
            name: chance.string({ length: 20 }),
            cellphone: chance.string({ length: 13 }),
          },
        ],
      };

      const result = await controller.create(createContactsMacapaDto);

      expect(result).toStrictEqual(contactsMacapaMock);
    });
  });

  describe('#findAll', () => {
    it('should return find all macapa contacts successfuly', async () => {
      const result = await controller.findAll();

      expect(result).toStrictEqual(contactsMacapaMock);
    });
  });
});

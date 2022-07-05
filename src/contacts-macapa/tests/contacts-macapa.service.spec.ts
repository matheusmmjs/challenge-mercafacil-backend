import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Chance } from 'chance';
import {
  createConnection,
  getConnection,
  getRepository,
  Repository,
} from 'typeorm';
import { ContactsMacapaService } from '../contacts-macapa.service';
import { CreateContactsMacapaDto } from '../dto/create-contacts-macapa.dto';
import { ContactsMacapa } from '../entities/contacts-macapa.entity';
import { contactsMacapaMock } from './contacts-macapa.mock';

describe('ContactsMacapaService', () => {
  let service: ContactsMacapaService;
  let repository: Repository<ContactsMacapa>;
  const testConnectionName = 'testConnection';
  const chance = new Chance();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactsMacapaService,
        {
          provide: getRepositoryToken(ContactsMacapa),
          useValue: {
            save: jest.fn().mockResolvedValue(contactsMacapaMock),
            find: jest.fn().mockResolvedValue(contactsMacapaMock),
          },
        },
      ],
    }).compile();

    const connection = await createConnection({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [ContactsMacapa],
      synchronize: true,
      logging: false,
      name: testConnectionName,
    });

    repository = getRepository(ContactsMacapa, testConnectionName);
    service = module.get<ContactsMacapaService>(ContactsMacapaService);

    return connection;
  });

  afterEach(async () => {
    await getConnection(testConnectionName).close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
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

      const result = await service.create(createContactsMacapaDto);

      expect(result).toStrictEqual(contactsMacapaMock);
    });

    it('should return throw internal server error', async () => {
      const createContactsMacapaDto: CreateContactsMacapaDto = {
        contacts: [
          {
            name: chance.string({ length: 20 }),
            cellphone: chance.string({ length: 13 }),
          },
        ],
      };

      jest
        .spyOn(repository, 'save')
        .mockRejectedValueOnce(new InternalServerErrorException());

      try {
        await service.create(createContactsMacapaDto);

        throw new Error('Test failed');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('#findAll', () => {
    it('should return find all macapa contacts successfuly', async () => {
      const result = await service.findAll();

      expect(result).toStrictEqual(contactsMacapaMock);
    });

    it('should return throw bad request error', async () => {
      jest
        .spyOn(repository, 'find')
        .mockRejectedValueOnce(new BadRequestException());

      try {
        await service.findAll();

        throw new Error('Test failed');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});

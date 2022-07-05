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
import { ContactsVarejaoService } from '../contacts-varejao.service';
import { CreateContactsVarejaoDto } from '../dto/create-contacts-varejao.dto';
import { ContactsVarejao } from '../entities/contacts-varejao.entity';
import { contactsVarejaoMock } from './contacts-varejao.mock';

describe('ContactsVarejaoService', () => {
  let service: ContactsVarejaoService;
  let repository: Repository<ContactsVarejao>;
  const testConnectionName = 'testConnection';
  const chance = new Chance();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactsVarejaoService,
        {
          provide: getRepositoryToken(ContactsVarejao, 'DB_CONNECTION_2'),
          useValue: {
            save: jest.fn().mockResolvedValue(contactsVarejaoMock),
            find: jest.fn().mockResolvedValue(contactsVarejaoMock),
          },
        },
      ],
    }).compile();

    const connection = await createConnection({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [ContactsVarejao],
      synchronize: true,
      logging: false,
      name: testConnectionName,
    });

    repository = getRepository(ContactsVarejao, testConnectionName);
    service = module.get<ContactsVarejaoService>(ContactsVarejaoService);

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
    it('should return created news varejao contacts successfuly', async () => {
      const createContactsVarejaoDto: CreateContactsVarejaoDto = {
        contacts: [
          {
            name: chance.string({ length: 20 }),
            cellphone: chance.string({ length: 13 }),
          },
        ],
      };

      const result = await service.create(createContactsVarejaoDto);

      expect(result).toStrictEqual(contactsVarejaoMock);
    });

    it('should return throw internal server error', async () => {
      const createContactsVarejaoDto: CreateContactsVarejaoDto = {
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
        await service.create(createContactsVarejaoDto);

        throw new Error('Test failed');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('#findAll', () => {
    it('should return find all varejao contacts successfuly', async () => {
      const result = await service.findAll();

      expect(result).toStrictEqual(contactsVarejaoMock);
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

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorsCode } from '../shared/errors-code.enum';
import { Repository } from 'typeorm';
import {
  Contacts,
  CreateContactsVarejaoDto,
} from './dto/create-contacts-varejao.dto';
import { ContactsVarejao } from './entities/contacts-varejao.entity';

@Injectable()
export class ContactsVarejaoService {
  private readonly logger = new Logger(ContactsVarejaoService.name);

  constructor(
    @InjectRepository(ContactsVarejao, 'DB_CONNECTION_2')
    private readonly contactsVarejaoRepository: Repository<ContactsVarejao>,
  ) {}

  async create(
    createContactsVarejaoDto: CreateContactsVarejaoDto,
  ): Promise<ContactsVarejao[]> {
    try {
      const created = createContactsVarejaoDto.contacts.map(
        (contact: Contacts) => ({
          nome: contact.name,
          celular: contact.cellphone,
        }),
      );

      return await this.contactsVarejaoRepository.save(created);
    } catch (error) {
      this.logger.error(`fail to create macapa contacts: ${error.message}`);

      throw new InternalServerErrorException({
        code: ErrorsCode.FAIL_TO_CREATE_VAREJAO_CONTACTS,
        message: 'fail to create varejao contacts',
      });
    }
  }

  async findAll(): Promise<ContactsVarejao[]> {
    try {
      return await this.contactsVarejaoRepository.find();
    } catch (error) {
      this.logger.error(`fail to find all varejao contacts: ${error.message}`);

      throw new BadRequestException({
        code: ErrorsCode.FAIL_TO_FIND_ALL_VAREJAO_CONTACTS,
        message: 'fail to find all varejao contacts',
      });
    }
  }
}

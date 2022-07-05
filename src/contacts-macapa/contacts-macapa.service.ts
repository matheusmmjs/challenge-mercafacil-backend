import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorsCode } from '../shared/errors-code.enum';
import { Repository } from 'typeorm';
import {
  CreateContactsMacapaDto,
  Contacts,
} from './dto/create-contacts-macapa.dto';
import { ContactsMacapa } from './entities/contacts-macapa.entity';

export class ContactsMacapaService {
  private readonly logger = new Logger(ContactsMacapaService.name);

  constructor(
    @InjectRepository(ContactsMacapa)
    private readonly contactsMacapaRepository: Repository<ContactsMacapa>,
  ) {}

  async create(
    createContactsMacapaDto: CreateContactsMacapaDto,
  ): Promise<ContactsMacapa[]> {
    try {
      const created = createContactsMacapaDto.contacts.map(
        (contact: Contacts) => ({
          nome: contact.name.toUpperCase(),
          celular: contact.cellphone
            .trim()
            .replace(/(\d{2})(\d{2})(\d{5})(\d{4})/g, '+$1 ($2) $3-$4'),
        }),
      );

      return await this.contactsMacapaRepository.save(created);
    } catch (error) {
      this.logger.error(`fail to create macapa contacts: ${error.message}`);

      throw new InternalServerErrorException({
        code: ErrorsCode.FAIL_TO_CREATE_MACAPA_CONTACTS,
        message: 'fail to create macapa contacts',
      });
    }
  }

  async findAll(): Promise<ContactsMacapa[]> {
    try {
      return await this.contactsMacapaRepository.find();
    } catch (error) {
      this.logger.error(`fail to find all macapa contacts: ${error.message}`);

      throw new BadRequestException({
        code: ErrorsCode.FAIL_TO_FIND_ALL_MACAPA_CONTACTS,
        message: 'fail to find all macapa contacts',
      });
    }
  }
}

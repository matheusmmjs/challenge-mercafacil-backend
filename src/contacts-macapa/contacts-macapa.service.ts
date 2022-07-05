import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateContactsMacapaDto,
  IContacts,
} from './dto/create-contacts-macapa.dto';
import { ContactsMacapa } from './entities/contacts-macapa.entity';

export class ContactsMacapaService {
  constructor(
    @InjectRepository(ContactsMacapa)
    private readonly contactsMacapaRepository: Repository<ContactsMacapa>,
  ) {}

  async create(createContactsMacapaDto: CreateContactsMacapaDto) {
    const created = createContactsMacapaDto.contacts.map(
      (contact: IContacts) => ({
        nome: contact.name,
        celular: contact.cellphone,
      }),
    );

    return await this.contactsMacapaRepository.save(created);
  }

  findAll() {
    return `This action returns all macapa`;
  }
}

import { Controller, Get, Post, Body } from '@nestjs/common';
import { ContactsMacapaService } from './contacts-macapa.service';
import { CreateContactsMacapaDto } from './dto/create-contacts-macapa.dto';

@Controller({
  version: '1',
  path: 'contacts-macapa',
})
export class ContactsMacapaController {
  constructor(private readonly contactsMacapaService: ContactsMacapaService) {}

  @Post()
  async create(@Body() createContactsMacapaDto: CreateContactsMacapaDto) {
    return await this.contactsMacapaService.create(createContactsMacapaDto);
  }

  @Get()
  findAll() {
    return this.contactsMacapaService.findAll();
  }
}

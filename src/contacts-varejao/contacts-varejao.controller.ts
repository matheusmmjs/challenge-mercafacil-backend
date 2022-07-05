import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ContactsVarejaoService } from './contacts-varejao.service';
import { CreateContactsVarejaoDto } from './dto/create-contacts-varejao.dto';

@Controller({
  version: '1',
  path: 'contacts-varejao',
})
export class ContactsVarejaoController {
  constructor(
    private readonly contactsVarejaoService: ContactsVarejaoService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createContactsVarejaoDto: CreateContactsVarejaoDto) {
    return await this.contactsVarejaoService.create(createContactsVarejaoDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.contactsVarejaoService.findAll();
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ContactsMacapaService } from './contacts-macapa.service';
import { CreateContactsMacapaDto } from './dto/create-contacts-macapa.dto';

@Controller({
  version: '1',
  path: 'contacts-macapa',
})
export class ContactsMacapaController {
  constructor(private readonly contactsMacapaService: ContactsMacapaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createContactsMacapaDto: CreateContactsMacapaDto) {
    return await this.contactsMacapaService.create(createContactsMacapaDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.contactsMacapaService.findAll();
  }
}

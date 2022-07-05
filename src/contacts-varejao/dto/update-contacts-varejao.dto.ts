import { PartialType } from '@nestjs/mapped-types';
import { CreateContactsVarejaoDto } from './create-contacts-varejao.dto';

export class UpdateContactsVarejaoDto extends PartialType(
  CreateContactsVarejaoDto,
) {}

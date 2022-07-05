export interface IContacts {
  name: string;
  cellphone: string;
}

export class CreateContactsMacapaDto {
  contacts: [IContacts];
}

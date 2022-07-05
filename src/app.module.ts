import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { ContactsMacapaModule } from './contacts-macapa/contacts-macapa.module';
import { ContactsVarejaoModule } from './contacts-varejao/contacts-varejao.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ContactsMacapaModule,
    ContactsVarejaoModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

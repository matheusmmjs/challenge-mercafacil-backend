import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { ContactsMacapaModule } from './contacts-macapa/contacts-macapa.module';
import { ContactsVarejaoModule } from './contacts-varejao/contacts-varejao.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ContactsMacapaModule,
    ContactsVarejaoModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

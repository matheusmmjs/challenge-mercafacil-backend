import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { ContactsMacapaModule } from './contacts-macapa/contacts-macapa.module';

@Module({
  imports: [ConfigModule.forRoot(), ContactsMacapaModule],
  controllers: [AppController],
})
export class AppModule {}

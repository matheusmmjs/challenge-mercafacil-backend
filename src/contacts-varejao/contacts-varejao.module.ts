import { Module } from '@nestjs/common';
import { ContactsVarejaoService } from './contacts-varejao.service';
import { ContactsVarejaoController } from './contacts-varejao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactsVarejao } from './entities/contacts-varejao.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContactsVarejao], 'DB_CONNECTION_2'),
    TypeOrmModule.forRootAsync({
      name: 'DB_CONNECTION_2',
      useFactory: () => ({
        type: 'postgres',
        database: process.env.POSTGRES_DATABASE,
        password: process.env.POSTGRES_PASSWORD,
        port: parseInt(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        entities: [ContactsVarejao],
        synchronize: false,
      }),
    }),
  ],
  controllers: [ContactsVarejaoController],
  providers: [ContactsVarejaoService],
})
export class ContactsVarejaoModule {}

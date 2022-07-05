import { Module } from '@nestjs/common';
import { ContactsMacapaService } from './contacts-macapa.service';
import { ContactsMacapaController } from './contacts-macapa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactsMacapa } from './entities/contacts-macapa.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContactsMacapa], 'DB_CONNECTION_1'),
    TypeOrmModule.forRootAsync({
      name: 'DB_CONNECTION_1',
      useFactory: () => ({
        type: 'mysql',
        database: process.env.MYSQL_DATABASE,
        port: parseInt(process.env.MYSQL_PORT),
        password: process.env.MYSQL_ROOT_PASSWORD,
        username: process.env.MYSQL_USER,
        entities: [ContactsMacapa],
        synchronize: true,
      }),
    }),
  ],
  controllers: [ContactsMacapaController],
  providers: [ContactsMacapaService],
})
export class ContactsMacapaModule {}

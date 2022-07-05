import { Module } from '@nestjs/common';
import { ContactsMacapaService } from './contacts-macapa.service';
import { ContactsMacapaController } from './contacts-macapa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactsMacapa } from './entities/contacts-macapa.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContactsMacapa]),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.MYSQL_ROOT_HOST,
        port: parseInt(process.env.MYSQL_PORT),
        database: process.env.MYSQL_DATABASE,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        entities: [ContactsMacapa],
        synchronize: true,
      }),
    }),
  ],

  controllers: [ContactsMacapaController],
  providers: [ContactsMacapaService],
})
export class ContactsMacapaModule {}

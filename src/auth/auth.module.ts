import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { ContactsMacapaModule } from 'src/contacts-macapa/contacts-macapa.module';
import { ContactsVarejaoModule } from 'src/contacts-varejao/contacts-varejao.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,
    ContactsMacapaModule,
    ContactsVarejaoModule,
    JwtModule.register({
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: '60s',
      },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

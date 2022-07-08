import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller({
  version: '1',
  path: 'api/auth',
})
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post()
  async login() {}
}

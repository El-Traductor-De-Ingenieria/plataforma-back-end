import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthUser } from '../../utils/decorators';
import { ROUTES } from '../../utils/constants';
import { AutheticatedGuard, DiscordAuthGuard } from '../utils/Guards';
import { User } from '../../utils/typeorm/entities/User';

@Controller(ROUTES.AUTH)
export class AuthController {
  @Get('login')
  @UseGuards(DiscordAuthGuard)
  login() {}

  @Get('redirect')
  @UseGuards(DiscordAuthGuard)
  redirect(@Res() response: Response) {
    response.redirect('http://localhost');
  }

  @Post('logout')
  logout() {}

  @Get('status')
  @UseGuards(AutheticatedGuard)
  status(@AuthUser() user: User) {
    return user;
  }
}

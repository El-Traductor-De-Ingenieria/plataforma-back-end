import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthUser } from '../../utils/decorators';
import { ROUTES } from '../../utils/constants';
import { AutheticatedGuard, DiscordAuthGuard } from '../utils/Guards';
import { User } from '../../utils/typeorm/entities/User';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Autentificar')

@Controller(ROUTES.AUTH)
export class AuthController {
  @Get('login')
  @UseGuards(DiscordAuthGuard)
  @ApiOperation({ summary: 'Iniciar sesión del usuario con discord' })
  @ApiResponse({ status: 200, description: 'Operación exitosa.' })
  login() {}

  @Get('redirect')
  @UseGuards(DiscordAuthGuard)
  @ApiOperation({ summary: 'Redirige al usuario al panel principal' })
  @ApiResponse({ status: 200, description: 'Operación exitosa.' })
  redirect(@Res() response: Response) {
    response.redirect('http://localhost');
  }

  @Post('logout')
  @ApiOperation({ summary: 'Cierra la sesión del usuario' })
  @ApiResponse({ status: 200, description: 'Operación exitosa.' })
  logout() {}

  @Get('status')
  @UseGuards(AutheticatedGuard)
  @ApiOperation({ summary: 'Obtiene el objeto del usuario actual' })
  @ApiResponse({ status: 200, description: 'Operación exitosa.' ,type: User,})
  status(@AuthUser() user: User) {
    return user;
  }
}

import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthUser } from '../../utils/decorators';
import { ROUTES } from '../../utils/constants';
import { AutheticatedGuard, DiscordAuthGuard } from '../utils/Guards';
import { User } from '../../utils/typeorm/entities/User';
import {
    ApiCookieAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('Autenticación')
@Controller(ROUTES.AUTH)
export class AuthController {
    @Get('login')
    @UseGuards(DiscordAuthGuard)
    @ApiOperation({
        summary:
            'Inicia sesión del usuario con Discord, esto se establecerá con una cookie de sesión.',
    })
    @ApiResponse({ status: 200, description: 'Operación exitosa.' })
    login() {}

    @Get('redirect')
    @UseGuards(DiscordAuthGuard)
    @ApiOperation({ summary: 'Redirige al usuario al panel principal.' })
    @ApiResponse({ status: 200, description: 'Operación exitosa.' })
    redirect(@Res() response: Response) {
        response.redirect('http://localhost:8080');
    }

    @Post('logout')
    @UseGuards(AutheticatedGuard)
    @ApiOperation({ summary: 'Cierra la sesión del usuario.' })
    @ApiResponse({ status: 200, description: 'Operación exitosa.' })
    logout(@Req() request: Request, @Res() response: Response) {
        request.logout(
            {
                keepSessionInfo: false,
            },
            () => {
                response.redirect('http://localhost:8080');
            }
        );
    }

    @Get('status')
    @UseGuards(AutheticatedGuard)
    @ApiCookieAuth()
    @ApiOperation({ summary: 'Obtiene el objeto del usuario actual.' })
    @ApiResponse({ status: 200, description: 'Operación exitosa.', type: User })
    status(@AuthUser() user: User) {
        return user;
    }
}

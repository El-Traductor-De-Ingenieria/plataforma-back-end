import { Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import axios from 'axios';
import { AutheticatedGuard } from 'src/auth/utils/Guards';
import { ROUTES } from '../../utils/constants';

@ApiBearerAuth()
@ApiTags('Usuario')

@Controller(ROUTES.USER)
export class UserController {
  @Get('roles/:id')
  @UseGuards(AutheticatedGuard)
  @ApiOperation({ summary: 'Obtiene los roles del usuario actual' })
  @ApiResponse({ status: 200, description: 'Operación exitosa.', })
  async roles(@Param('id') id: string) {
    let x: any;
    await axios .get(`https://discord.com/api/guilds/${process.env.GUILD_ID}/members/${id}`,
    {
      headers: {
        'Authorization': 'Bot MTAxNTMzNjcxODQ4MTc1NjE3MA.GBnykX.uHqXoQsAWyQQlhrG9o5wes3LniL_alGWoxEaDA'
      }
    })
    .then((response) => x=response.data.roles)
    .catch((err) => x = err);
    
    return x;
  }
}

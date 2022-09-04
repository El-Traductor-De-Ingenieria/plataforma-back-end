import { Controller, Get, Inject, Param, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AutheticatedGuard } from 'src/auth/utils/Guards';
import { ROUTES, SERVICES } from '../../utils/constants';
import { IUserService } from '../interfaces/user';
@ApiBearerAuth()
@ApiTags('Usuario')

@Controller(ROUTES.USER)
export class UserController {
  constructor(@Inject(SERVICES.USER) private readonly userService: IUserService){}
  @Get(':id')
  @UseGuards(AutheticatedGuard) 
  @ApiOperation({ summary: 'Obtiene los datos del usuario en discord' })
  @ApiResponse({ status: 200, description: 'Operación exitosa.', })
  async roles(@Param('id') id: string) {
    return this.userService.findUserByDiscordId(id);
  }
}

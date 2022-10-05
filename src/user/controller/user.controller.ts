import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Inject,
    Param,
    Post,
    Res,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { AutheticatedGuard } from '../../auth/utils/Guards';
import { AuthUser } from '../../utils/decorators';
import { ROUTES, SERVICES } from '../../utils/constants';
import { IUserService } from '../interfaces/user';
import { User } from '../../utils/typeorm/entities/User';
import { RoleType } from '../../utils/types';
import { Response } from 'express';

@ApiBearerAuth()
@ApiTags('Usuario')
@Controller(ROUTES.USER)
export class UserController {
    constructor(
        @Inject(SERVICES.USER) private readonly userService: IUserService
    ) {}

    @Get(':id')
    @UseGuards(AutheticatedGuard)
    @ApiOperation({ summary: 'Obtiene los datos del usuario' })
    @ApiResponse({ status: 200, description: 'Operación exitosa.' })
    async getUser(@Param('id') id: number) {
        return this.userService.findUserById(id);
    }

    @Post(':id')
    @UseGuards(AutheticatedGuard)
    @ApiOperation({ summary: 'Modifica los datos de un usuario' })
    @ApiResponse({ status: 200, description: 'Operación exitosa.' })
    async postUser(
        @AuthUser() user: User,
        @Param('id') id: number,
        @Res({ passthrough: true }) response: Response,
        @Body('user') userRequest: any
    ) {
        const targetUser = await this.userService.findUserById(id);

        let userRes = null;
        if (user.id == id) {
            //then we are the owner
            if (userRequest) {
                if (typeof userRequest.username === typeof targetUser.username)
                    targetUser.username = userRequest.username;
            }

            userRes = await this.userService.saveUser(targetUser);
        }
        if (
            user.roles.includes(RoleType.MOD) ||
            user.roles.includes(RoleType.ADMIN)
        ) {
            //then we can change other thing, for now only roles
            if (userRequest) {
                if (
                    typeof userRequest.roles === typeof user.roles ||
                    Array.isArray(userRequest.roles)
                ) {
                    if (user.roles.includes(RoleType.ADMIN)) {
                        targetUser.roles = userRequest.roles;
                    } else if (
                        user.roles.includes(RoleType.MOD) &&
                        !userRequest.roles.includes(RoleType.ADMIN)
                    ) {
                        if (
                            userRequest.roles.includes(RoleType.MOD) &&
                            user.id == id
                        )
                            targetUser.roles = userRequest.roles;
                        else if (
                            !userRequest.roles.includes(RoleType.MOD) &&
                            user.id != id
                        )
                            targetUser.roles = userRequest.roles;
                    }
                }
            }

            userRes = await this.userService.saveUser(targetUser);
        }

        if (!userRes) {
            response.status(HttpStatus.UNAUTHORIZED).send();
        } else {
            return userRes;
        }
    }
}

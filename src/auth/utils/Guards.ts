import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { RoleType } from '../../utils/types';

@Injectable()
export class DiscordAuthGuard extends AuthGuard('discord') {
    async canActivate(context: ExecutionContext) {
        const activate = (await super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest();

        await super.logIn(request);

        return activate;
    }
}

@Injectable()
export class AutheticatedGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authenticated = request.isAuthenticated();
        const roles = this.reflector.get<RoleType[]>(
            'roles',
            context.getHandler()
        );

        if (!roles) return authenticated;

        for (const role in roles) {
            if (request.user.roles.includes(role)) return authenticated;
        }

        return false;
    }
}

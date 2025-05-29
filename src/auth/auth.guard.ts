import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const auth = request.headers['authorization'];
    if (auth && auth === 'Bearer fake-jwt-token') {
      return true;
    }
    throw new UnauthorizedException('Invalid or missing token');
  }
}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategy/local.strategy';
import { SessionService } from './session.service';
import { HashModule } from 'src/hash/hash.module';
import { SessionSerializer } from './session.serializer';

@Module({
	imports: [HashModule, UserModule, PassportModule.register({ session: true })],
	providers: [SessionSerializer, AuthService, SessionService, LocalStrategy],
	controllers: [AuthController],
})
export class AuthModule {}

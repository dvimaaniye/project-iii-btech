import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

// import { PassportModule } from '@nestjs/passport';

import { HashModule } from '@/hash/hash.module';
import { UserModule } from '@/user/user.module';

import { AuthController } from './auth.controller';
import { AuthListener } from './auth.listener';
import { AuthService } from './auth.service';
import { SessionSerializer } from './session.serializer';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
	imports: [HashModule, UserModule, JwtModule],
	providers: [SessionSerializer, AuthService, LocalStrategy, AuthListener],
	controllers: [AuthController],
})
export class AuthModule {}

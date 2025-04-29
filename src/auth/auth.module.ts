import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategy/local.strategy';
import { AccessTokenStrategy } from './strategy/access-token.strategy';
import { SessionService } from './session.service';
import PrismaModule from 'src/prisma/prisma.module';
import MyJwtModule from './jwt.module';
import { SessionCleanupService } from './session-cleanup.service';
import { RefreshTokenStrategy } from './strategy/refresh-token.strategy';
import { TokenService } from './token.service';
import { HashModule } from 'src/hash/hash.module';

@Module({
	imports: [
		HashModule,
		AuthModule,
		UsersModule,
		PassportModule,
		PrismaModule,
		MyJwtModule,
	],
	providers: [
		TokenService,
		AuthService,
		SessionService,
		SessionCleanupService,
		LocalStrategy,
		AccessTokenStrategy,
		RefreshTokenStrategy,
	],
	controllers: [AuthController],
})
export class AuthModule {}

import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './strategy/local-auth.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Request, Response } from 'express';
import { PublicUser } from 'src/user/user.service';
import { SessionAuthGuard } from 'src/common/guards/session-auth.guard';
import { GuestOnlyApiGuard } from 'src/common/guards/guest-only-api.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseGuards(GuestOnlyApiGuard)
	@Post('/register')
	register(@Body() createUserDto: CreateUserDto): Promise<PublicUser> {
		return this.authService.register(createUserDto);
	}

	@UseGuards(GuestOnlyApiGuard, LocalAuthGuard)
	@Post('/sign-in')
	signIn(@Req() req: Request) {
		// Wait for login to complete before returning
		return new Promise((resolve, reject) => {
			req.login(req.user!, (err) => {
				if (err) {
					console.log('Error while logging in:', err);
					reject(err);
				} else {
					console.log('Login successful, session saved');
					resolve(req.user);
				}
			});
		});
	}

	@UseGuards(SessionAuthGuard)
	@Post('/sign-out')
	signOut(@Req() req: Request) {
		return new Promise((resolve, reject) => {
			req.logout({ keepSessionInfo: false }, (err) => {
				if (err) {
					console.log('Error while logging out:', err);
					reject(err);
				} else {
					console.log('Logout successful, session deleted');
					resolve({ message: 'Logout successful' });
				}
			});
		});
	}
}

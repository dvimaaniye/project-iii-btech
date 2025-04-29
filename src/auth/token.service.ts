import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { config } from 'src/config/config.module';

@Injectable()
export class TokenService {
	public readonly accessTokenExpiresIn = config.JWT_ACCESS_TOKEN_EXPIRES_IN;
	public readonly refreshTokenExpiresIn = config.JWT_REFRESH_TOKEN_EXPIRES_IN;

	private readonly accessTokenSignOpts: JwtSignOptions = {
		expiresIn: `${this.accessTokenExpiresIn}`,
		secret: config.JWT_ACCESS_TOKEN_SECRET,
	};
	private readonly accessTokenVerifyOpts: JwtVerifyOptions = {
		secret: config.JWT_ACCESS_TOKEN_SECRET,
	};
	private readonly refreshTokenSignOpts: JwtSignOptions = {
		expiresIn: `${this.refreshTokenExpiresIn}`,
		secret: config.JWT_REFRESH_TOKEN_SECRET,
	};
	private readonly refreshTokenVerifyOpts: JwtVerifyOptions = {
		secret: config.JWT_REFRESH_TOKEN_SECRET,
	};

	constructor(private readonly jwtService: JwtService) {}

	async getAccessToken(data: Buffer | object) {
		return this.jwtService.signAsync(data, this.accessTokenSignOpts);
	}

	async verifyAccessToken(token: string): Promise<any> {
		return this.jwtService.verifyAsync(token, this.accessTokenVerifyOpts);
	}

	async getRefreshToken(data: Buffer | object) {
		return this.jwtService.signAsync(data, this.refreshTokenSignOpts);
	}

	async verifyRefreshToken(token: string): Promise<any> {
		return this.jwtService.verifyAsync(token, this.refreshTokenVerifyOpts);
	}
}

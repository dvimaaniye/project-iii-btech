import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashService {
	private readonly rounds = 10;

	async hash(input: string): Promise<string> {
		return bcrypt.hash(input, this.rounds);
	}

	async compare(inputHash: string, plainText: string): Promise<boolean> {
		return bcrypt.compare(plainText, inputHash);
	}
}

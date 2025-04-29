import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { SessionService } from './session.service';

@Injectable()
export class SessionCleanupService {
	constructor(private readonly sessionService: SessionService) {}

	@Interval(60 * 60 * 1000)
	async handleInterval() {
		const { count } = await this.sessionService.deleteMany({
			expiresAt: { lt: new Date() },
		});
		console.log(`Deleted ${count} stale sessions`);
		return count;
	}
}

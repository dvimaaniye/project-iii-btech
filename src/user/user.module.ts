import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { HashModule } from 'src/hash/hash.module';

@Module({
	imports: [HashModule],
	controllers: [],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}

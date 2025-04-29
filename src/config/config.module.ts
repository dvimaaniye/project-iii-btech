import {
	TypedConfigModule,
	dotenvLoader,
	selectConfig,
} from 'nest-typed-config';
import { Config } from './config';
import { DynamicModule } from '@nestjs/common';

export const ConfigModule: DynamicModule = TypedConfigModule.forRoot({
	schema: Config,
	load: dotenvLoader(),
});

export const config = selectConfig(ConfigModule, Config);

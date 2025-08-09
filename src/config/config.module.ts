import {
	DotenvLoaderOptions,
	TypedConfigModule,
	dotenvLoader,
	selectConfig,
} from 'nest-typed-config';
import { Config } from './config';
import { DynamicModule } from '@nestjs/common';

const options: DotenvLoaderOptions = {
	expandVariables: true,
};

export const ConfigModule: DynamicModule = TypedConfigModule.forRoot({
	schema: Config,
	load: dotenvLoader(options),
});

export const config = selectConfig(ConfigModule, Config);

import { registerAs } from '@nestjs/config';
import { Environment } from '../env.validation';

export const BaseConfig = registerAs('base-config', () => ({
  appName: process.env.APP_NAME,
  isProduction: process.env.NODE_ENV === Environment.Production,
  isTest: process.env.NODE_ENV === Environment.Test,
  isStaging: process.env.NODE_ENV === Environment.Staging,
  serverFullHost: process.env.SERVER_FULL_HOST,
}));

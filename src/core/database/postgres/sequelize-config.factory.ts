import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { BaseConfig, PostgresConfig } from '../../config';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize/dist/interfaces/sequelize-options.interface';
import { UserModel } from '@api/user/models/user.model';
import { BetModel } from '@api/bet/models/bet.model';

@Injectable()
export class SequelizeConfigFactory implements SequelizeOptionsFactory {
  constructor(
    @Inject(PostgresConfig.KEY)
    private readonly postgresConfig: ConfigType<typeof PostgresConfig>,
    @Inject(BaseConfig.KEY)
    private readonly baseConfig: ConfigType<typeof BaseConfig>,
  ) {}

  public createSequelizeOptions(): SequelizeModuleOptions {
    return {
      dialect: 'postgres',
      host: this.postgresConfig.host,
      port: this.postgresConfig.port,
      username: this.postgresConfig.user,
      password: this.postgresConfig.password,
      database: this.postgresConfig.dbName,
      models: [UserModel, BetModel],
      modelMatch: (filename, member) => {
        return (
          filename.substring(0, filename.indexOf('.model')) + 'model' ===
          member.toLowerCase()
        );
      },
      logging: !this.baseConfig.isProduction,
    };
  }
}

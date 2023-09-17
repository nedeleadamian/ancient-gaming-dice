import { Module, OnModuleInit } from '@nestjs/common';
import { CoreModule } from '@core/core.module';
import { ApiModule } from '@api/api.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '@api/user/models/user.model';
import { BetModel } from '@api/bet/models/bet.model';
import { SeedService } from './seed.service';
import { Sequelize } from 'sequelize-typescript';

@Module({
  imports: [
    CoreModule,
    ApiModule,
    SequelizeModule.forFeature([UserModel, BetModel]),
  ],
  providers: [SeedService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly seedService: SeedService,
  ) {}

  async onModuleInit() {
    await this.sequelize.sync();
    await this.seedService.seed();
  }
}

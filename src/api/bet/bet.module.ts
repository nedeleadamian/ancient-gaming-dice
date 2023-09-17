import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BetModel } from './models/bet.model';
import { BetResolver } from './resolvers/bet.resolver';
import { BetSchemaResolver } from './resolvers/bet-schema.resolver';
import { BetService } from './bet.service';
import { UserModel } from '../user/models/user.model';

const RESOLVERS = [BetResolver, BetSchemaResolver];
const SERVICES = [BetService];

@Module({
  imports: [SequelizeModule.forFeature([BetModel, UserModel])],
  providers: [...RESOLVERS, ...SERVICES],
})
export class BetModule {}

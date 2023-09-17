import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './models/user.model';
import { UserSchemaResolver } from './resolvers/user-schema.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { UserService } from './user.service';
import { BetModel } from '../bet/models/bet.model';

const RESOLVERS = [UserResolver, UserSchemaResolver];
const SERVICES = [UserService];

@Module({
  imports: [SequelizeModule.forFeature([UserModel, BetModel])],
  providers: [...RESOLVERS, ...SERVICES],
})
export class UserModule {}

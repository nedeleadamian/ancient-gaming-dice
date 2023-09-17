import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphqlConfigFactory } from './graphql-config.factory';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DataLoaderModule } from '@core/graphql/data-loader/data-loader.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GraphqlConfigFactory,
      imports: [DataLoaderModule],
    }),
  ],
})
export class GqlModule {}

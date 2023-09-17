import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { BaseConfig } from '../config';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { DataLoaderService } from '@core/graphql/data-loader/data-loader.service';

@Injectable()
export class GraphqlConfigFactory implements GqlOptionsFactory {
  constructor(
    @Inject(BaseConfig.KEY)
    private readonly baseConfig: ConfigType<typeof BaseConfig>,
    private readonly dataloaderService: DataLoaderService,
  ) {}

  createGqlOptions(): ApolloDriverConfig {
    return {
      autoSchemaFile: `${process.cwd()}/src/schema.gql`,
      sortSchema: true,
      playground: !this.baseConfig.isProduction,
      context: () => ({
        loaders: this.dataloaderService.getLoaders(),
      }),
      // typePaths: ['./**/*.graphql'],
    };
  }
}

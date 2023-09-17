import { Module } from '@nestjs/common';
import { DataLoaderModule } from '@core/graphql/data-loader/data-loader.module';
import { ContextService } from '@core/graphql/context/context.service';

@Module({
  imports: [DataLoaderModule],
  providers: [ContextService],
})
export class ContextModule {}

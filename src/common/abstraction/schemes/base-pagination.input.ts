import {
  ArgsType,
  Field,
  InputType,
  Int,
  registerEnumType,
} from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
  description: 'ASC or DESC',
});

@InputType()
export class SortInput {
  @Field()
  public field: string;

  @Field(() => SortOrder)
  public order: SortOrder;
}

@ArgsType()
export class BasePaginationArgs {
  @Field(() => Int, {
    nullable: true,
    defaultValue: 20,
  })
  @Min(1)
  @Max(100)
  public limit = 20;

  @Field(() => Int, {
    nullable: true,
    defaultValue: 1,
  })
  @Min(1)
  public page = 1;

  @Field(() => [SortInput], {
    nullable: true,
    defaultValue: [],
  })
  public sort: SortInput[] = [];
}

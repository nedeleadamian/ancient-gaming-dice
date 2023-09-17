import { BaseSchema } from '@common/abstraction/schemes/base.schema';
import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType({ implements: BaseSchema })
export class UserSchema extends BaseSchema {
  @Field(() => String)
  public name: string;

  @Field(() => Float)
  public balance: number;
}

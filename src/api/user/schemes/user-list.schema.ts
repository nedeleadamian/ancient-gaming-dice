import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserSchema } from './user.schema';

@ObjectType()
export class UserListSchema {
  @Field(() => Int)
  public count: number;

  @Field(() => [UserSchema])
  public data: UserSchema[];
}

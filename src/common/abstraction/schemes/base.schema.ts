import { Field, ID, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class BaseSchema {
  @Field(() => ID)
  public id: number;

  @Field(() => Date, { nullable: true })
  public createdAt?: string | Date;

  @Field(() => Date, { nullable: true })
  public updatedAt?: string | Date;
}

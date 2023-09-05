import { Field, ObjectType } from 'type-graphql';
import { getModelForClass } from '@typegoose/typegoose';

@ObjectType()
export class Letter {
    @Field(() => String)
    letter: string;

    @Field(() => String)
    color: string;
}

export const LetterModel = getModelForClass(Letter);

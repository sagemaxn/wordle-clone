import { Field, ObjectType } from 'type-graphql';
import { getModelForClass } from '@typegoose/typegoose';
import { Letter } from './Letter';

@ObjectType()
export class Word {
    @Field(() => [Letter])
    public word: Letter[];
}

export const WordModel = getModelForClass(Word);

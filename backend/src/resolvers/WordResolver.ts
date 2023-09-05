import { Arg, Query, Resolver } from 'type-graphql';
import { readFileSync } from 'fs';
import correctAnswer from '../dictionary/logic/currentWord';
import * as path from 'path';
console.log(correctAnswer);

@Resolver()
export class WordResolver {
    @Query(() => String)
    answer() {
        return correctAnswer;
    }

    @Query(() => Boolean)
    inDictionary(@Arg('guess') guess: string) {
        const wordPath = path.join(
            __dirname,
            '..',
            'dictionary',
            'wordList.txt',
        );
        const contents = readFileSync(wordPath, 'utf-8');
        return contents.includes(guess);
    }
}

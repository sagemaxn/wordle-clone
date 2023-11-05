import { Arg, Query, Resolver } from 'type-graphql';
import * as fs from 'fs';
import { readFileSync } from 'fs';
import * as path from 'path';

@Resolver()
export class WordResolver {
    @Query(() => String)
    answer() {
        const data = JSON.parse(
            fs.readFileSync(
                path.join(__dirname, '../dictionary/logic/currentWord.json'),
                'utf-8',
            ),
        );
        return data.correctAnswer;
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

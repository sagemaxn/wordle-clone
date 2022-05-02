import { arrayContains } from "class-validator";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  ObjectType,
  Field,
} from "type-graphql";
import { readFileSync } from "fs";
const path = require("path");

@ObjectType()
export class Letter {
  @Field(() => String)
  letter: string;

  @Field(() => String)
  color: string;
}

@ObjectType()
export class Word {
  @Field(() => [Letter])
  public word: Letter[];
}

const correctAnswer = "noise";

@Resolver()
export class WordResolver {
  @Query(() => String)
  answer() {
    return correctAnswer;
  }

  @Query(() => Boolean)
  inDictionary(@Arg("guess") guess: string) {
    const wordPath = path.join(__dirname, "..", "dictionary", "wordList.txt");
    const contents = readFileSync(wordPath, "utf-8");
    const result = contents.includes(guess);
    return result;
  }

  @Mutation(() => Word)
  word(@Arg("guess") guess: string) {
    //console.log(guess);
    let guessLetters;
    if (guess) {
      guessLetters = guess.split("");
    }

    const answerLetters = correctAnswer.split("");
    let dupe = [...answerLetters];

    let colors = {
      word: [
        { letter: "no word", color: "s" },
        { letter: "no word", color: "s" },
      ],
    };

    colors.word = guessLetters.map((l, index) => {
      if (answerLetters[index] === guessLetters[index]) {
        console.log(index, answerLetters[index], guessLetters[index]);
        console.log(dupe);
        dupe.splice(dupe.indexOf(l), 1);
        return { letter: l, color: "green" };
      } else return { letter: l, color: "darkgrey" };
    });

    colors.word.map((l) => {
      if (dupe.includes(l.letter) && l.color !== "green") {
        l.color = "yellow";
        dupe.splice(dupe.indexOf(l.letter), 1);
      }
      return l;
    });
    console.log(colors);
    return colors;
  }
}

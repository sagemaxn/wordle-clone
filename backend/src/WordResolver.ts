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

//The random word. will be handled elsewhere later

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

const wordyWord = "teeth";

@Resolver()
export class WordResolver {
  @Query(() => String)
  test(@Ctx() { req, res }, @Arg("c") c: string): String {
    return "asdasda";
  }

  @Mutation(() => Word)
  word(@Arg("guess") guess: string) {
    console.log(guess);
    let guessLetters;
    if (guess) {
      guessLetters = guess.toLowerCase().split("");
    }

    const answerLetters = wordyWord.split("");

    let colors = {
      word: [
        { letter: "no word", color: "s" },
        { letter: "no word", color: "s" },
      ],
    };

    colors.word = guessLetters.map((l, index) => {});

    return colors;
  }
}

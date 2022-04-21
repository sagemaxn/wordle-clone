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
export class Word {
  @Field(() => [String])
  public word: string[];
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

    const wordLetters = wordyWord.split("");

    let colors = { word: "d" };

    const count = (ar, letter) => ar.reduce((a, b) => a + letter, 0) 

    //currently yellows do not account for how many times the letter exists in the answer, only that it exists at least once

    colors.word = guessLetters.map((l, index) => {
      if(wordLetters[index] === guessLetters[index]){
        console.log(count(wordLetters, l))
        return "green"
      }
      if (wordLetters.includes(l)) {
        return "yellow"
      }
      return "grey";
    });    
    return colors;
  }
}

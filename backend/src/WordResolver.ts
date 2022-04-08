import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";

//The random word. will be handled elsewhere later
const wordyWord = "teeth";

@Resolver()
export class WordResolver {
  @Query(() => String)
  test(@Ctx() { req, res }, @Arg("c") c: string): String {
    return "asdasda";
  }

  @Mutation(() => [String])
  word(@Arg("guess") guess: string) {
      console.log(guess)
    let guessLetters;
    if (guess) {
      guessLetters = guess.toLowerCase().split("");
    }

    const wordLetters = wordyWord.split("");

    let colors = [];
    //need to add logic for when a word has 1 of a letter and person guesses a word with that letter twice, in which they get the placement of 1 of these correct. That should result in green and grey but results in green and yellow.
    
    // ternary operator inside of ternary operator is not easily readable, convert to if else

    colors = guessLetters.map((l, index) =>
      wordLetters.includes(l, index)
        ? wordLetters[index] === guessLetters[index]
          ? "green"
          : "yellow"
        : "grey"
    );

    console.log(colors);

    return colors;
  }
}

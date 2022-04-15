import { useState, useEffect } from "react";
import LetterGrid from "../components/LetterGrid";
import Keyboard from "../components/Keyboard";
import { GuessDocument, useGuessMutation } from "../generated/graphql";

import useEventListener from "@use-it/event-listener";
import { useQuery } from "@apollo/client";

const Index = () => {
  const [ar, setAr] = useState([
    [
      { letter: "", color: "grey" },
      { letter: "", color: "" },
      { letter: "", color: "" },
      { letter: "", color: "" },
      { letter: "", color: "" },
    ],
    [
      { letter: "" },
      { letter: "" },
      { letter: "" },
      { letter: "" },
      { letter: "" },
    ],
    [
      { letter: "" },
      { letter: "" },
      { letter: "" },
      { letter: "" },
      { letter: "" },
    ],
    [
      { letter: "" },
      { letter: "" },
      { letter: "" },
      { letter: "" },
      { letter: "" },
    ],
    [
      { letter: "" },
      { letter: "" },
      { letter: "" },
      { letter: "" },
      { letter: "" },
    ],
  ]);
  const [rowInd, setRowInd] = useState(0);
  const [wordInd, setWordInd] = useState(0);
  const [guess, { data, loading }] = useGuessMutation();

  useEventListener("keydown", (e) => {
    return handleInput(e.key);
  });

  async function handleInput(keyPress) {
    let newAr = [...ar];
    let row = newAr[rowInd];
    let letter = row[wordInd];

    if (keyPress === "Enter" && wordInd === 4) {
      let guessInput = row.map((l) => l.letter).join("");
      // let guessInput = Object.keys(row).forEach((key, index) => {
      //   console.log(key)
      //   return key})
      // interface obj {
      //   letter: string;
      //   color: string;
      // }
      // const objectMap = (obj: obj, fn) =>
      //   Object.fromEntries(Object.entries(obj).map((l) => l.letter.join("")));

      // const myObject = { a: 1, b: 2, c: 3 };

      // console.log(objectMap(myObject, (v) => 2 * v));

      console.log(guessInput);
      await guess({ variables: { guess: guessInput } });
      if(data){
        row.map((l, i) => l.color = data.word.word[i])
        console.log(data)
        
      }
      let newInd = rowInd + 1;
        setRowInd(newInd);
        setWordInd(0);
        console.log(ar)

     
      
    
    } else if (keyPress === "Backspace") {
      console.log(letter.letter);
      letter.letter = "";
      setAr([...newAr]);
      if (wordInd !== 0) {
        setWordInd((wordInd) => wordInd - 1);
      }
      console.log(letter.letter);
    } else if (letter.letter == "") {
      console.log(letter.letter);

      letter.letter = keyPress.toUpperCase();
      setAr([...newAr]);
      if (wordInd < 4) {
        setWordInd(wordInd + 1);
      }
      console.log(letter.letter);
    }
  }

  return (
    <>
      <LetterGrid array={ar} />
      <Keyboard handleInput={handleInput} />
    </>
  );
};

export default Index;

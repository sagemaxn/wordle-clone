import { useState, useEffect } from "react";
import LetterGrid from "../components/LetterGrid";
import Keyboard from "../components/Keyboard";
import { GuessDocument, useGuessMutation } from "../generated/graphql";
import {Button, Container, Heading} from '@chakra-ui/react'

import useEventListener from "@use-it/event-listener";

const stColor = 'lightgrey'

const Index = () => {
  const [ar, setAr] = useState([
    [
      { letter: "", color: stColor },
      { letter: "", color: stColor },
      { letter: "", color: stColor },
      { letter: "", color: stColor },
      { letter: "", color: stColor },
    ],
    [
      { letter: "", color: stColor },
      { letter: "", color: stColor },
      { letter: "", color: stColor },
      { letter: "", color: stColor },
      { letter: "", color: stColor },
    ],
    [
      { letter: "", color: stColor },
      { letter: "", color: stColor },
      { letter: "", color: stColor },
      { letter: "", color: stColor },
      { letter: "", color: stColor },
    ],
    [
      { letter: "", color: stColor },
      { letter: "", color: stColor },
      { letter: "", color: stColor },
      { letter: "", color: stColor },
      { letter: "", color: stColor },
    ],
    [
      { letter: "", color: stColor },
      { letter: "", color: stColor },
      { letter: "", color: stColor },
      { letter: "", color: stColor },
      { letter: "", color: stColor },
    ]
  ]);
  const [rowInd, setRowInd] = useState(0);
  const [wordInd, setWordInd] = useState(0);
  const [guess, { data, loading }] = useGuessMutation();

  useEffect(() => console.log(data),[data])

  useEventListener("keydown", (e) => {
    return handleInput(e.key);
  });

  async function handleInput(keyPress) {
    const allowedC = /^[a-z]+$/
    let newAr = [...ar];
    let row = newAr[rowInd];
    console.log(row)
    let letter = row[wordInd];
    

    if (keyPress === "Enter" && wordInd === 4) {
      let guessInput = row.map((l) => l.letter).join("");

      await guess({ variables: { guess: guessInput } });
      if(loading){
        return 'loading'
      }
      if(data){
        let newRow = row.map((l, i) => {return {...l, color:data.word.word[i]}})
        console.log(newRow)
        newAr[rowInd] = newRow
        setAr([...newAr])
        let newInd = rowInd + 1;
        setRowInd(newInd);
        setWordInd(0);
        console.log(ar)
        
        
      }
          
    
    } else if (keyPress === "Backspace") {
      console.log(letter.letter);
      letter.letter = "";
      setAr([...newAr]);
      if (wordInd !== 0) {
        setWordInd((wordInd) => wordInd - 1);
      }
      console.log(letter.letter);

    } else if (letter.letter == "" && allowedC.test(keyPress)) {
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
    <Container centerContent={true}>
      <Heading size="xl">Wordle Clone</Heading>
      <LetterGrid array={ar} />
      <Keyboard handleInput={handleInput} />
      <Button onClick={()=> console.log(data)}/>
      </Container>
  );
};

export default Index;

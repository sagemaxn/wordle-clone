import { useState, useEffect } from "react";
import { Container, Heading, useDisclosure } from "@chakra-ui/react";
import useEventListener from "@use-it/event-listener";

import LetterGrid from "../components/LetterGrid";
import Keyboard from "../components/Keyboard";
import Alert from "../components/Alert"
import { useGuessMutation } from "../generated/graphql";

const stColor = "lightgrey";

const Index = () => {
  const [gameOn, setGameOn] = useState(true);
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
    ],
  ]);
  const [rowInd, setRowInd] = useState(0);
  const [wordInd, setWordInd] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [guess, { data }] = useGuessMutation();

  let newAr = [...ar];
  let row = newAr[rowInd];

  useEffect(() => {
    if(data){
    let newRow = row.map((l, i) => {
      return { ...l, color: data.word.word[i] };
    });
    newAr[rowInd] = newRow;
    setAr([...newAr])
    if(newRow.map(l => l.color).join("") === "greengreengreengreengreen"){
      setGameOn(false)
      onOpen()
    }
    let newInd = rowInd + 1;
    setRowInd(newInd);
    setWordInd(0);
  }}, [data]);

  useEventListener("keydown", (e) => {
    return handleInput(e.key);
  });

  async function handleInput(keyPress) {
    if((gameOn)){
    const allowedC = /^[a-z]+$/;
    let letter = row[wordInd]

    if (keyPress === "Enter" && wordInd === 4) {
      let guessInput = row.map((l) => l.letter).join("");
      guess({ variables: { guess: guessInput } });

    } else if (keyPress === "Backspace") {
      letter.letter = "";
      setAr([...newAr]);
      if (wordInd !== 0) {
        setWordInd((wordInd) => wordInd - 1);
      }
    } else if (letter.letter == "" && allowedC.test(keyPress)) {
      letter.letter = keyPress.toUpperCase();
      setAr([...newAr]);
      if (wordInd < 4) {
        setWordInd(wordInd + 1);
      }
    }
  }
}
  return (
    <Container centerContent={true}>
      <Alert isOpen={isOpen} onClose={onClose}/>
      <Heading size="xl">Wordle Clone</Heading>
      <LetterGrid array={ar} />
      <Keyboard handleInput={handleInput} array={ar} color={stColor}/>
    </Container>
  );
};

export default Index;

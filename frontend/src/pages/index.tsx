import { useState, useEffect } from "react";
import LetterGrid from "../components/LetterGrid";
import Keyboard from "../components/Keyboard";
import { useGuessMutation } from "../generated/graphql";
import { Button, Container, Heading } from "@chakra-ui/react";

import useEventListener from "@use-it/event-listener";

const stColor = "lightgrey";

const Index = () => {
  const [won, setWon] = useState(false);
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
  const [guess, { data, loading }] = useGuessMutation({
    onCompleted() {
      console.log(1, data);
    },
  });

  let newAr = [...ar];
  let row = newAr[rowInd];
  console.log(row);

  useEffect(() => {
    if(data){
    let newRow = row.map((l, i) => {
      return { ...l, color: data.word.word[i] };
    });
    newAr[rowInd] = newRow;
    setAr([...newAr]);
    let newInd = rowInd + 1;
    setRowInd(newInd);
    setWordInd(0);
  }}, [data]);

  useEventListener("keydown", (e) => {
    return handleInput(e.key);
  });

  async function handleInput(keyPress) {
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

  return (
    <Container centerContent={true}>
      <Heading size="xl">Wordle Clone</Heading>
      <LetterGrid array={ar} />
      <>{JSON.stringify(data) || 'dsada'}</>
      <Keyboard handleInput={handleInput} />
      <Button onClick={() => console.log(data)} />
    </Container>
  );
};

export default Index;

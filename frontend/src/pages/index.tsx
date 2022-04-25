import { useState, useEffect } from "react";
import { Container, Heading, useDisclosure } from "@chakra-ui/react";
import useEventListener from "@use-it/event-listener";

import LetterGrid from "../components/LetterGrid";
import Keyboard from "../components/Keyboard";
import Alert from "../components/Alert";
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
  const [keyColors, setKeyColors] = useState({
    Q: stColor,
    W: stColor,
    E: stColor,
    R: stColor,
    T: stColor,
    Y: stColor,
    U: stColor,
    I: stColor,
    O: stColor,
    P: stColor,
    A: stColor,
    S: stColor,
    D: stColor,
    F: stColor,
    G: stColor,
    H: stColor,
    J: stColor,
    K: stColor,
    L: stColor,
    Z: stColor,
    X: stColor,
    C: stColor,
    V: stColor,
    B: stColor,
    N: stColor,
    M: stColor,
    EnterAndBack: stColor,
  });
  const [rowInd, setRowInd] = useState(0);
  const [wordInd, setWordInd] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [guess, { data }] = useGuessMutation();

  let newAr = [...ar];
  let curRow = newAr[rowInd];

  let joinedArray = [...ar[0], ...ar[1], ...ar[2], ...ar[3], ...ar[4]];

  useEffect(() => {
    let copy = keyColors;
    if (data) {
      //console.log(data.word.word)
      let newRow = curRow.map((l, i) => {
        // if already green, do not change
        console.log(l.color);
        console.log(copy[l.letter]);
        if (copy[l.letter] !== "green") {
          copy[l.letter] = data.word.word[i].color;
          console.log("not green");
        }
        return { letter: l.letter, color: data.word.word[i].color };
      });
      setKeyColors(copy);
      newAr[rowInd] = newRow;
      setAr([...newAr]);
      if (newRow.every((l) => l.color === "green")) {
        setGameOn(false);
        onOpen();
      }
      let newInd = rowInd + 1;
      setRowInd(newInd);
      setWordInd(0);
    }
  }, [data]);

  useEventListener("keydown", (e) => {
    return handleInput(e.key);
  });

  async function handleInput(keyPress) {
    if (gameOn) {
      const allowedC = /^[a-z]+$/;
      let letter = curRow[wordInd];

      if (keyPress === "Enter" && wordInd === 4) {
        let guessInput = curRow.map((l) => l.letter).join("");
        guess({ variables: { guess: guessInput } });
      } else if (keyPress === "Backspace") {
        if (wordInd !== 0) {
          letter = curRow[wordInd - 1];
        }
        letter.letter = "";
        letter.color = stColor;
        setAr([...newAr]);
        if (wordInd !== 0) {
          setWordInd((wordInd) => wordInd - 1);
        }
      } else if (letter.letter == "" && allowedC.test(keyPress.toLowerCase())) {
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
      <Alert isOpen={isOpen} onClose={onClose} />
      <Heading size="xl">Wordle Clone</Heading>
      <LetterGrid array={ar} />
      <Keyboard
        handleInput={handleInput}
        joinedArray={joinedArray}
        colors={keyColors}
      />
    </Container>
  );
};

export default Index;

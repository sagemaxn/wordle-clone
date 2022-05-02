import { useState, useEffect } from "react";
import { Container, Heading, useDisclosure } from "@chakra-ui/react";
import useEventListener from "@use-it/event-listener";
import { gql } from "@apollo/client";

import client from "../lib/client";
import LetterGrid from "../components/LetterGrid";
import Keyboard from "../components/Keyboard";
import Alert from "../components/Alert";
import {
  useGuessMutation,
  useInDictionaryLazyQuery,
  AnswerDocument,
} from "../generated/graphql";

const stColor = "lightgrey";

const Index = ({ answer }) => {
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
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

  const [isWord, { data: isWordData }] = useInDictionaryLazyQuery();

  let newAr = [...ar];
  let curRow = newAr[rowInd];

  let joinedArray = [
    ...ar[0],
    ...ar[1],
    ...ar[2],
    ...ar[3],
    ...ar[4],
    ...ar[5],
  ];

  useEffect(() => {
    let copy = keyColors;
    if (data) {
      let newRow = curRow.map((l, i) => {
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
        setWon(true);
        onOpen();
      }
      let newInd = rowInd + 1;
      setRowInd(newInd);
      if (rowInd === 5) {
        console.log("lost");
        setLost(true);
        onOpen();
      }
      setWordInd(0);
    }
  }, [data]);

  useEventListener("keydown", (e) => {
    return handleInput(e.key);
  });

  async function handleInput(keyPress) {
    let guessInput = curRow
      .map((l) => l.letter)
      .join("")
      .toLowerCase();
    if (!lost || !won) {
      const allowedC = /^[a-z]+$/;
      let letter = curRow[wordInd];
      console.log(wordInd, curRow, letter);

      if (keyPress === "Enter" && wordInd === 4) {
        // const a = await *query* 
        //if(a.data...)
        isWord({ variables: { guess: guessInput } }).then(
          (data) => {
            if (!data.data.inDictionary) {
              console.log("not a word in our list!");
            } else guess({ variables: { guess: guessInput } });
          },
          (error) => {
            console.error(error);
          }
        );
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
      <Alert
        isOpen={isOpen}
        onClose={onClose}
        won={won}
        lost={lost}
        correctAnswer={answer.answer}
      />
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

export async function getServerSideProps() {
  const { data } = await client.query({
    query: AnswerDocument,
  });

  return {
    props: {
      answer: data,
    },
  };
}

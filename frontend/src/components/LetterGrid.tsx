import React, { useState, useEffect } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import Keyboard from "./Keyboard"

const Square = ({letter}) => <Box width="20px" background="grey" margin="3px">{letter}</Box>;

const LetterGrid = () => {
  const [ar, setAr] = useState([[{letter: ''},{letter: ''},{letter: ''},{letter: ''},{letter: ''}],[{letter: ''},{letter: ''},{letter: ''},{letter: ''},{letter: ''}]]);
  const [rowInd, setRowInd] = useState(0)
  const [wordInd, setWordInd] = useState(0) 

  useEffect(() => {
    console.log(ar);
  }, [ar]);
  useEffect(() => {
    console.log(wordInd)
  }, [wordInd])
  useEffect(() => {
    document.body.addEventListener("keydown", (e) => {
  //      console.log(e)
        if (e.key === "Enter" && rowInd <= 5) {
               let newInd = rowInd + 1
               setRowInd(newInd)
        }
      else if (e.key === "Backspace") {
        pop();
      } else{
        push(e.key, rowInd, wordInd);
      }
    });
    return () => {
      document.body.removeEventListener("keydown", (e) => {
       console.log(3);
      });
    };
  }, []);

  function push(keyPress, rowI, wordI) {
    let newAr = [...ar];
    let row = newAr[rowI]
    let letter = row[wordI]
    letter.letter = keyPress

    setAr([...newAr]);
    console.log(wordI < 4)
    if(wordI < 4){
      setWordInd(wordInd + 1)
   //   console.log(wordI)
    }
    
  }
  function pop() {
    let newAr = [...ar];
    newAr.pop();
    setAr(newAr);
    //   console.log(ar)
  }

  // function gen() {
  // return ar.map((row) => <Flex>{row.map(v => <Square letter={v}/>)}</Flex>)
  // }

  return (
    <>
      <Button onClick={() => push('a', rowInd, wordInd)}>ddd</Button>
      <Button onClick={() => setRowInd(rowInd => rowInd + 1)}></Button>
      <Keyboard push={push}/>
    </>
  );
};

export default LetterGrid;

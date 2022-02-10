import React, { useState, useEffect } from "react";
import { Box, Button } from "@chakra-ui/react";

const Square = ({letter}) => <Box width="20px">{letter}</Box>;

const LetterGrid = () => {
  const [ar, setAr] = useState([['','','','',''], ['','','','','']]);
  const [ind, setInd] = useState(0)

  useEffect(() => {
    console.log(ar);
  }, [ar]);
  useEffect(() => {
      console.log(ind)
      console.log(ind <=5)
  }, [ind])
  useEffect(() => {
    document.body.addEventListener("keydown", (e) => {
  //      console.log(e)
        if (e.key === "Enter" && ind <= 5) {
               let newInd = ind + 1
               setInd(newInd)
               console.log(ind <= 5)
        }
      else if (e.key === "Backspace") {
        pop();
      } else{
        push(e.key, ind);
      }
    });
    return () => {
      document.body.removeEventListener("keydown", (e) => {
        console.log(3);
      });
    };
  }, []);

  function push(keyPress, rowI) {
    let newAr = [...ar];
    let row = newAr[rowI]
    row.push(keyPress);
    setAr([...newAr]);
    //  console.log(ar)
  }
  function pop() {
    let newAr = [...ar];
    newAr.pop();
    setAr(newAr);
    //   console.log(ar)
  }

  function gen() {
  return ar.map((row) => <div>{row.map(v => <Square letter={v}/>)}</div>)
    return ar;
  }

  return (
    <>
      {gen()}
    </>
  );
};

export default LetterGrid;

import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import Square from './Square'

const LetterGrid = ({array}) => {

  function gen() {
    return array.map((row, flexInd) => <Flex key={flexInd}>{row.map((v, i) => <Square letter={v.letter} color={v.color} key={i}/>)}</Flex>)
    }

  return (
    <>
      {gen()}
    </>
  );
};

export default LetterGrid;

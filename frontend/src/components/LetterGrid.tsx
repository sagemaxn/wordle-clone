import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import Square from './Square'

const LetterGrid = ({array}) => {

  function gen() {
    return array.map((row) => <Flex>{row.map(v => <Square letter={v.letter} color={v.color}/>)}</Flex>)
    }

  return (
    <>
      {gen()}
    </>
  );
};

export default LetterGrid;

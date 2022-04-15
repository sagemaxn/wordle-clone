import { Flex } from "@chakra-ui/react";
import Square from './Square'

const LetterGrid = ({array}) => {
  console.log(array)
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

import React from "react";
import { Box, Flex } from "@chakra-ui/react";

const Keyboard = ({ handleInput }) => {
  const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const row3 = ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"];

  const rows = [row1, row2, row3];

  const Key = ({ letter, children }) => (
    <Box
      background="lightgrey"
      margin="5px"
      w="40px"
      h="45px"
      onClick={() => handleInput(letter)}
    >
      {children}
    </Box>
  );

  const genKeyboard = () =>
    rows.map((row) => (
      <Flex>
        {row.map((letter) => {
          return <Key letter={letter}>{letter}</Key>;
        })}
      </Flex>
    ));
  return <>{genKeyboard()}</>;
};

export default Keyboard;

import { useState, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

import Key from "../components/Key";

const Keyboard = ({ handleInput, joinedArray, colors }) => {
  const [rows, setRows] = useState([
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", <ArrowBackIcon />],
  ]);

  const genKeyboard = () =>
    rows.map((row, flexInd) => (
      <Flex key={flexInd}>
        {row.map((key, i) => {
          return (
            <Key
              letter={key}
              array={joinedArray}
              handleInput={handleInput}
              color={colors}
              key={i}
            >
              {key}
            </Key>
          );
        })}
      </Flex>
    ));
  return <Box w={["100%"]}>{genKeyboard()}</Box>;
};

export default Keyboard;

import { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
const Key = ({ letter, children, array, handleInput, color }) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      background={color[letter] ? color[letter] : color["EnterAndBack"]}
      margin="5px"
      w={color[letter] ? "40px" : "65px"}
      h="45px"
      onClick={() => {
        handleInput(letter);
      }}
    >
      {children}
    </Flex>
  );
};

export default Key;

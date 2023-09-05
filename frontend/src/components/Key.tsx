import { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
const Key = ({ letter, children, array, handleInput, color }) => {
    return (
        <Flex
            alignItems="center"
            background={color[letter] ? color[letter] : color.EnterAndBack}
            h="45px"
            justifyContent="center"
            margin="5px"
            onClick={() => {
                handleInput(letter);
            }}
            w={color[letter] ? '40px' : '65px'}
        >
            {children}
        </Flex>
    );
};

export default Key;

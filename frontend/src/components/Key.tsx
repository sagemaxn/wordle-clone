import { Flex } from '@chakra-ui/react';

const Key = ({ letter, handleInput, color }) => {
    return (
        <Flex
            alignItems="center"
            background={color[letter] ? color[letter] : color.EnterAndBack}
            borderRadius={'md'}
            data-testid={`key-${letter}`}
            fontWeight={'bold'}
            h={['55px']}
            justifyContent="center"
            margin="3px"
            onClick={() => {
                handleInput(letter);
            }}
            w={color[letter] ? ['36px', '44px'] : ['59px', '72px']}
        >
            {letter}
        </Flex>
    );
};

export default Key;

import { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

import Key from '../components/Key';

const Keyboard = ({ handleInput, colors }) => {
    const [rows] = useState([
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', <ArrowBackIcon key={1} />],
    ]);

    const genKeyboard = () => (
        <Box w={['100%']}>
            {rows.map((row, flexInd) => (
                <Flex justifyContent="center" key={flexInd}>
                    {row.map((key, i) => (
                        <Key
                            color={colors}
                            handleInput={handleInput}
                            key={i}
                            letter={key}
                        ></Key>
                    ))}
                </Flex>
            ))}
        </Box>
    );

    return <Box w={['100%']}>{genKeyboard()}</Box>;
};

export default Keyboard;

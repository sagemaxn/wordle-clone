import React from 'react';
import { Box } from '@chakra-ui/react';

const Square = ({ color, letter }) => {
    return (
        <Box
            alignItems="center"
            background={color}
            display="flex"
            fontSize="35px"
            height="50px"
            justifyContent="center"
            margin="3px"
            width={['50px']}
        >
            {letter || ' '}
        </Box>
    );
};

export default Square;

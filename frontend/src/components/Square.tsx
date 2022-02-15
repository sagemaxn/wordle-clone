import React from 'react'
import {Box} from '@chakra-ui/react'

const Square = ({letter}) => {
    return (
        <Box width="30px" background="grey" padding="30px" margin="3px">{letter}</Box>
    )
}

export default Square

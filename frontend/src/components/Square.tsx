import React from 'react'
import {Box} from '@chakra-ui/react'

const Square = ({letter}) => {
    return (
        <Box width="20px" background="grey" margin="3px">{letter}</Box>
    )
}

export default Square

import React from 'react'
import {Box} from '@chakra-ui/react'

const Square = ({letter}) => {
    return (
        <Box width="30px" height="30px" background="grey" margin="3px" alignItems="center" justifyContent="center" display="flex">{letter || ' '}</Box>
    )
}

export default Square

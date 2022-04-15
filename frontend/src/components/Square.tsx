import React from 'react'
import {Box} from '@chakra-ui/react'

const Square = ({letter, color}) => {
    console.log(letter)
    return (
        <Box width="30px" height="30px" backgroundColor={color} margin="3px" alignItems="center" justifyContent="center" display="flex">{letter || ' '}</Box>
    )
}

export default Square

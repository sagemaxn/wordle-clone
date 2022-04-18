import React from 'react'
import {Box} from '@chakra-ui/react'

const Square = ({color, letter}) => {

    return (
        <Box width="55px" height="60px" background={color} margin="3px" alignItems="center" justifyContent="center" display="flex" fontSize="35px">{letter || ' '}</Box>
    )
}

export default Square

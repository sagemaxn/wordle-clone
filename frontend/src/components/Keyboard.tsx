import React from 'react'
import { Box, Center, Square } from '@chakra-ui/react'

const whichFunction = () => {}

const Key = ({letter, push, children}) => <Box as="span" background="lightgrey" margin="5px" w="50px" h="60px" onClick={() => {if(letter === 'Backspace'){
    console.log('back')
}
else if(letter === 'Enter'){
    console.log('enter')
}
else push()}


}>{children}</Box>

const Keyboard = ({push}) => {
    const row1 = ['Q','W','E','R','T','Y','U','I','O','P']
    const row2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
    const row3 = ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace']

    const rows = [row1, row2, row3]

const genKeyboard = () => rows.map(row => <Box>{row.map(letter =>{ console.log(letter)
    return <Key letter={letter} push={push}>{letter}</Key>})}</Box>)
    return (
        <Box>
            {genKeyboard()}
        </Box>
    )
}

export default Keyboard

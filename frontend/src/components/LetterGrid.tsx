import React, { useState } from 'react'
import {Box, Button} from '@chakra-ui/react'


const Square = (a) => <Box>{a}</Box>


const LetterGrid = () => {
    const [ar, setAr] = useState(['s','a','d'])

    function push(){
        let newAr = [...ar]
        if (newAr.length >=5){
            return
        }
        newAr.push('s')
        setAr(newAr)
        console.log(ar)
    }
    function pop(){
        let newAr = [...ar]
        newAr.pop()
        setAr(newAr)
        console.log(ar)
    }

    function gen(){
       // return ar.map((a) => Square(a))
       return ar
    }
    
    return (
    <>{ar}
    <Button onClick={() => pop()}>pop</Button>
    <Button onClick={() => push()}>push</Button>

    </>
    
    )
}

export default LetterGrid

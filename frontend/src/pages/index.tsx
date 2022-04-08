import {useState, useEffect} from 'react'
import LetterGrid from '../components/LetterGrid'
import Keyboard from '../components/Keyboard'
import { GuessDocument, useGuessMutation } from "../generated/graphql";

import useEventListener from "@use-it/event-listener";
import { useQuery } from '@apollo/client';

const Index = () => {
  const [ar, setAr] = useState([[{letter: '', color: ''},{letter: '', color: ''},{letter: '', color: ''},{letter: '', color: ''},{letter: '', color: ''}],[{letter: ''},{letter: ''},{letter: ''},{letter: ''},{letter: ''}],[{letter: ''},{letter: ''},{letter: ''},{letter: ''},{letter: ''}],[{letter: ''},{letter: ''},{letter: ''},{letter: ''},{letter: ''}],[{letter: ''},{letter: ''},{letter: ''},{letter: ''},{letter: ''}]]);
  const [rowInd, setRowInd] = useState(0)
  const [wordInd, setWordInd] = useState(0) 
  const [guess, {data}] = useGuessMutation()

  useEventListener('keydown', (e) => {
    return handleInput(e.key)
  })

  function handleInput(keyPress) {
    let newAr = [...ar];
    let row = newAr[rowInd]
    let letter = row[wordInd]
    let guessInput = row.map(l => l.letter).join('')

    if(keyPress === "Enter" && wordInd === 4){
      console.log(guessInput)
      guess({variables:{guess: guessInput}})
      let newInd = rowInd + 1
      setRowInd(newInd)
      setWordInd(0)
    }
    else if (keyPress === "Backspace") {
      console.log(letter.letter)
      letter.letter = ''
      setAr([...newAr])
      if(wordInd !== 0){
      setWordInd(wordInd => wordInd - 1)
    }
    console.log(letter.letter)
    }
    else if(letter.letter == ''){
      console.log(letter.letter)
   
      letter.letter = keyPress.toUpperCase()
      setAr([...newAr]);
        if(wordInd <4){
          setWordInd(wordInd + 1)
        }
        console.log(letter.letter)
      }
    }

return (<>
  <LetterGrid array={ar} />
  <Keyboard handleInput={handleInput}/>
  </>
  )
    
}

export default Index

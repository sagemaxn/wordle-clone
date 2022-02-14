import {useState, useEffect} from 'react'
import LetterGrid from '../components/LetterGrid'
import Keyboard from '../components/Keyboard'

const Index = () => {
  const [ar, setAr] = useState([[{letter: ''},{letter: ''},{letter: ''},{letter: ''},{letter: ''}],[{letter: ''},{letter: ''},{letter: ''},{letter: ''},{letter: ''}],[{letter: ''},{letter: ''},{letter: ''},{letter: ''},{letter: ''}],[{letter: ''},{letter: ''},{letter: ''},{letter: ''},{letter: ''}],[{letter: ''},{letter: ''},{letter: ''},{letter: ''},{letter: ''}]]);
  const [rowInd, setRowInd] = useState(0)
  const [wordInd, setWordInd] = useState(0) 

  function handleInput(keyPress) {
    let newAr = [...ar];
    let row = newAr[rowInd]
    let letter = row[wordInd]

    if(keyPress === "Enter" && wordInd === 4){
      let newInd = rowInd + 1
      setRowInd(newInd)
      setWordInd(0)
    }
    else if (keyPress === "Backspace") {
      letter.letter = ''
      setAr([...newAr])
      if(wordInd !== 0){
      setWordInd(wordInd => wordInd - 1)
    }
    }
    else{
      letter.letter = keyPress
      setAr([...newAr]);
      console.log(wordInd < 4)
        if(wordInd < 4){
          setWordInd(wordInd + 1)
        }
    }
    
  }

  useEffect(() => {
   // console.log(ar);
  }, [ar]);
  useEffect(() => {
    document.body.addEventListener("keydown", (e) => {
      handleInput(e.key)

    });
    return () => {
      document.body.removeEventListener("keydown", (e) => {
        handleInput(e.key)
      });
    };
  }, []);

return (<>
  <LetterGrid array={ar}/>
  <Keyboard handleInput={handleInput}/>
  </>
  )
    
}

export default Index

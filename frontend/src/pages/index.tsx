import { useEffect, useRef, useState } from 'react';
import {
    Flex,
    Heading,
    Icon,
    Link,
    Spinner,
    Text,
    Tooltip,
    useDisclosure,
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import client from '../lib/client';
import LetterGrid from '../components/LetterGrid';
import Keyboard from '../components/Keyboard';
import Alert from '../components/Alert';
import NotAWord from '../components/NotAWord';
import { AnswerDocument, useInDictionaryLazyQuery } from '../generated/graphql';
import {
    clearState,
    getCurrentDateInEST,
    keyPressAction,
    loadState,
    saveState,
    setColors,
} from '../lib/gameLogic';

const stColor = 'lightgrey';

const Index = ({ answer }) => {
    const [won, setWon] = useState(false);
    const [lost, setLost] = useState(false);
    const [ar, setAr] = useState([
        [
            { letter: '', color: stColor },
            { letter: '', color: stColor },
            { letter: '', color: stColor },
            { letter: '', color: stColor },
            { letter: '', color: stColor },
        ],
        [
            { letter: '', color: stColor },
            { letter: '', color: stColor },
            { letter: '', color: stColor },
            { letter: '', color: stColor },
            { letter: '', color: stColor },
        ],
        [
            { letter: '', color: stColor },
            { letter: '', color: stColor },
            { letter: '', color: stColor },
            { letter: '', color: stColor },
            { letter: '', color: stColor },
        ],
        [
            { letter: '', color: stColor },
            { letter: '', color: stColor },
            { letter: '', color: stColor },
            { letter: '', color: stColor },
            { letter: '', color: stColor },
        ],
        [
            { letter: '', color: stColor },
            { letter: '', color: stColor },
            { letter: '', color: stColor },
            { letter: '', color: stColor },
            { letter: '', color: stColor },
        ],
        [
            { letter: '', color: stColor },
            { letter: '', color: stColor },
            { letter: '', color: stColor },
            { letter: '', color: stColor },
            { letter: '', color: stColor },
        ],
    ]);
    const [keyColors, setKeyColors] = useState({
        Q: stColor,
        W: stColor,
        E: stColor,
        R: stColor,
        T: stColor,
        Y: stColor,
        U: stColor,
        I: stColor,
        O: stColor,
        P: stColor,
        A: stColor,
        S: stColor,
        D: stColor,
        F: stColor,
        G: stColor,
        H: stColor,
        J: stColor,
        K: stColor,
        L: stColor,
        Z: stColor,
        X: stColor,
        C: stColor,
        V: stColor,
        B: stColor,
        N: stColor,
        M: stColor,
        EnterAndBack: stColor,
    });
    const [rowInd, setRowInd] = useState(0);
    const [wordInd, setWordInd] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isWord] = useInDictionaryLazyQuery();
    const [isLoading, setIsLoading] = useState(true);

    const newAr = [...ar];
    const curRow = newAr[rowInd];
    const [isNotAWordVisible, setIsNotAWordVisible] = useState(false);

    useEffect(() => {
        if (isNotAWordVisible) {
            const timer = setTimeout(() => {
                setIsNotAWordVisible(false);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [isNotAWordVisible]);

    useEffect(() => {
        if (lost || won) {
            onOpen();
        }
    }, [lost, won]);

    useEffect(() => {
        function handleKeyDown(event) {
            if (
                event.key.match(/^[a-z]$/) ||
                ['Enter', 'Backspace'].includes(event.key)
            ) {
                handleInputRef.current(event.key);
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    useEffect(() => {
        const savedDate = loadState('date');
        const currentDate = getCurrentDateInEST();

        if (savedDate !== currentDate) {
            // If saved date doesn't match the current date, clear all saved states
            clearState('ar');
            clearState('keyColors');
            clearState('rowInd');
            clearState('won');
            clearState('lost');

            // Save the current date to local storage
            saveState('date', currentDate);
        } else {
            const savedAr = loadState('ar');
            if (savedAr) {
                console.log('Loaded ar:', savedAr);
                setAr(savedAr);
            }

            const savedKeyColors = loadState('keyColors');
            if (savedKeyColors) {
                console.log('Loaded keyColors:', savedKeyColors);
                setKeyColors(savedKeyColors);
            }

            const savedRowInd = loadState('rowInd');
            if (typeof savedRowInd === 'number') {
                console.log('Loaded rowInd:', savedRowInd);
                setRowInd(savedRowInd);
            }

            const savedWon = loadState('won');
            if (savedWon !== null) {
                console.log('Loaded won:', savedWon);
                setWon(savedWon);
            }

            const savedLost = loadState('lost');
            if (savedLost !== null) {
                console.log('Loaded lost:', savedLost);
                setLost(savedLost);
            }
        }

        setIsLoading(false);
    }, []);

    useEffect(() => {
        console.log('Saving ar:', ar);
        saveState('ar', ar);

        console.log('Saving keyColors:', keyColors);
        saveState('keyColors', keyColors);

        console.log('Saving rowInd:', rowInd);
        saveState('rowInd', rowInd);

        console.log('Saving won:', won);
        saveState('won', won);

        console.log('Saving lost:', lost);
        saveState('lost', lost);
    }, [keyColors, rowInd, won, lost]);

    const handleGuess = guessLetters => {
        const answerLetters = answer.answer.split('');
        const colors = setColors(guessLetters, answerLetters);

        const copy = keyColors;
        const newRow = curRow.map((l, i) => {
            if (copy[l.letter] !== 'green') {
                copy[l.letter] = colors[i];
            }
            return { letter: l.letter, color: colors[i] };
        });
        setKeyColors(copy);

        const updatedAr = [...ar];
        updatedAr[rowInd] = newRow;
        setAr(updatedAr);

        if (newRow.every(l => l.color === 'green')) {
            setWon(true);
        } else if (rowInd === 5) {
            console.log('lost');
            setLost(true);
        }
        const newInd = rowInd + 1;
        setRowInd(newInd);
        setWordInd(0);
    };

    const handleInput = async keyPress => {
        if (isLoading) {
            return;
        }
        if (!lost && !won) {
            const action = keyPressAction(keyPress, wordInd, curRow);
            const updatedArForDelete = [...ar];

            const updatedArForAdd = [...ar];

            switch (action.type) {
                case 'CHECK_WORD':
                    isWord({ variables: { guess: action.guess } })
                        .then(data => {
                            if (!data.data.inDictionary) {
                                console.log('not a word in our list!');
                                setIsNotAWordVisible(true);
                            } else {
                                handleGuess(action.guess.split(''));
                            }
                        })
                        .catch(error => {
                            console.error(error);
                        });
                    break;

                case 'DELETE_LETTER':
                    curRow[action.index].letter = '';
                    curRow[action.index].color = stColor;
                    updatedArForDelete[rowInd] = curRow;
                    setAr(updatedArForDelete);
                    setWordInd(action.index);
                    break;

                case 'ADD_LETTER':
                    curRow[action.index].letter = action.letter;
                    updatedArForAdd[rowInd] = curRow;
                    setAr(updatedArForAdd);
                    setWordInd(action.index + 1);
                    break;

                case 'NO_ACTION':
                default:
                    // Do nothing
                    break;
            }
        }
    };

    const handleInputRef = useRef(handleInput);
    handleInputRef.current = handleInput;

    return (
        <Flex alignItems="center" flexDirection="column" minHeight="100vh">
            {isLoading ? (
                <Spinner
                    color="blue.500"
                    emptyColor="gray.200"
                    size="xl"
                    speed="0.65s"
                    thickness="4px"
                />
            ) : (
                <>
                    <Alert
                        correctAnswer={answer.answer}
                        isOpen={isOpen}
                        lost={lost}
                        onClose={onClose}
                        won={won}
                    />
                    <NotAWord
                        displayStyle={isNotAWordVisible ? 'block' : 'none'}
                    />
                    <Heading fontFamily={'Pacifiso'} size="xl">
                        A Wordle Clone
                    </Heading>
                    <Text marginBottom={5}>
                        A simple (not 1 to 1) copy of the popular{' '}
                        <b>
                            <Link
                                href={
                                    'https://www.nytimes.com/games/wordle/index.html'
                                }
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Wordle
                            </Link>
                        </b>
                        .{' '}
                        <Tooltip
                            aria-label="A tooltip"
                            label="Every day at midnight EST a new word is randomly selected from a list of almost 8000 of the most common english 5 letter words. This can result in answers that are more challenging and far less commonly used than the real Wordle."
                        >
                            <Icon
                                as={InfoOutlineIcon}
                                cursor="pointer"
                                h={4}
                                w={4}
                            />
                        </Tooltip>
                    </Text>
                    <LetterGrid array={ar} />
                    <Keyboard colors={keyColors} handleInput={handleInput} />
                </>
            )}
        </Flex>
    );
};

export default Index;

export async function getServerSideProps() {
    const { data } = await client.query({
        query: AnswerDocument,
        fetchPolicy: 'no-cache',
    });
    console.log(`props answer: ${JSON.stringify(data)}`);
    return {
        props: {
            answer: data,
        },
    };
}

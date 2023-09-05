import { useEffect, useRef, useState } from 'react';
import {
    Container,
    Heading,
    Icon,
    Link,
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

const stColor = 'lightgrey';
import {
    keyPressAction,
    loadState,
    saveState,
    setColors,
} from '../lib/gameLogic';

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

    const newAr = [...ar];
    const curRow = newAr[rowInd];

    const joinedArray = [
        ...ar[0],
        ...ar[1],
        ...ar[2],
        ...ar[3],
        ...ar[4],
        ...ar[5],
    ];

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
        const savedAr = loadState('ar');
        const savedKeyColors = loadState('keyColors');
        const savedRowInd = loadState('rowInd');

        if (savedAr) {
            setAr(savedAr);
        }
        if (savedKeyColors) {
            setKeyColors(savedKeyColors);
        }
        if (typeof savedRowInd === 'number') {
            setRowInd(savedRowInd);
        }
    }, []);

    useEffect(() => {
        saveState('ar', ar);
        saveState('keyColors', keyColors);
        saveState('rowInd', rowInd);
        saveState('wordInd', wordInd);
    }, [ar, keyColors, rowInd, wordInd]);

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
        <Container centerContent={true}>
            <Alert
                correctAnswer={answer.answer}
                isOpen={isOpen}
                lost={lost}
                onClose={onClose}
                won={won}
            />
            <NotAWord displayStyle={isNotAWordVisible ? 'block' : 'none'} />

            <Heading size="xl">A Wordle Clone</Heading>
            <Text>
                A simple (not 1 to 1) copy of the popular{' '}
                <b>
                    <Link
                        href={'https://www.nytimes.com/games/wordle/index.html'}
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
                    <Icon as={InfoOutlineIcon} cursor="pointer" h={5} w={5} />
                </Tooltip>
            </Text>
            <LetterGrid array={ar} />
            <Keyboard
                colors={keyColors}
                handleInput={handleInput}
                joinedArray={joinedArray}
            />
        </Container>
    );
};

export default Index;

export async function getServerSideProps() {
    const { data } = await client.query({
        query: AnswerDocument,
        fetchPolicy: 'no-cache',
    });

    return {
        props: {
            answer: data,
        },
    };
}

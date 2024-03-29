export function setColors(guessLetters, answerLetters) {
    const dupe = [...answerLetters];

    let colors = guessLetters.map((l, index) => {
        if (answerLetters[index] === guessLetters[index]) {
            dupe.splice(dupe.indexOf(l), 1);
            return 'green';
        }
        return 'darkgrey';
    });

    colors = colors.map((color, index) => {
        if (dupe.includes(guessLetters[index]) && color !== 'green') {
            dupe.splice(dupe.indexOf(guessLetters[index]), 1);
            return 'yellow';
        }
        return color;
    });

    return colors;
}
export function keyPressAction(keyPress, wordInd, curRow) {
    const allowedC = /^[a-z]+$/;
    const letter = curRow[wordInd];

    if (keyPress === 'ENTER' || keyPress === 'Enter') {
        if (wordInd === 5) {
            return {
                type: 'CHECK_WORD',
                guess: curRow.map(l => l.letter.toLowerCase()).join(''),
            };
        }
    } else if (keyPress.$$typeof || keyPress === 'Backspace') {
        if (wordInd !== 0) {
            return { type: 'DELETE_LETTER', index: wordInd - 1 };
        }
    } else if (
        wordInd !== 5 &&
        letter.letter === '' &&
        allowedC.test(keyPress.toLowerCase())
    ) {
        return {
            type: 'ADD_LETTER',
            letter: keyPress.toUpperCase(),
            index: wordInd,
        };
    }

    return { type: 'NO_ACTION' };
}

import moment from 'moment-timezone';

export const getCurrentDateInEST = () => {
    const dateInNY = moment().tz('America/New_York');
    return dateInNY.format('YYYY-MM-DD');
};

export function saveState(key: string, state: any): void {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(key, serializedState);
    } catch (err) {
        console.error(`Error saving state for key: ${key}`, err);
    }
}

export function loadState(key: string): any {
    try {
        const serializedState = localStorage.getItem(key);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error(`Error loading state for key: ${key}`, err);
        return undefined;
    }
}

export const clearState = key => {
    try {
        localStorage.removeItem(key);
        localStorage.removeItem('date');
    } catch (e) {
        console.error('Could not clear state', e);
    }
};

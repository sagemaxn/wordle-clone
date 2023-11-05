import * as path from 'path';
import * as fs from 'fs';

const dirPath = path.join(__dirname);

export function selectNewWord() {
    fs.readFile(`${dirPath}/../wordList.txt`, 'utf8', (err, wordList) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        const words = wordList.split('\n');
        const index = Math.floor(Math.random() * words.length);
        const correctAnswer = words[index].replace(/(\r\n|\n|\r)/gm, '');

        const dataToWrite = {
            correctAnswer: correctAnswer,
        };

        fs.writeFile(
            `${dirPath}/currentWord.json`,
            JSON.stringify(dataToWrite),
            function (err) {
                if (err) {
                    throw err;
                }
                console.log(`The new word is ${correctAnswer}`);
            },
        );
    });
}

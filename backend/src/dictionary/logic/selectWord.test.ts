import * as fs from 'fs';
import { selectNewWord } from './selectWord';

jest.mock('fs');

describe('selectNewWord', () => {
    it('should select a new word and write to currentWord.ts', () => {
        const mockWords = 'apple\ntwist\nnoise';
        const writeFileMock = jest.fn();

        (fs.readFile as unknown as jest.Mock).mockImplementation(
            (path, encoding, callback) => {
                callback(null, mockWords);
            },
        );

        (fs.writeFile as unknown as jest.Mock).mockImplementation(
            (path, data, callback) => {
                writeFileMock();
                callback(null);
            },
        );

        selectNewWord();

        expect(writeFileMock).toHaveBeenCalled();
    });

    it('should handle errors when reading the file', () => {
        (fs.readFile as unknown as jest.Mock).mockImplementation(
            (path, encoding, callback) => {
                callback(new Error('Read error'), null);
            },
        );
        const errorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        selectNewWord();

        expect(errorSpy).toHaveBeenCalledWith(
            'Error reading the file:',
            expect.any(Error),
        );

        errorSpy.mockRestore();
    });
});

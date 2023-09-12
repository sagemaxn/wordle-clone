import { Flex } from '@chakra-ui/react';
import Square from './Square';

const LetterGrid = ({ array }) => {
    function gen() {
        return array.map((row, flexInd) => (
            <Flex key={flexInd}>
                {row.map((v, i) => (
                    <Square color={v.color} key={i} letter={v.letter} />
                ))}
            </Flex>
        ));
    }

    return <>{gen()}</>;
};

export default LetterGrid;

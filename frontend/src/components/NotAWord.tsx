import { Box } from '@chakra-ui/react';

const NotAWord = ({ displayStyle }) => {
    return (
        <Box
            backgroundColor="rgba(255,255,255)"
            borderRadius="5px"
            boxShadow="0px 4px 10px rgba(0,0,0,0.2)"
            display={displayStyle}
            left="50%"
            padding="10px"
            position="fixed"
            top="20px"
            transform="translateX(-50%)"
            zIndex="1000"
        >
            <Box>Not a word in our list</Box>
        </Box>
    );
};

export default NotAWord;

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from '@chakra-ui/react';
import { useRef } from 'react';

export default function Alert({ isOpen, onClose, won, lost, correctAnswer }) {
    const cancelRef = useRef();

    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            {won && 'You won!'}
                            {lost && `You lost. The word was ${correctAnswer}`}
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                            <Button onClick={onClose} ref={cancelRef}>
                                Close
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}

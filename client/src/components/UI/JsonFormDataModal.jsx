import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Textarea
} from '@chakra-ui/react';

import FormDataJsonText from './FormDataJsonText';

 const JsonDisplayModal = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <>
      <Button onClick={onOpen}>JSON Preview</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>JSON FormData:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Textarea value={JSON.stringify(jsonFormData, null, 2)} readOnly height="300px" /> */}
            <FormDataJsonText />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};


export default JsonDisplayModal;
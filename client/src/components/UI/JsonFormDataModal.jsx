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
  Textarea,
  Text,
} from '@chakra-ui/react';


import { useMaterialStore } from '../../store/store';

const FormDataJson = () => {

const { formData } = useMaterialStore();

  // Convert jsonFormData to formatted JSON string
  const formattedData = JSON.stringify(formData, null, 2);

  return (
    <Text whiteSpace="pre-wrap">
      {formattedData}
    </Text>
  );
};

 export default function JsonDisplayModal () {

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
            <FormDataJson />
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

import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
    Button,
    Input,
    FormControl,
    FormLabel,
    FormHelperText,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    useToast,
    Textarea,
    Center,
    HStack,
    Image,
    VStack,
    Checkbox,
    Text,
    Select,
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useCourseCategoryContext } from '../context/courseCategory_context';

function UpdateCourseCategoryModal({ id }) {

    const {
        single_courseCategory: {
            name = '',
            status = '',
            image = ''
        },
        single_courseCategory_loading: singlecoursecategoryloading,
        fetchCourseCategoryById,
        updateExistingCourseCategoryDetail,
        fetchCourseCategoryForTable
    } = useCourseCategoryContext();
    const [imageList, setImageList] = useState(image);
    const [loading, setLoading] = useState(false);
    const onDrop = useCallback((acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => {
          setImageList(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: 'image/jpeg, image/png',
    });
  
  

    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef();
    const toast = useToast();

    const handleRemoveImage = async () => {
        setImageList(null);
      };
    
      useEffect(() => {
        setImageList(image);
      }, [singlecoursecategoryloading]);
    

    return (
        <>
            <Text
                colorScheme='brown'
                minW='100%'
                onClick={() => {
                    onOpen();
                    fetchCourseCategoryById(id);
                }}
            >
                Edit
            </Text>

            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Course Category</ModalHeader>
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input
                                ref={initialRef}
                                placeholder='Name'
                                name='name'
                                focusBorderColor='brown.500'
                                value={name}
                                onChange={updateExistingCourseCategoryDetail}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Status</FormLabel>
                            <Select
                                placeholder='select status'
                                name='status'
                                focusBorderColor='brown.500'
                                value={status}
                                onChange={updateExistingCourseCategoryDetail}
                            >
                                <option value='true'>active</option>
                                <option value='false'>inative</option>
                            </Select>
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Images</FormLabel>
                            <Center
                                bg='brown.50'
                                minHeight={100}
                                my={5}
                                borderWidth={3}
                                borderColor='brown.200'
                                borderStyle='dashed'
                                borderRadius='lg'
                                {...getRootProps()}
                            >
                                {isDragActive ? (
                                    <p>Drag your files here</p>
                                ) : (
                                    <p>
                                        Drag drop image files here, or click to select files
                                        <br />
                                        (Only *.jpeg and *.png images will be accepted)
                                    </p>
                                )}
                            </Center>
                            <Input {...getInputProps()} />
                        </FormControl>
                        <FormControl mt={4}>
                            <HStack>
                                {imageList && (
                                    <VStack>
                                        <Image
                                            src={imageList}
                                            boxSize='70px'
                                            objectFit='cover'
                                            borderRadius='lg'
                                        />
                                        <Button
                                            size='xs'
                                            variant='outline'
                                            colorScheme='red'
                                            onClick={handleRemoveImage}
                                        >
                                            Remove
                                        </Button>
                                    </VStack>
                                )}
                            </HStack>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme='brown'
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default UpdateCourseCategoryModal;
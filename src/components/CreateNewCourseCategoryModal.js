import React, { useState, useRef, useCallback } from 'react';
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
    Select,
    Radio,
    RadioGroup,
    Stack
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useCourseCategoryContext } from '../context/courseCategory_context';

function CreateNewCourseCategoryModal() {

    const {
        new_courseCategory: {
            name,
            status,
            image
        },
        updateNewCourseCategoryDetail,
        createNewCourseCategory,
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

    const initialRef = useRef();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png',
    });

    const handleSubmit = async () => {
        console.log(name);
        console.log(status);
        console.log(imageList);
        if(
            !name ||
            !status ||
            !imageList
        ) {
            return toast({
                position: 'top',
                description: 'Provide all the details',
                status: 'error',
                duration: 5000,
                isClosable: true
            });
        }
        if(imageList.length < 1) {
            return toast({
                position: 'top',
                description: 'Provide all the details',
                status: 'error',
                duration: 5000,
                isClosable: true
            });
        }
        setLoading(true);
        const courseCategory = {
            name,
            status,
            image: imageList
        };
        const responseCreate = await createNewCourseCategory(courseCategory);
        setLoading(false);
        if(responseCreate.success) {
            onClose();
            await fetchCourseCategoryForTable();
            return toast({
                position: 'top',
                description: 'Course Category Created',
                status: 'success',
                duration: 5000,
                isClosable: true
            });
        } else {
            onClose();
            return toast({
                position: 'top',
                description: responseCreate.message,
                status: 'error',
                duration: 5000,
                isClosable: true
            });
        }
    }


    return (
        <>
            <Button colorScheme="brown" onClick={onOpen}>
                Create New Course Category
            </Button>

            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create New Course Category</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input
                                ref={initialRef}
                                placeholder='name'
                                name='name'
                                focusBorderColor='brown.500'
                                value={name}
                                onChange={updateNewCourseCategoryDetail}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Status</FormLabel>
                            <RadioGroup
                                name='status'
                                onChange={(value) => updateNewCourseCategoryDetail({ target: { name: 'status', value } })}
                            >
                                <Stack spacing={4} direction='row'>
                                    <Radio value='true'>Acitve</Radio>
                                    <Radio value='false'>Inactive</Radio>
                                </Stack>

                            </RadioGroup>
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
                            {imageList && (
                                <Center>
                                    <Image src={imageList} alt="Category" maxH="200px" my={3} />
                                </Center>
                            )}

                            <Input {...getInputProps()} />
                        </FormControl>



                    </ModalBody>

                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme="brown"
                            isLoading={loading}
                            onClick={handleSubmit}
                            loadingText='Create course category'
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default CreateNewCourseCategoryModal;
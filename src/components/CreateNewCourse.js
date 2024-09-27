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
    toast,
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useCourseContext } from '../context/course_context';


function CreateNewCourse() {

    const {
        new_course: {
            title,
            description,
            instructor_name,
            price,
            category,
            langauge,
            target_audience,
            prerequisites,
            course_content_structure,
            sec_keywords,
            video
        },
        updateNewCourseDetail,
        createNewCourse
    } = useCourseContext();

    const [videoList, setVideoList] = useState(null);
    const [loading, setLoading] = useState(false);

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const reader = new FileReader();
            reader.onload = () => {
                setVideoList(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'video/mp4, video/3gp',
    });

    const initialRef = useRef();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const handleSubmit = async () => {
        console.log(title);
        console.log(description);
        console.log(instructor_name);
        console.log(price);
        console.log(category);
        console.log(langauge);
        console.log(target_audience);
        console.log(prerequisites);
        console.log(course_content_structure);
        console.log(sec_keywords);
        console.log(videoList);
        if(
            !title ||
            !description ||
            !instructor_name ||
            !price ||
            !category ||
            !langauge ||
            !target_audience ||
            !prerequisites ||
            !course_content_structure ||
            !sec_keywords ||
            !videoList
        ) {
            return toast({
                position: 'top',
                description: 'Provide all the details',
                status: 'error',
                duration: 5000,
                isClosable: true
            });
        }
        if(videoList.length < 1) {
            return toast({
                position: 'top',
                description: 'Provide all the details',
                status: 'error',
                duration: 5000,
                isClosable: true
            });
        }
        setLoading(true);
        const course = {
            title,
            description,
            instructor_name,
            price,
            category,
            language: langauge,
            target_audience,
            prerequisites,
            course_content_structure,
            sec_keywords,
            video: videoList
        };
        const responseCreate = await createNewCourse(course);
        setLoading(false);
        if(responseCreate.success) {
            onClose();
            return toast({
                position: 'top',
                description: 'Course created',
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
            <Button colorScheme='brown' onClick={onOpen}>
                Create New Course
            </Button>

            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create new course</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input
                                ref={initialRef}
                                placeholder='title'
                                name='title'
                                focusBorderColor='brown.500'
                                value={title}
                                onChange={updateNewCourseDetail}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Desciption</FormLabel>
                            <Input
                                placeholder='description'
                                name='description'
                                focusBorderColor='brown.500'
                                value={description}
                                onChange={updateNewCourseDetail}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Instructor name</FormLabel>
                            <Input
                                placeholder='instructor name'
                                name='instructor_name'
                                focusBorderColor='brown.500'
                                value={instructor_name}
                                onChange={updateNewCourseDetail}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Price</FormLabel>
                            <Input
                                placeholder='price'
                                name='price'
                                type='number'
                                focusBorderColor='brown.500'
                                value={price}
                                onChange={updateNewCourseDetail}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>category</FormLabel>
                            <Input
                                placeholder='category'
                                name='category'
                                focusBorderColor='brown.500'
                                value={category}
                                onChange={updateNewCourseDetail}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>language</FormLabel>
                            <Input
                                placeholder='language'
                                name='langauge'
                                focusBorderColor='brown.500'
                                value={langauge}
                                onChange={updateNewCourseDetail}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Target Audience</FormLabel>
                            <Input
                                placeholder='Target audience'
                                name='target_audience'
                                focusBorderColor='brown.500'
                                value={target_audience}
                                onChange={updateNewCourseDetail}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Prerequisites</FormLabel>
                            <Input
                                placeholder='Prerequisites'
                                name='prerequisites'
                                focusBorderColor='brown.500'
                                value={prerequisites}
                                onChange={updateNewCourseDetail}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Course Content Structure</FormLabel>
                            <Input
                                placeholder='course content structure'
                                name='course_content_structure'
                                value={course_content_structure}
                                onChange={updateNewCourseDetail}
                                focusBorderColor='brown.500'
                            />

                        </FormControl>
                        <FormControl>
                            <FormLabel>Seo keywords</FormLabel>
                            <Input
                                placeholder='Seo keywords'
                                name='sec_keywords'
                                value={sec_keywords}
                                onChange={updateNewCourseDetail}
                                focusBorderColor='brown.500'
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Videos</FormLabel>
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
                                    <p>Drag your video files here</p>
                                ) : (
                                    <p>
                                        Drag drop video files here, or click to select files
                                        <br />
                                        (Only *.mp4 and *.3gp videos will be accepted)
                                    </p>
                                )}
                            </Center>
                            {videoList && (
                                <Center>
                                    <video controls src={videoList} style={{ maxHeight: '200px' }} />
                                </Center>
                            )}

                            <Input {...getInputProps()} />
                        </FormControl>                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme='brown'
                            onClick={handleSubmit}
                        >
                            Save
                        </Button>
                    </ModalFooter>

                </ModalContent>
            </Modal>

        </>
    );
}

export default CreateNewCourse;
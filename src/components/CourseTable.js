import React, { useEffect, useState} from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Image,
    Button,
    SimpleGrid,
    Spinner,
    useToast,
    HStack,
    Menu,
    MenuItem,
    MenuList,
    MenuButton,
    Switch
} from '@chakra-ui/react';
import { BiChevronDown } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import {useCourseContext} from '../context/course_context';

function CourseTable({data = []}) {

    const {
        deleteCourse
    } = useCourseContext();

    const toast  = useToast();

    const handleDelete = async(id) => {
        const response = await deleteCourse(id);
        if(response.success) {
            toast({
                position: 'top',
                description: response.message,
                status: 'success',
                duration: 5000,
                isClosable: true
            });
        } else {
            toast({
                position: 'top',
                description: response.message,
                status: 'error',
                duration: 5000,
                isClosable: true
            });
        }
    }

    return (
        <SimpleGrid bg='white' p={5} shadow='lg' borderRadius='lg' overflowX='auto'>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Title</Th>
                        <Th>Instruct name</Th>
                        <Th>Price</Th>
                        <Th>Category</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((course, index) => {
                        const {title, instructor_name, price, category, _id} = course;
                        return (
                            <Tr key={index}>
                                <Td>
                                    {title}
                                </Td>
                                <Td>
                                    {instructor_name}
                                </Td>
                                <Td>{price}</Td>
                                <Td>{category}</Td>
                                <Menu>
                                        <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                                            Actions
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem>
                                                {/* <UpdateCourseCategoryModal id={_id}/> */}
                                            </MenuItem>
                                            <MenuItem onClick={() => handleDelete(_id)}>
                                                Delete
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>

                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        </SimpleGrid>
    );
}

export default CourseTable;
import React, { useEffect, useState } from "react";
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
import {useConsultationContext} from '../context/consultationCategory_context';

function ConsultancyCategoryTable({ data = [] }) {

    const {
        deleteConsultationCategory
    } = useConsultationContext();

    const toast  = useToast();


    const handleDelete = async(id) => {
        const response = await deleteConsultationCategory(id);
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
                        <Th>Image</Th>
                        <Th>Name</Th>
                        <Th>Status</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((category, index) => {
                        const { image, name, status, _id } = category;
                        return (
                            <Tr key={index}>
                                <Td>
                                    <Image
                                        src={image}
                                        boxSize='100px'
                                        objectFit='cover'
                                        borderRadius='lg'
                                    />
                                </Td>
                                <Td>{name}</Td>
                                <Td>
                                    <Switch
                                        colorScheme='green'
                                        isChecked={status}

                                    />
                                </Td>
                                <Td>
                                    <Menu>
                                        <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                                            Actions
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem>
                                                {/* <UpdateCourseCategoryModal id={_id} /> */}
                                            </MenuItem>
                                            <MenuItem onClick={() => handleDelete(_id)}>
                                                Delete
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Td>

                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        </SimpleGrid>
    );
}

export default ConsultancyCategoryTable;
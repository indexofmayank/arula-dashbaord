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
import { useProductCategoryContext } from '../context/productCategory_context';
import {UpdateProductCategoryModal} from '../components';


function ProductCategoryTable({data}) {

    const {
        productCategoryForTable,
        productCategoryForTable_loading,
        productCategoryForTable_error,
        fetchAllProductCategory,
        deleteProductCategory
    } = useProductCategoryContext();


    useEffect(() => {
        fetchAllProductCategory()
    }, []);


    
    const toast  = useToast();
    // const [deleteProductCategory, fetchAllProductCategory] = useProductCategoryContext();
    const [loading, setLoading] = useState(false);

    const handleDelete = async (id) => {
        setLoading(true);
        const response = await deleteProductCategory(id);
        if(response.success) {
            toast({
                position: 'top',
                description: response.message,
                status: 'success',
                duration: 5000,
                isClosable: true
            });
            await fetchAllProductCategory();
        } else {
            toast({
                position: 'top',
                description: response.message,
                status: 'error',
                duration: 5000,
                isClosable: true
            });
        }
        setLoading(false);
    }

    return (
        <SimpleGrid bg='white' p={5} shadow='lg' borderRadius='lg' overflowX='auto'>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Image</Th>
                        <Th>name</Th>
                        <Th>Status</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {productCategoryForTable.map((category, index) => {
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
                                                <UpdateProductCategoryModal id={_id}/>
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

export default ProductCategoryTable;
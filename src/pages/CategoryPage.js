import React, { useEffect } from "react";
import {
    SidebarWithHeader,
    CreateNewCategoryModal,
    ProductCategoryTable
} from '../components';
import { HStack, VStack, Spinner, Heading, Button } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import { useProductCategoryContext } from '../context/productCategory_context';


function CategoryPage() {

    const {
        productCategoryForTable,
        productCategoryForTable_loading: loading,
        productCategoryForTable_error: error,
        fetchAllProductCategory,
    
    } = useProductCategoryContext();


    useEffect(() => {
        fetchAllProductCategory()
    }, []);

    const handleRefresh = async () => {
        await fetchAllProductCategory();
    };

    if (loading) {
        return (
            <SidebarWithHeader>
                <HStack mb={5}>
                    <CreateNewCategoryModal />
                    <Button
                        colorScheme='brown'
                        variant='outline'
                        leftIcon={<MdOutlineRefresh />}
                        onClick={handleRefresh}
                    >
                        Refresh
                    </Button>
                    <VStack alignItems='center' justifyContent='center'>
                        <Spinner size='lg' color='brown.500' />
                    </VStack>

                </HStack>
            </SidebarWithHeader>
        );
    }

    if (error) {
        return (
            <SidebarWithHeader>
                <HStack mb={5}>
                    <CreateNewCategoryModal />
                    <Button
                        colorScheme="brown"
                        variant="outline"
                        leftIcon={<MdOutlineRefresh />}
                        onClick={handleRefresh}

                    >
                        Refresh
                    </Button>
                </HStack>
                <p>error....</p>
            </SidebarWithHeader>
        )
    }

    return (
        <SidebarWithHeader>
            <HStack mb={5}>
                <CreateNewCategoryModal />
                <Button
                    colorScheme='brown'
                    variant='outline'
                    leftIcon={<MdOutlineRefresh />}
                    onClick={handleRefresh}
                >
                    Refresh
                </Button>
            </HStack>
            <ProductCategoryTable data={productCategoryForTable} />
        </SidebarWithHeader>
    )
}

export default CategoryPage;
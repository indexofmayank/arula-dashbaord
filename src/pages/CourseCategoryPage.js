import React, {useEffect} from "react";
import {
    SidebarWithHeader,
    CreateNewCourseCategoryModal,
    CourseCategoryTable
} from '../components';
import { HStack, VStack, Spinner, Heading, Button } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import {useCourseCategoryContext} from '../context/courseCategory_context';




function CourseCategoryPage() {

    const {
        courseCategoryForTable_loading: loading,
        courseCategoryForTable_error: error,
        courseCategoryForTable,
        fetchCourseCategoryForTable
    
    } = useCourseCategoryContext();

    useEffect(() => {
        fetchCourseCategoryForTable();
    }, []);

    return (
        <SidebarWithHeader>
            <HStack mb={5}>
                <CreateNewCourseCategoryModal />
                <Button
                    colorScheme='brown'
                    variant='outline'
                    leftIcon={<MdOutlineRefresh />}
                    onClick={() => {}}
                >
                    Refresh
                </Button>
            </HStack>
            <CourseCategoryTable data={courseCategoryForTable}/>
        </SidebarWithHeader>
    );
}

export default CourseCategoryPage;
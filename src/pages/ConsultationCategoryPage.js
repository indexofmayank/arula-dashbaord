import React, { useEffect } from "react";
import {
    SidebarWithHeader,
    CreateConsultationCategoryPage,
    ConsultancyCategoryTable
} from '../components';
import { HStack, VStack, Spinner, Heading, Button } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';

import {useConsultationContext} from '../context/consultationCategory_context';


function ConsulationCategoryPage() {

    const {
        consultationCategoryForTable_loading: loading,
        consultationCategoryForTable_error: error,
        consultationCategoryForTable,
        fetchConsultationForTable
    } = useConsultationContext();

    console.log(consultationCategoryForTable);

    useEffect(() => {
        fetchConsultationForTable();
    }, []);

    return (
        <SidebarWithHeader>
            <HStack mb={5}>
                <CreateConsultationCategoryPage />
                <Button
                        colorScheme='brown'
                        variant='outline'
                        leftIcon={<MdOutlineRefresh />}
                        onClick={() => {}}
                    >
                        Refresh
                    </Button>
            </HStack>
            <ConsultancyCategoryTable data={consultationCategoryForTable}/>
        </SidebarWithHeader>
    );
}

export default ConsulationCategoryPage;
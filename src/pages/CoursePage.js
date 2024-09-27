import React, { useEffect } from "react";
import {
    CreateNewCourse,
    SidebarWithHeader,
    CourseTable
} from '../components';
import { HStack, VStack, Spinner, Heading, Button } from '@chakra-ui/react';
import { MdOutlineRefresh } from 'react-icons/md';
import {useCourseContext} from '../context/course_context';



function CoursePage() {

    const {
        fetchCourseForTable,
        courseForTable_loading: loading,
        courseForTable_error: error,
        courseForTable
    } = useCourseContext();

    useEffect(() => {
        fetchCourseForTable()
    }, []);


    return (
        <SidebarWithHeader>
            <HStack mb={5}>
                <CreateNewCourse />
                    <Button
                        colorScheme='brown'
                        variant='outline'
                        leftIcon={<MdOutlineRefresh />}
                        onClick={() => {}}
                    >
                        Refresh
                    </Button>
            </HStack>
            <CourseTable data={courseForTable}/>
        </SidebarWithHeader>
    );
}

export default CoursePage;
import React, {useContext, useEffect, useReducer} from "react";
import axios from "axios";
import reducer from '../reducers/course_reducer';
import {
    course_url,
    courseForTable_url,
    deleteCourse_url
} from '../utils/constants';
import {
    CREATE_NEW_COURSE,
    GET_ALLCOURSE_BEGIN,
    GET_ALLCOURSE_ERROR,
    GET_ALLCOURSE_SUCCESS
} from '../actions';

const initialState = {
    new_course: {
        title: '',
        description: '',
        instructor_name: '',
        duration: '',
        price: '',
        category: '',
        langauge: '',
        target_audience: '',
        prerequisites: '',
        course_content_structure: '',
        sec_keywords: '',
        course_video: ''

    },
    courseForTable_loading: false,
    courseForTable_error: false,
    courseForTable: []
}

const CourseContext = React.createContext();

export const CourseProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const updateNewCourseDetail = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch({type: CREATE_NEW_COURSE, payload: {name, value}});
    }

    const createNewCourse = async (course) => {
        try {
            const response = await axios.post(course_url, course);
            const {success, message} = response.data;
            return {success, message};
        } catch (error) {
            const {success, message} = error.response.data;
            fetchCourseForTable();
            return {success, message};
        }
    }

    const fetchCourseForTable = async () => {
        try {
            dispatch({type: GET_ALLCOURSE_BEGIN});
            const response = await axios.get(courseForTable_url);
            console.log(response)
            const {data} = response.data;
            dispatch({type: GET_ALLCOURSE_SUCCESS, payload: data});
        } catch (error) {
            dispatch({type: GET_ALLCOURSE_ERROR });
        }
    }

    const deleteCourse = async (id) => {
        try {
            const response = await axios.delete(`${deleteCourse_url}${id}`);
            const {success , message} = response;
            await fetchCourseForTable();
            return {success, message};
        } catch (error) {
            const {success, message} = error.response.data;
            return {success, message};
        }
    }

    return (
        <CourseContext.Provider
            value={{
                ...state,
                updateNewCourseDetail,
                createNewCourse,
                fetchCourseForTable,
                deleteCourse
            }}
        >
            {children}
        </CourseContext.Provider>
    );
}

export const useCourseContext = () => {
    return useContext(CourseContext);
}
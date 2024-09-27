import React, {useContext, useEffect, useReducer} from "react";
import axios from "axios";
import reducer from '../reducers/courseCategory_reducer';
import {
    courseCategory_url
} from '../utils/constants';
import {
    CREATE_NEW_COURSE_CATEGORY,
    GET_ALLCOURSECATEGORY_BEGIN,
    GET_ALLCOURSECATEGORY_ERROR,
    GET_ALLCOURSECATEGORY_SUCCESS,
    GET_SINGLECOURSECATEGORY_BEGIN,
    GET_SINGLECOURSECATEGORY_ERROR,
    GET_SINGLECOURSECATEGORY_SUCCESS,
    UPDATE_EXISTING_COURSE_CATEGORY
} from '../actions';

const initialState = {
    new_courseCategory: {
        name: '',
        status: '',
        image: ''
    },
    courseCategoryForTable_loading: false,
    courseCategoryForTable_error: false,
    courseCategoryForTable: [],
    single_courseCategory_loading: false,
    single_courseCategory_error: false,
    single_courseCategory: {}

}

const CourseCategoryContext = React.createContext();
export const CourseCategoryProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const updateNewCourseCategoryDetail = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch({type: CREATE_NEW_COURSE_CATEGORY, payload: {name, value}});
    };

    const updateExistingCourseCategoryDetail = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch({type: UPDATE_EXISTING_COURSE_CATEGORY, payload: {name, value}});

    }

    const createNewCourseCategory = async (courseCategory) => {
        try {
            const response = await axios.post(courseCategory_url, courseCategory);
            const {success, message} = response.data;
            return {success, message}; 
        } catch (error) {
            const {success, message} = error.response.data;
            return {success, message};
        }
    };

    const fetchCourseCategoryForTable = async () => {
        try {
            dispatch({type: GET_ALLCOURSECATEGORY_BEGIN});
            const response = await axios.get(`${courseCategory_url}/table`);
            const {data} = response.data;
            dispatch({type: GET_ALLCOURSECATEGORY_SUCCESS, payload: data});
        } catch (error) {
            dispatch({type: GET_ALLCOURSECATEGORY_ERROR});
        }
    };

    const deleteCourseCategory = async (id) => {
        console.log('we come here');
        try {
            const response = await axios.delete(`${courseCategory_url}${id}`);
            const {success, message} = response.data;
            return {success, message};
        } catch (error) {
            const {success, message} = error.response.data;
            return {success, message};
        }
    }

    const fetchCourseCategoryById = async (id) => {
        try {
            dispatch({type:GET_SINGLECOURSECATEGORY_BEGIN });
            const response = await axios.get(`${courseCategory_url}${id}`);
            const {data} = response.data;
            dispatch({type:GET_SINGLECOURSECATEGORY_SUCCESS, payload: data });
        } catch (error) {
            dispatch({type: GET_SINGLECOURSECATEGORY_ERROR});
        }
    }

    // useEffect(() => {
    //     fetchCourseCategoryForTable()
    // }, []);

    return (
        <CourseCategoryContext.Provider
            value={{
                ...state,
                updateNewCourseCategoryDetail,
                createNewCourseCategory,
                fetchCourseCategoryForTable,
                deleteCourseCategory,
                fetchCourseCategoryById,
                updateExistingCourseCategoryDetail
            }}
        >
            {children}
        </CourseCategoryContext.Provider>
    );
}

export const useCourseCategoryContext = () => {
    return useContext(CourseCategoryContext);
}
import {
    CREATE_NEW_COURSE_CATEGORY,
    GET_ALLCOURSECATEGORY_BEGIN,
    GET_ALLCOURSECATEGORY_ERROR,
    GET_ALLCOURSECATEGORY_SUCCESS,
    GET_SINGLECOURSECATEGORY_BEGIN,
    GET_SINGLECOURSECATEGORY_ERROR,
    GET_SINGLECOURSECATEGORY_SUCCESS,
    GET_COURSECATEGORY_SUCCESS,



} from '../actions';

const courseCategory_reducer = (state, action) => {
    if(action.type === CREATE_NEW_COURSE_CATEGORY) {
        const {name, value} = action.payload;
        return {
            ...state, new_courseCategory: {...state.new_courseCategory, [name]: value}
        }
    }

    if(action.type === GET_ALLCOURSECATEGORY_BEGIN) {
        return {
            ...state, courseCategoryForTable_loading: true, courseCategoryForTable_error: false
        }
    }

    if(action.type === GET_ALLCOURSECATEGORY_ERROR) {
        return {
            ...state,
            courseCategoryForTable_loading: false,
            courseCategoryForTable_error: true
        }
    }

    if(action.type === GET_ALLCOURSECATEGORY_SUCCESS) {
        return {
            ...state,
            courseCategoryForTable_loading: false,
            courseCategoryForTable: action.payload
        }
    }

    if(action.type === GET_SINGLECOURSECATEGORY_BEGIN) {
        return {
            ...state,
            single_courseCategory_loading: true,
            single_courseCategory_error: false
        }
    }

    if(action.type === GET_SINGLECOURSECATEGORY_ERROR) {
        return {
            ...state,
            single_courseCategory_loading: false,
            single_courseCategory_error: true
        }
    }

    if(action.type === GET_SINGLECOURSECATEGORY_SUCCESS) {
        return {
            ...state,
            single_courseCategory_loading: false,
            single_courseCategory: action.payload
        }
    }

    if(action.type === GET_COURSECATEGORY_SUCCESS) {
        return {
            ...state,
            courseCategoryForDropdown: action.payload
        }
    }

}

export default courseCategory_reducer;
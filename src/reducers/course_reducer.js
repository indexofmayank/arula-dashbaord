import {
    CREATE_NEW_COURSE,
    GET_ALLCOURSE_BEGIN,
    GET_ALLCOURSE_ERROR,
    GET_ALLCOURSE_SUCCESS

} from '../actions';

const course_reducer = (state, action) => {
    if (action.type === CREATE_NEW_COURSE) {
        const { name, value } = action.payload;
        return {
            ...state, new_course: { ...state.new_course, [name]: value }
        }
    }

    if(action.type === GET_ALLCOURSE_BEGIN) {
        return {
            ...state,
            courseForTable_loading: true,
            courseForTable_error: false
        }
    }

    if(action.type === GET_ALLCOURSE_ERROR) {
        return {
            ...state,
            courseForTable_loading: false,
            courseForTable_error: true
        }
    }

    if(action.type === GET_ALLCOURSE_SUCCESS) {
        return {
            ...state,
            courseForTable_loading: false,
            courseForTable: action.payload
        }
    }

    throw new Error(`No matching`);
}

export default course_reducer;


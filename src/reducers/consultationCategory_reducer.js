import {
    UPDATE_EXISTING_CONSULTATIONCATEGORY,
    GET_ALLCONSULTATION_BEGIN,
    GET_ALLCONSULTATION_ERROR,
    GET_ALLCONSULTATION_SUCCESS

} from '../actions';

const consultationCategory_reducer = (state, action) => {
    if(action.type === UPDATE_EXISTING_CONSULTATIONCATEGORY) {
        const {name, value} = action.payload;
        return {
            ...state,
            new_consultationCategory: {...state.new_consultationCategory, [name]: value}
            
        }
    }

    if(action.type === GET_ALLCONSULTATION_BEGIN) {
        return {
            ...state,
            consultationCategoryForTable_loading: true,
            consultationCategoryForTable_error: false
        }
    }

    if(action.type === GET_ALLCONSULTATION_ERROR) {
        return {
            ...state,
            consultationCategoryForTable_loading: false,
            consultationCategoryForTable_error: true
        }
    }

    if(action.type === GET_ALLCONSULTATION_SUCCESS) {
        return {
            ...state,
            consultationCategoryForTable_loading: false,
            consultationCategoryForTable: action.payload
        }
    }
}

export default consultationCategory_reducer;
import React, {useContext, useEffect, useReducer} from "react";
import axios from "axios";
import reducer from '../reducers/consultationCategory_reducer';
import {
    createConsultation_url,
    consultationForTable_url
} from '../utils/constants';
import {
    UPDATE_EXISTING_CONSULTATIONCATEGORY,
    GET_ALLCONSULTATION_BEGIN,
    GET_ALLCONSULTATION_ERROR,
    GET_ALLCONSULTATION_SUCCESS
} from '../actions';

const initialState = {
    new_consultationCategory: {
        name: '',
        image: '',
        status: ''
    },
    consultationCategoryForTable_loading: false,
    consultationCategoryForTable_error: false,
    consultationCategoryForTable: []
}

const ConsultationCategoryContext = React.createContext();

export const ConsultationProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const createNewConsultationCategory = async (consultationCategory) => {
        try {
            const response = await axios.post(createConsultation_url, consultationCategory);
            const {success, message} = response.data;
            return {success, message};
        } catch (error) {
            const {success, message} = error.response.data;
            return {success, message};
            
        }
    }

    const udpateNewConsultationCategoryDetails = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch({type: UPDATE_EXISTING_CONSULTATIONCATEGORY, payload: {name, value}});
    }

    const fetchConsultationForTable = async() => {
        try {
            dispatch({type: GET_ALLCONSULTATION_BEGIN});
            const response = await axios.get(consultationForTable_url);
            const {data} = response.data;
            console.log(data);
            dispatch({type: GET_ALLCONSULTATION_SUCCESS, payload: data});
        } catch (error) {
            dispatch({type: GET_ALLCONSULTATION_ERROR});
        }
    }

    const deleteConsultationCategory = async(id) => {
        try {
            const response = await axios.delete(`${createConsultation_url}${id}`);
            const {success, message} = response.data;
            fetchConsultationForTable();
            return {success, message};
        } catch (error) {
            const {success, message} = error.response.data;
            return {success, message};
        }
    }

    return (
        <ConsultationCategoryContext.Provider
            value={{
                ...state,
                udpateNewConsultationCategoryDetails,
                createNewConsultationCategory,
                fetchConsultationForTable,
                deleteConsultationCategory
            }}
        >
            {children}
        </ConsultationCategoryContext.Provider>
    );
}

export const useConsultationContext = () => {
    return useContext(ConsultationCategoryContext);
}
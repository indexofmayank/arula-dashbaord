import React, {useContext, useEffect, useReducer} from "react";
import axios from "axios";
import reducer from '../reducers/productCategory_reducer';
import {
    CREATE_NEW_PRODUCT_CATEGORY,
    GET_PRODUCT_CATEGORY_BEGIN,
    GET_PRODUCT_CATEGORY_ERROR,
    GET_PRODUCT_CATEGORY_SUCCESS,
    GET_SINGLE_PRODUCTCATEGORY_BEGIN,
    GET_SINGLE_PRODUCTCATEGORY_ERROR,
    GET_SINGLE_PRODUCTCATEGORY_SUCCESS,
    UPDATE_EXISTING_PRODUCTCATEGORY
} from '../actions';
import {
    productCategory_url,
    productCategoryTable_url
} from '../utils/constants'
const initialState = {
    new_productCategory: {
        name: '',
        status: '',
        image: ''
    },
    productCategoryForTable_loading: false,
    productCategoryForTable_error: false,
    productCategoryForTable: [],
    single_productCategory_laoding: false,
    single_productCategory_error: false,
    single_productCategory: {},
};

const ProductCategoryContext = React.createContext();
export const ProductCategoryProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchAllProductCategory = async() => {
        try {
            const response = await axios.get(productCategoryTable_url);
            const {data} = response.data;
            console.log(data);
            dispatch({type: GET_PRODUCT_CATEGORY_SUCCESS, payload: data});
        } catch (error) {
            dispatch({type: GET_PRODUCT_CATEGORY_ERROR});
        }
    };


    const updateNewProductCategoryDetail = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch({type: CREATE_NEW_PRODUCT_CATEGORY, payload: {name, value}});
    };

    const updateExistingProductCategoryDetail = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch({type: UPDATE_EXISTING_PRODUCTCATEGORY, payload: {name, value}});
    }
    

    const createNewProductCategory = async (productCategory) => {
        try {
            const response = await axios.post(productCategory_url, productCategory);
            const {success, data} = response.data;
            return {success, data};
        } catch (error) {
            const {success, message} = error.response.data;
            return {success, message};
        }
    };

    const deleteProductCategory = async (id) => {
        try {
            const response = await axios.delete(`${productCategory_url}${id}`);
            const {success, message} = response.data;
            return {success, message};
        } catch (error) {
            const {success, message} = error.response.data;
            return {success, message};
        }
    };

    const fetchProductCategoryById = async (id) => {
        try {
            dispatch({type:GET_SINGLE_PRODUCTCATEGORY_BEGIN });
            const response = await axios.get(`${productCategory_url}${id}`);
            const {data} = response.data;
            dispatch({type: GET_SINGLE_PRODUCTCATEGORY_SUCCESS, payload: data});
        } catch (error) {
            dispatch({type:GET_SINGLE_PRODUCTCATEGORY_ERROR });
        }
    };

    const udpateProductCategory = async (id, productCategory) => {
        try {
            const response = await axios.put(`${productCategory_url}${id}`, productCategory);
            const {success, message} = response;
            return {success, message};
        } catch (error) {
            const {success, message} = error.response.data;
            return {success, message};
        }
    }

    
    return (
        <ProductCategoryContext.Provider
            value={{
                ...state,
                updateNewProductCategoryDetail,
                createNewProductCategory,
                fetchAllProductCategory,
                deleteProductCategory,
                fetchProductCategoryById,
                updateExistingProductCategoryDetail,
                udpateProductCategory
            }}
        >
            {children}
        </ProductCategoryContext.Provider>
    );
}

export const useProductCategoryContext = () => {
    return useContext(ProductCategoryContext);
}

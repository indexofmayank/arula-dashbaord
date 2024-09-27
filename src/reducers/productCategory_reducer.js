import {
    CREATE_NEW_PRODUCT_CATEGORY,
    GET_PRODUCT_CATEGORY_BEGIN,
    GET_PRODUCT_CATEGORY_ERROR,
    GET_PRODUCT_CATEGORY_SUCCESS,
    GET_SINGLE_PRODUCTCATEGORY_BEGIN,
    GET_SINGLE_PRODUCTCATEGORY_ERROR,
    GET_SINGLE_PRODUCTCATEGORY_SUCCESS,
    UPDATE_EXISTING_PRODUCTCATEGORY,
    GET_PRODUCTCATEGORYFORDROPDOWN_BEGIN,
    GET_PRODUCTCATEGORYDROPDOWN_ERROR,
    GET_PRODUCTCATEGORYDROPDOWN_SUCCESS

} from '../actions';

const productCategory_reducer = (state, action) => {
    if(action.type === CREATE_NEW_PRODUCT_CATEGORY) {
        const { name, value } = action.payload;
        return {
            ...state, new_productCategory: {...state.new_productCategory, [name]: value}
        }
    }

    if(action.type === GET_PRODUCT_CATEGORY_BEGIN) {
        return {...state, productCategoryForTable_loading: true, productCategoryForTable_error: false}
    }

    if(action.type === GET_PRODUCT_CATEGORY_ERROR) {
        return {...state, productCategoryForTable_loading: false, productCategoryForTable_error: true}
    }

    if(action.type === GET_PRODUCT_CATEGORY_SUCCESS) {
        return {...state, productCategoryForTable_loading: false, productCategoryForTable: action.payload}
    }

    if(action.type === GET_SINGLE_PRODUCTCATEGORY_BEGIN) {
        return {...state, single_productCategory_laoding: true, single_productCategory_error: false}
    }

    if(action.type === GET_SINGLE_PRODUCTCATEGORY_ERROR) {
        return {...state, single_productCategory_laoding: false, single_productCategory_error: true}
    }

    if(action.type === GET_SINGLE_PRODUCTCATEGORY_SUCCESS) {
        return {...state, single_productCategory_laoding: false, single_productCategory: action.payload}
    }

    if(action.type === UPDATE_EXISTING_PRODUCTCATEGORY) {
        const {name, value} = action.payload;
        return {...state,
            single_productCategory: {...state.single_productCategory, [name]: value}
        }
    }

    if(action.type === GET_PRODUCTCATEGORYFORDROPDOWN_BEGIN) {
        return {
            ...state,
            productCategoryForDropdown_loading: true,
            productCategoryForDropdown_error: false
        }
    }

    if(action.type === GET_PRODUCTCATEGORYDROPDOWN_ERROR) {
        return {
            ...state,
            productCategoryForDropdown_loading: false,
            productCategoryForDropdown_error: true
        }
    }

    if(action.type === GET_PRODUCTCATEGORYDROPDOWN_SUCCESS) {
        return {
            ...state,
            productCategoryForDropdown_loading: false,
            productCategoryForDropdown: action.payload
        }
    }


    throw new Error(`No Matching "${action.type}" - action type`);

}

export default productCategory_reducer;
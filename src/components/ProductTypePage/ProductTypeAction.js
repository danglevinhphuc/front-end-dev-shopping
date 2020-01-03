import utilsCallApi from "./../../utils/apiCaller";
import _ from 'lodash';
export const FETCH_PRODUCTS_TYPE = 'FETCH_PRODUCTS_TYPE';
export const EDIT_PRODUCT_TYPE = 'EDIT_PRODUCT_TYPE';
export const SEARCH_PRODUCT_TYPE = 'SEARCH_PRODUCT_TYPE';
export const PAGE_SIZE_PRODUCT_TYPE = 'PAGE_SIZE_PRODUCT_TYPE';
export const CHANGE_CHECKED_PRODUCT_TYPE = 'CHANGE_CHECKED_PRODUCT_TYPE';
export const DELETE_PRODUCT_TYPE = 'DELETE_PRODUCT_TYPE';
export const EXPORT_PRODUCT_TYPE = "EXPORT_PRODUCT_TYPE"
export const actFetchProductsTypeRequest = (request = null) => {
    return async (dispatch, getState) => {
        var query = utilsCallApi.filterMongo(null,getState().productType.searchRequest);
        if(request){
            _.forEach(request,(o) =>{
                var type = o.type;
                query.query[type] = o.script;
            })
        }
        var response =  await utilsCallApi.callApi('/product-type/query', 'POST', query);
        await   dispatch(actFetchProductsType(response.data));
    }
}
export const actEditProductsTypeRequest = (data) =>{
    return async (dispatch) =>{
        var response = await utilsCallApi.callApi('/product-type/edit','POST',data);
        await dispatch({
            type: EDIT_PRODUCT_TYPE,
            data: response.data
        })
    }
}
export const actGetProductsTypeById =  async (id) =>{
    var response = await utilsCallApi.callApi(`/product-type/get/${id}`,'GET',null);
    return response.data;
}
export const actDeleteProductsType = (data) =>{
    return async (dispatch) =>{
        var response = await utilsCallApi.callApi('/product-type/delete','POST',data);
        await dispatch({
            type: DELETE_PRODUCT_TYPE,
            data: response.data
        })
    }
}
export const searchProductTypeRequest = (data) =>{
    return {
        type: SEARCH_PRODUCT_TYPE,
        data
    }
}
export const pageSizeProductTypeRequest = (data) =>{
    return {
        type: PAGE_SIZE_PRODUCT_TYPE,
        data
    }
}
export const actFetchProductsType = (productsType) => {
    return {
        type: FETCH_PRODUCTS_TYPE,
        productsType
    }
}
export const changeCheckedProductType = (data) =>{
    return {
        type: CHANGE_CHECKED_PRODUCT_TYPE,
        data
    }
}
export const actImportProductType = data => {
    return utilsCallApi.callApiFormData(`/product-type/import`, data).then(res => {
      if (res) {
        return res.data;
      }
    });
  };
export const getTemplateImportProductType = data =>{
    return utilsCallApi.callApiGetTemplate(`/product-type/get-template/${data}`);
}
export const exportProductType = () =>{
    return async (dispatch, getState) => {
        var query = utilsCallApi.filterMongo(null,getState().productType.searchRequest);
        var response =  await utilsCallApi.callApiExport('/product-type/export', query);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "product_type_export.xlsx");
        document.body.appendChild(link);
        link.click();
    }
}
import utilsCallApi from "./../../utils/apiCaller";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const EDIT_PRODUCTS = "EDIT_PRODUCTS";
export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS";
export const PAGE_SIZE_PRODUCTS = "PAGE_SIZE_PRODUCTS";
export const CHANGE_CHECKED_PRODUCTS = "CHANGE_CHECKED_PRODUCTS";
export const DELETE_PRODUCTS = "DELETE_PRODUCTS";
export const actFetchProductsRequest = () => {
  return async (dispatch, getState) => {
    var query = utilsCallApi.filterMongo(
      null,
      getState().products.searchRequest
    );
    var response = await utilsCallApi.callApi("/product/query", "POST", query);
    await dispatch(actFetchProducts(response.data));
  };
};
export const actEditProductsRequest = data => {
  return async dispatch => {
    var response = await utilsCallApi.callApi("/product/edit", "POST", data);
    await dispatch({
      type: EDIT_PRODUCTS,
      data: data.id
        ? response.data && response.data[0]
          ? response.data[0]
          : null
        : data
    });
  };
};
export const actGetProductsById = async id => {
  var response = await utilsCallApi.callApi(`/product/get/${id}`, "GET", null);
  return response.data;
};
export const actDeleteProducts = data => {
  return async dispatch => {
    var response = await utilsCallApi.callApi("/product/delete", "POST", data);
    await dispatch({
      type: DELETE_PRODUCTS,
      data: response.data
    });
  };
};
export const actEditProduct = data => {
  return async dispatch => {
    var response = await utilsCallApi.callApiFormData("/product/edit", data);
    return response;
  };
};
export const searchProductsRequest = data => {
  return {
    type: SEARCH_PRODUCTS,
    data
  };
};
export const pageSizeProductsRequest = data => {
  return {
    type: PAGE_SIZE_PRODUCTS,
    data
  };
};
export const actFetchProducts = Products => {
  return {
    type: FETCH_PRODUCTS,
    Products
  };
};
export const changeCheckedProducts = data => {
  return {
    type: CHANGE_CHECKED_PRODUCTS,
    data
  };
};
export const deleteImageProduct = data => {
  return utilsCallApi.callApi(`/product/images/delete`, "POST", data).then(res => {
    if (res) {
      return res.data;
    }
  });
};

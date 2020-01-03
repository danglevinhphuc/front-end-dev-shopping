import callApi from "./../../utils/apiCaller";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";

export const actUpdateProductRequest = product => {
  return dispatch => {
    return callApi(`/products/${product.id}`, "PUT", product).then(res => {
      if (res) {
        dispatch(actUpdateProduct(res.data));
      }
    });
  };
};

export const actUpdateProduct = product => {
  return {
    type: UPDATE_PRODUCT,
    product
  };
};
export const actGetProductRequest = id => {
  return dispatch => {
    return callApi(`/products/${id}`, "GET", null).then(res => {
      dispatch(actGetProduct(res.data));
    });
  };
};

export const actGetProduct = product => {
  return {
    type: EDIT_PRODUCT,
    product
  };
};

export const actAddProductRequest = product => {
  return dispatch => {
    return callApi("/products", "POST", product).then(res => {
      dispatch(actAddProduct(res.data));
    });
  };
};

export const actAddProduct = product => {
  return {
    type: ADD_PRODUCT,
    product
  };
};

import * as ProductEditAction from "./ProductEditAction";

var initialState = {};

const productEditReducer = (state = initialState, action) => {
  var { product, id } = action;
  var index = -1;
  switch (action.type) {
    case ProductEditAction.EDIT_PRODUCT:
      state = product;
      return state;
    default:
      return state;
  }
};

export { productEditReducer };

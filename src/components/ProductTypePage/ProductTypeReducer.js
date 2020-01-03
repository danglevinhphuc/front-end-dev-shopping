import * as ProductTypeAction from "./ProductTypeAction";
import _ from 'lodash';
var initialState = {
    headers:[
        {show: false,name: 'Id',label: 'Id'},
        {show: true,name: 'Name',label: 'Name'},
        {show: true,name: 'Origin',label: 'Origin'},
        {show: true,name: 'IsActive',label: 'Is Active'},
        {show: true,name: 'CreatedAt',label: 'Created At'},
        {show: true,name: 'UpdatedAt',label: 'Updated At'}
    ],
    searchRequest: {
        description: '',
        currentPage: 1,
        pageSize: 5,
        sort: { field: "createdAt", sortOrder: 1 }
    },
    productTypeData : [],
    total: 0,
    loading:false
};

const ProductTypeReducer =  (state = initialState, action) => {
    var { productsType,data } = action;
    switch (action.type) {
        case ProductTypeAction.FETCH_PRODUCTS_TYPE:
        state.productTypeData = productsType.data;
        state.productTypeData = _.map(state.productTypeData,(o) =>{o.isChecked = false; return o;});
        state.total = productsType.total;        
        state.loading =true;
        return {...state};
        case ProductTypeAction.SEARCH_PRODUCT_TYPE:
        state.searchRequest.description =data;
        return {...state};
        case ProductTypeAction.PAGE_SIZE_PRODUCT_TYPE: 
        state.searchRequest.currentPage  =data;
        return {...state};
        case ProductTypeAction.EDIT_PRODUCT_TYPE :
        // if(data){
        //     if(data.id){
        //         data._id = data.id;
        //         var dataExited = _.find(state.productTypeData,{"id" : data.id});
        //         if(dataExited){
        //             dataExited = data;
        //         }else{
        //             state.productTypeData.push(data)
        //         }
        //     }
        // }
        return {...state};
        case ProductTypeAction.CHANGE_CHECKED_PRODUCT_TYPE:
        if( data.type=='single'){
            var dataExited = _.find(state.productTypeData,{"_id" : data.id});
            if(dataExited){
                dataExited.isChecked = data.isChecked;
            }
        }else{
            state.productTypeData = _.map(state.productTypeData,(o) =>{o.isChecked = !data.val; return o;});
        }
        return {...state};
        case ProductTypeAction.DELETE_PRODUCT_TYPE :
        var ids = _.flatMap(data,"id");
        state.productTypeData = _.filter(state.productTypeData,(o) =>{
            return _.indexOf(ids,o._id) == -1;
        })
        return {...state};
    default:
        return {...state};
    }
}
  
export { ProductTypeReducer };
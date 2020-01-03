import * as ProductListAction from "./ProductListAction";
import _ from 'lodash';
var initialState = {
    headers:[
        {show: false,name: 'Id',label: 'Id'},
        {show: true,name: 'Name',label: 'Name'},
        {show: true,name: 'Price',label: 'Price'},
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
    productData : [],
    total: 0,
    loading:false
};

const ProducsReducer = (state = initialState, action) => {
    var { Products,data } = action;
    switch (action.type) {
        case ProductListAction.FETCH_PRODUCTS:
        state.productData = Products.data;
        state.productData = _.map(state.productData,(o) =>{o.isChecked = false; return o;});
        state.total = Products.total;        
        state.loading =true;
        return {...state};
        case ProductListAction.SEARCH_PRODUCTS:
        state.searchRequest.description =data;
        return {...state};
        case ProductListAction.PAGE_SIZE_PRODUCTS: 
        state.searchRequest.currentPage  =data;
        return {...state};
        case ProductListAction.EDIT_PRODUCTS : 
        data = data && data.length ? data[0]: data;
        if(data){
            if(data.id){
                data._id = data.id;
                var positionProduct = _.findIndex(state.productData,{"_id" : data.id});
                if(positionProduct != -1){
                    state.productData[positionProduct] = data;
                }else{
                    state.productData.push(data);    
                }
            }else{
                state.productData.push(data);
            }
        }
        return {...state};
        case ProductListAction.CHANGE_CHECKED_PRODUCTS:
        if( data.type=='single'){
            var dataExited = _.find(state.productData,{"_id" : data.id});
            if(dataExited){
                dataExited.isChecked = data.isChecked;
            }
        }else{
            state.productData = _.map(state.productData,(o) =>{o.isChecked = !data.val; return o;});
        }
        return {...state};
        case ProductListAction.DELETE_PRODUCTS :
        var ids = _.flatMap(data,"id");
        state.productData = _.filter(state.productData,(o) =>{
            return _.indexOf(ids,o._id) == -1;
        })
        return {...state};
    default:
        return {...state};
    }
}
  
export { ProducsReducer };
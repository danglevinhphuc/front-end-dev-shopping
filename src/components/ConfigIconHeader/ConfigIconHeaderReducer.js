import * as ConfigAction from "./ConfigIconHeaderAction";
import _ from 'lodash';
var initialState = {
    headers:[
        {show: false,name: 'Id',label: 'Id'},
        {show: true,name: 'name',label: 'Name'},
        {show: true,name: 'link',label: 'Link'},
        {show: true,name: 'position',label: 'Position'},
        {show: true,name: 'isActive',label: 'Is Active'},
        {show: true,name: 'CreatedAt',label: 'Created At'},
        {show: true,name: 'UpdatedAt',label: 'Updated At'}
    ],
    searchRequest: {
        description: '',
        sort: { field: "createdAt", sortOrder: 1 }
    },
    ConfigIconHeaderData : [],
    dataClone: null,
    total: 0,
    loading:false
};

const ConfigIconHeaderReducer = (state = initialState, action) => {
    var { ConfigIconHeader,val } = action;
    switch (action.type) {
        case ConfigAction.FETCH_CONFIG_ICON_HEADER:
            state.loading =true;
            state.ConfigIconHeaderData = ConfigIconHeader && ConfigIconHeader.data ? ConfigIconHeader.data : [];
            state.dataClone = _.cloneDeep(state.ConfigIconHeaderData);
            state.total = ConfigIconHeader && ConfigIconHeader.data ? ConfigIconHeader.data.length: 0;
            return {...state};
        case ConfigAction.SEARCH_CONFIG_ICON_HEADER:
            var data = _.filter(_.cloneDeep(state.dataClone),(o) =>{ return o && o.name.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) > -1});
            state.ConfigIconHeaderData = data;
            state.total = data.length; 
            return {...state};
    default:
        return {...state};
    }
}
  
export { ConfigIconHeaderReducer };
import * as ConfigAction from "./ConfigMenuAction";
import _ from 'lodash';
var initialState = {
    headers:[
        {show: false,name: 'Id',label: 'Id'},
        {show: true,name: 'parent',label: 'Parent'},
        {show: true,name: 'linkParent',label: 'Link Parent'},
        {show: true,name: 'position',label: 'Position'},
        {show: true,name: 'isActive',label: 'Is Active'},
        {show: true,name: 'child',label: 'Child'},
        {show: true,name: 'CreatedAt',label: 'Created At'},
        {show: true,name: 'UpdatedAt',label: 'Updated At'}
    ],
    searchRequest: {
        description: '',
        sort: { field: "createdAt", sortOrder: 1 }
    },
    configMenuData : [],
    dataClone: null,
    total: 0,
    loading:false
};

const ConfigMenuReducer = (state = initialState, action) => {
    var { configMenu,val } = action;
    switch (action.type) {
        case ConfigAction.FETCH_CONFIG_MENU:
            state.loading =true;
            state.configMenuData = configMenu && configMenu.data ? configMenu.data : [];
            state.dataClone = _.cloneDeep(state.configMenuData);
            state.total = configMenu && configMenu.data ? configMenu.data.length: 0;
            return {...state};
        case ConfigAction.SEARCH_CONFIG_MENU:
            var data = _.filter(_.cloneDeep(state.dataClone),(o) =>{ return o && o.parent.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) > -1});
            state.configMenuData = data;
            state.total = data.length; 
            return {...state};
    default:
        return {...state};
    }
}
  
export { ConfigMenuReducer };
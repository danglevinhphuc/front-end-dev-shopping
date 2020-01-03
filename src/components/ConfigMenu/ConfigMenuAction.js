import utilsCallApi from "./../../utils/apiCaller";
import _ from 'lodash';
export const FETCH_CONFIG_MENU = 'FETCH_CONFIG_MENU';
export const SEARCH_CONFIG_MENU = 'SEARCH_CONFIG_MENU'

export const actFetchConfigMenuRequest = (request = null) => {
    return async (dispatch, getState) => {
        var response =  await utilsCallApi.callApi('/menu/get-all', 'POST',{});
        await  dispatch(actFetchConfigMenu(response.data));
    }
}
export const actFetchConfigMenu = (configMenu) => {
    return {
        type: FETCH_CONFIG_MENU,
        configMenu
    }
}
export const searchConfigMenu = (val) =>{
    return {
        type: SEARCH_CONFIG_MENU,
        val
    }
}
export const atcGetConfigMenu = async (id) =>{
    return await utilsCallApi.callApi(`/menu/get/${id}`, "GET", null);
}
export const editConfigMenu = async (data) =>{
    return await utilsCallApi.callApi(`/menu/edit`, "POST", data);
}
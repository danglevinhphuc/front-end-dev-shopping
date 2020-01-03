import utilsCallApi from "../../utils/apiCaller";
import _ from 'lodash';
export const FETCH_CONFIG_ICON_HEADER = 'FETCH_CONFIG_ICON_HEADER';
export const SEARCH_CONFIG_ICON_HEADER = 'SEARCH_CONFIG_ICON_HEADER'

export const actFetchConfigIconHeaderRequest = (request = null) => {
    return async (dispatch, getState) => {
        var response =  await utilsCallApi.callApi('/icon-header/get-all', 'POST',{});
        await  dispatch(actFetchConfigIconHeader(response.data));
    }
}
export const actFetchConfigIconHeader = (ConfigIconHeader) => {
    return {
        type: FETCH_CONFIG_ICON_HEADER,
        ConfigIconHeader
    }
}
export const searchConfigIconHeader = (val) =>{
    return {
        type: SEARCH_CONFIG_ICON_HEADER,
        val
    }
}
export const atcGetConfigIconHeader = async (id) =>{
    return await utilsCallApi.callApi(`/icon-header/get/${id}`, "GET", null);
}
export const editConfigIconHeader = async (data) =>{
    return await utilsCallApi.callApi(`/icon-header/edit`, "POST", data);
}
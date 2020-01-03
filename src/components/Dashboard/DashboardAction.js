import utilsCallApi from "./../../utils/apiCaller";
import _ from 'lodash';
export const GET_STATISTIC = "GET_STATISTIC";
export const SET_FROM_TO = "SET_FROM_TO";

export const actFetchStatisticRequest = (request = null) => {
    return async (dispatch, getState) => {
        var response =  await utilsCallApi.callApi('/statistics/get', 'POST',{
            from : getState().dashboard.from,
            to: getState().dashboard.to
        });
        await dispatch({
            type: GET_STATISTIC,
            data: response.data
        })
    }
}

export const setFromToRequest = (request) =>{
    return (dispatch) => {
        dispatch({
            type: SET_FROM_TO,
            data: request
        })
    }
}

import axios from 'axios';
import * as Config from '../../constants/Config';
import utilsCallApi from "./../../utils/apiCaller";
import socket from '../../configuration/socket'
export const actionSignInRequest =  async (data) => {
    var response = await axios.post(`${Config.API_URL}/userinfo/upload/${data.id}`, data.formData,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
    socket.emit("receive-change-user-info",response.data);
    return response;
};
export const actionEditRequest = async (data) =>{
  return await utilsCallApi.callApi(`/userinfo/edit`, "POST", data);
}
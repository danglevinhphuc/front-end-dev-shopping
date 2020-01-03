import utilsCallApi from "./../../utils/apiCaller";
export const SIGNIN = "SIGNIN";
export const CHANGE_TITLE = "CHANGE_TITLE";

export const actionSignInRequest = data => {
  return utilsCallApi.callApi(`/auth/signin`, "POST", data).then(res => {
    if (res) {
      return res.data;
    }
  });
};

export const actionSignInSocial = data =>{
  return utilsCallApi.callApi(`/auth/sigin-with-social`, "POST", data).then(res => {
    if (res) {
      return res.data;
    }
  });
}

export const actionSignUpRequest = data => {
  return utilsCallApi.callApi(`/auth/signup`, "POST", data).then(res => {
    if (res) {
      return res.data;
    }
  });
};

export const actionAuthourizeRequest = data => {
  return utilsCallApi.callApi(`/auth/verify-token`, "POST", {token: data}).then(res => {
    if (res) {
      return res.data;
    }
  });
};

export const actionSignIn = token => {
  return {
    type: SIGNIN,
    token
  };
};

export const changeTitleBar = data =>{
  return {
    type : CHANGE_TITLE,
    data
  }
}
export const activeAccount = data =>{
  var request = {
    headers:{},
    body: {},
    method: 'GET',
    url: `/auth/active-account-generate-link/${data}`
  }
  return utilsCallApi.callApiNotToken(request);
}
export const activeAccountOTP = data =>{
  var request = {
    headers:{},
    body: data,
    method: 'POST',
    url: `/auth/active-account`
  }
  return utilsCallApi.callApiNotToken(request);
}
export const resendCodeOTP = data =>{
  var request = {
    headers:{},
    body: data,
    method: 'POST',
    url: `/auth/resend-otp`
  }
  return utilsCallApi.callApiNotToken(request);
}
export const sendForgotPass = data =>{
  var request = {
    headers:{},
    body: data,
    method: 'POST',
    url: `/auth/forgot-pass`
  }
  return utilsCallApi.callApiNotToken(request);
}
export const restPass = data =>{
  var request = {
    headers:{},
    body: data,
    method: 'POST',
    url: `/auth/reset-pass`
  }
  return utilsCallApi.callApiNotToken(request);
}
export const  setCustomClaimUser = data =>{
  var request = {
    headers:{},
    body: data,
    method: 'POST',
    url: `/user/set-custorm-claim`
  }
  return utilsCallApi.callApiSocket(request);
}
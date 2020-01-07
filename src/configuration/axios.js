import axios from 'axios'

export function axios_init(){
    axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        document.getElementById('loader').style.display = 'block';
        return config;
      }, function (error) {
        // Do something with request error
        return Promise.reject(error);
      });
    
    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        document.getElementById('loader').style.display = 'none';
        return response;
      }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      });
}
import FetchInterceptor from 'fetch-interceptor';

export function fetch_init() {
  const interceptor = FetchInterceptor.register({
    onBeforeRequest(request, controller) {
      // Hook before request
      document.getElementById('loader').style.display = 'block';
    },
    onRequestSuccess(response, request, controller) {
      // Hook on response success
      document.getElementById('loader').style.display = 'none';
    },
    onRequestFailure(response, request, controller) {
      // Hook on response failure
      document.getElementById('loader').style.display = 'none';
    }
  });
}

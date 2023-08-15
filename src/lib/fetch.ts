import axios from 'axios';

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export const fetcher = (method: HttpMethod) => {
  function init(url: string) {
    return axios({
      method,
      url,
    }).then((response) => response.data);
  }
  return {
    init,
  };
};

import axios from 'axios';

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export const http = (method: HttpMethod) => {
  function fetch(url: string) {
    return axios({
      method,
      url,
    }).then((response) => response.data);
  }
  return {
    fetch,
  };
};

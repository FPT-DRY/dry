import { HttpMethod } from 'api';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState } from 'react';

type DefaultConfig = {
  baseUrl?: string;
};

type FetchType<D> = Omit<AxiosRequestConfig<D>, 'method'>;
type FetchStatus = { code: number; text: string };

export function useApi<T = any, D = any>(defaultConfig?: DefaultConfig) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<FetchStatus | null>(null);
  const [error, setError] = useState<AxiosError | undefined>(undefined);

  const fetch = async (
    method: HttpMethod,
    { url, ...config }: FetchType<D>
  ) => {
    setLoading(true);
    setError(undefined);
    let status: FetchStatus | null = null;
    let data: T | null = null;

    const apiUrl = defaultConfig?.baseUrl ? defaultConfig.baseUrl + url : url;

    try {
      const response = await axios<T, AxiosResponse<T>, D>({
        method,
        url: apiUrl,
        ...config,
      });
      status = { code: response.status, text: response.statusText };

      const acceptStatuses = ['GET', 'PUT', 'PATCH', 'DELETE'].includes(method)
        ? [200]
        : [200, 201];
      if (!acceptStatuses.includes(response.status)) {
        throw new Error(`Failed to get response from ${apiUrl}.`);
      }

      data = response.data;
      setData(data);
    } catch (error) {
      setError(error as AxiosError);
    } finally {
      setLoading(false);
      setStatus(status);
    }

    return {
      status,
      data,
    };
  };

  return {
    data,
    loading,
    status,
    error,
    GET: (config: FetchType<D>) => fetch('GET', config),
    POST: (config: FetchType<D>) => fetch('POST', config),
    PUT: (config: FetchType<D>) => fetch('PUT', config),
    PATCH: (config: FetchType<D>) => fetch('PATCH', config),
    DELETE: (config: FetchType<D>) => fetch('DELETE', config),
  };
}

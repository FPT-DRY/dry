import { Prisma } from '@prisma/client';
import { HttpClientError, HttpMethod, HttpServerError } from 'api';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

type HttpConfig<D> = Omit<AxiosRequestConfig<D>, 'url' | 'method'>;

const axiosInstance = axios.create({
  baseURL: process.env.DOMAIN_URL || 'http://localhost:3000',
});

export const http = (method: HttpMethod) => {
  return function fetch<T = any, D = any>(
    url: string,
    config?: HttpConfig<D>
  ): Promise<T> {
    return axiosInstance<T, AxiosResponse<T, any>, D>({
      method,
      url,
      ...config,
    })
      .then((response) => response.data)
      .catch((error) => Promise.reject(error));
  };
};

export function apiHandler(handler: { [method: string]: Function }) {
  const wrappedHandler: any = {};
  const httpMethods: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

  httpMethods.forEach((method) => {
    if (typeof handler[method] !== 'function') return;

    wrappedHandler[method] = async (req: NextRequest, ...args: any) => {
      try {
        // global middleware

        // route handler
        const response: NextResponse = await handler[method](req, ...args);
        const body = await response.json();

        return NextResponse.json(body, {
          status: response.status,
          headers: response.headers,
        });
      } catch (err: any) {
        // global error handler
        return errorHandler(err);
      }
    };
  });

  return wrappedHandler;
}

function errorHandler(error: unknown) {
  if (error instanceof HttpClientError) {
    return HttpClientError.json(error);
  } else if (error instanceof HttpServerError) {
    return HttpServerError.json(error);
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return HttpClientError.json(
        HttpClientError.badClient('Unique constraint violation.', error.meta)
      );
    }
  } else if (error instanceof TypeError || error instanceof SyntaxError) {
    return HttpClientError.json(
      HttpClientError.badClient(error.message, error.cause as string)
    );
  } else {
    console.error(error);
    return HttpServerError.json(
      HttpServerError.internalServerError(error as string)
    );
  }
}

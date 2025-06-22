import type { TRequestParams } from './api';

const formatQueryParameter = (params?: TRequestParams): string => {
  if (!params) return '';

  switch (true) {
    case params instanceof URLSearchParams:
      return `?${params.toString()}`;

    default: {
      const searchParams = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      return `?${searchParams.toString()}`;
    }
  }
};

export { formatQueryParameter };

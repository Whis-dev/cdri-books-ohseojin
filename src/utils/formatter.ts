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

const formatTwoDimension = <T>(
  original: Array<T>,
  itemLength: number = 10,
): Array<Array<T>> => {
  const twoDimension = [];

  while (original.length > 0) {
    twoDimension.push(original.splice(0, itemLength));
  }

  console.log(twoDimension);

  return twoDimension;
};

export { formatQueryParameter, formatTwoDimension };

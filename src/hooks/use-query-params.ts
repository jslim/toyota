import { useRouter } from 'next/router';

import sanitizer from '@/utils/sanitizer';

const DEFAULT_OPTIONS = {
  removeParams: ['page'],
  shallow: false
};

export default function useQueryParams(paramKey: string, setOptions = {}) {
  const router = useRouter();
  const options = { ...DEFAULT_OPTIONS, ...setOptions };

  const paramValue = router.query[paramKey];

  function setParamValue(value: string) {
    const currentQuery = { ...router.query };
    delete currentQuery[paramKey];

    options.removeParams.forEach((removeParam) => {
      delete currentQuery[removeParam];
    });

    const query = value ? { [paramKey]: value } : {};

    const unsortedQuery = { ...currentQuery, ...query };
    const sortedQuery: { [key: string]: string | string[] | undefined } = {};

    Object.keys(unsortedQuery)
      .sort()
      .forEach((key) => {
        sortedQuery[key] = unsortedQuery[key];
      });

    router.push(
      {
        pathname: router.route,
        query: sortedQuery
      },
      undefined,
      { shallow: options.shallow }
    );
  }

  return [sanitizer(paramValue as string), setParamValue];
}

export function useClearParams(params: [], isShallow: boolean) {
  const router = useRouter();

  return function () {
    const query = router.query;
    params.forEach((param) => {
      delete query[param];
    });

    router.push(
      {
        pathname: router.route,
        query: query
      },
      undefined,
      { shallow: isShallow }
    );
  };
}

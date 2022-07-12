import Axios, { AxiosError } from 'axios';
import {
  UseQueryOptions,
  useQuery
} from 'react-query';

import { CategoryList } from '@/app/movie/movies.types';

let token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTY1NzY5ODA3M30.6ElMnGYshdIEt2gooPakXY9To2_vA0GRm_DckG87oiRfRuaZTRy-xv43ge_xJmtN9KQnIFGGwSMBQ6kUK_yLuw';

const categoriesKeys = {
  all: () => ['categoriesService'] as const,
  categories: () =>
    [...categoriesKeys.all(), 'categories' ] as const,
  category: () =>
    [...categoriesKeys.all(), 'category'] as const,
};

export const useCategoriesList = (
  config: UseQueryOptions<
    CategoryList,
    AxiosError,
    CategoryList,
    InferQueryKey<typeof categoriesKeys.categories>
  > = {}
) => {
  const result = useQuery(
    categoriesKeys.categories(),
    (): Promise<CategoryList> =>
      Axios.get('http://localhost:8080/api/categories', { headers: {"Authorization" : token} }),
    {
      keepPreviousData: true,
      ...config,
    }
  );

  const categories = result.data || []
  const isLoadingCategories = result.isFetching;

  return {
    categories,
    isLoadingCategories,
    ...result,
  };
};


import Axios, { AxiosError } from 'axios';
import { UseQueryOptions, useQuery } from 'react-query';

import { Category, CategoryList } from '@/app/movie/movies.types';

const categoriesKeys = {
  all: () => ['categoriesService'] as const,
  categories: () => [...categoriesKeys.all(), 'categories'] as const,
  category: ({ id }: { id?: number }) =>
    [...categoriesKeys.all(), 'category', { id }] as const,
};

export const useCategoriesList = (
  config: UseQueryOptions<
    CategoryList,
    AxiosError,
    CategoryList,
    InferQueryKey<typeof categoriesKeys.categories>
  > = {}
) => {
  return useQuery(
    categoriesKeys.categories(),
    (): Promise<CategoryList> => Axios.get('/categories'),
    {
      keepPreviousData: true,
      ...config,
    }
  );
};

export const useCategory = (
  categoryId?: number,
  config: UseQueryOptions<
    Category,
    AxiosError,
    Category,
    InferQueryKey<typeof categoriesKeys.category>
  > = {}
) => {
  const result = useQuery(
    categoriesKeys.category({ id: categoryId }),
    (): Promise<Category> => Axios.get(`/categories/${categoryId}`),
    {
      enabled: !!categoryId,
      ...config,
    }
  );
  return {
    category: result.data,
    ...result,
  };
};

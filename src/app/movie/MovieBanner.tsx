import React from 'react';

import {
  Badge,
  Box,
  Button,
  Center,
  CircularProgress,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import dayjs from 'dayjs';

import { useToastError } from '@/components';

import { useCategoriesList } from './categories.service';
import { useMoviesList } from './movies.service';
import { Category } from './movies.types';

export type MovieBannerProps = { movieId?: string };

export const MovieBanner: React.FC<MovieBannerProps> = ({ movieId }) => {
  const toastError = useToastError();

  const { data: movies, isLoading: isLoadingPage } = useMoviesList({
    onError: () => {
      toastError({ title: 'Something went wrong !' });
    },
    retry: 0,
  });

  const { data: categories } = useCategoriesList();

  const setDefaultBanner = () => {
    return movies?.content?.[movies?.totalItems - 1];
  };

  const setSelectedBanner = (movieId: string) => {
    return movies?.content?.find((movie) => movie.id === +movieId);
  };

  const movie = !!movieId ? setSelectedBanner(movieId!) : setDefaultBanner();

  const latest = (
    <Badge fontSize="lg" colorScheme="green" mt={2} ml={1}>
      <Center mt={0.5}>Latest</Center>
    </Badge>
  );
  if (isLoadingPage) {
    return (
      <Center>
        <CircularProgress isIndeterminate color="green.300" />
      </Center>
    );
  }

  return (
    <Box>
      <Flex direction="row">
        <Box flex={4}>
          <Flex mt={10}>
            <Heading>{movie?.title}</Heading>
            {!movieId ? latest : null}
          </Flex>
          <Flex>
            <Text fontSize="xl" mt={5} fontWeight={400}>
              {dayjs(movie?.releaseDate).format('D')}
            </Text>
            <Text fontSize="xl" mt={5} fontWeight={400} ml={2}>
              {dayjs(movie?.releaseDate).format('MMMM')}
            </Text>
            <Text fontSize="xl" mt={5} fontWeight={400} ml={2}>
              {dayjs(movie?.releaseDate).format('YYYY')}
            </Text>
          </Flex>
          <Text fontSize="xl" fontWeight={400} mt={2}>
            {movie?.duration} minutes
          </Text>
          <Text fontSize="xl" fontWeight={400} mt={2}>
            +{movie?.ageLimit} ans
          </Text>
          <Text fontSize="md" mt={8}>
            {movie?.description}
          </Text>
          <Divider orientation="horizontal" />
          <Text fontSize="xl" fontWeight={400} mt={5}>
            Acteurs
          </Text>
          <Text fontSize="lg" fontWeight={300} mt={1}>
            {movie?.actors}
          </Text>
          <Divider orientation="horizontal" />
          <Text fontSize="xl" fontWeight={400} mt={5}>
            Catégories
          </Text>
          <Flex flexDirection="row">
            {categories?.content.map((category: Category) => (
              <Center
                bgColor="green"
                borderRadius={5}
                mt={1}
                flex={1}
                margin={2}
              >
                <Text fontSize="lg" fontWeight={400}>
                  {category.name}
                </Text>
              </Center>
            ))}
          </Flex>
          <Center mt={10}>
            <Button colorScheme="teal" size="lg">
              Watch Now
            </Button>
          </Center>
        </Box>
        <Box flex={2}>
          <Image
            mt={10}
            borderRadius={10}
            src={
              'https://upload.wikimedia.org/wikipedia/en/3/31/Interceptor_%28film%29.jpg'
            }
          />
        </Box>
      </Flex>
    </Box>
  );
};

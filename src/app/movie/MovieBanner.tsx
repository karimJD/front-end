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

import { useMoviesList } from './movies.service';

export const MovieBanner = ({ movieId }: { movieId: undefined | number }) => {
  const toastError = useToastError();
  const { data: movies, isLoading: isLoadingPage } = useMoviesList({
    onError: () => {
      toastError({ title: 'Something went wrong !' });
    },
    retry: 0,
  });

  const setDefaultBanner = () => {
    return movies?.content?.[movies?.totalItems - 1];
  };
  const setSelectedBanner = (movieId: number) => {
    return movies?.content?.find((movie) => movie.id === movieId);
  };
  const checkIfDefaultMovie = () => {
    return !!movieId ? false : true;
  };

  const movie = !!movieId ? setSelectedBanner(movieId!) : setDefaultBanner();

  const latest = (
    <Badge fontSize="lg" colorScheme="green" mt={2} ml={1}>
      <Center mt={0.5}>Latest</Center>
    </Badge>
  );
  if (isLoadingPage) {
    return (
      <Center mt="20%">
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
            {checkIfDefaultMovie() ? latest : null}
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
          <Flex>
            <Box bgColor="green" borderRadius={5} w={100} mt={1}>
              <Center>
                <Text fontSize="lg" fontWeight={400}>
                  Romance
                </Text>
              </Center>
            </Box>
            <Box bgColor="green" borderRadius={5} w={100} mt={1} ml={2}>
              <Center>
                <Text fontSize="lg" fontWeight={400}>
                  Action
                </Text>
              </Center>
            </Box>
            <Box bgColor="green" borderRadius={5} w={100} mt={1} ml={2}>
              <Center>
                <Text fontSize="lg" fontWeight={400}>
                  Horror
                </Text>
              </Center>
            </Box>
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
            mr={0}
            h={400}
            w={300}
            src={
              'https://upload.wikimedia.org/wikipedia/en/3/31/Interceptor_%28film%29.jpg'
            }
          />
        </Box>
      </Flex>
    </Box>
  );
};

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
  Stack,
  Text,
} from '@chakra-ui/react';
import dayjs from 'dayjs';

import { useMoviesList } from './movies.service';

export const MovieBanner = ({ movieId }: { movieId: number }) => {
  const { data: movies, isLoading: isLoadingPage } = useMoviesList();

  // movieId is sent from moviesListBox to the slected movie, If the application just started, the defaul movie Id will be -1
  // -1 can't be assigned to a Id, so the application will know that there's no movie selected
  // when there's no movie selected the application will the latest movie uploaded.

  const movie =
    movieId === -1
      ? movies?.content?.[movies?.totalItems]
      : movies?.content?.find((movie) => movie.id === movieId);

  if (!!movies?.totalItems) {
    return (
      <Stack>
        {movies.content?.map((movie) => (
          <Box>
            {movie.id} - {movie.title}
          </Box>
        ))}
      </Stack>
    );
  }

  if (isLoadingPage) {
    return (
      <Center mt={200}>
        <CircularProgress isIndeterminate color="green.300" />
      </Center>
    );
  } else {
    return (
      <Box>
        <Flex direction="row">
          <Box flex={4}>
            <Flex>
              <Heading mt={5}>{movie?.title}</Heading>
              <Badge ml="1" mt={7} fontSize="lg" colorScheme="green">
                <Center mt={0.5}>Latest</Center>
              </Badge>
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
              src={`data:image/jpeg;base64,${movie?.image}`}
            />
          </Box>
        </Flex>
      </Box>
    );
  }
};

import React from 'react';

import {
  Box,
  Button,
  Center,
  CircularProgress,
  Divider,
  Flex,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import { useCategoriesList } from './categories.service';
import { useMovie } from './movies.service';
import { Category } from './movies.types';

export type MovieBannerProps = { movieId?: string };

export const MovieBanner: React.FC<MovieBannerProps> = ({ movieId }) => {
  const { data: movie, isLoading: isLoadingPage } = useMovie(Number(movieId));
  const { data: categories } = useCategoriesList();
  const navigate = useNavigate();

  if (isLoadingPage) {
    return (
      <Center flex={1}>
        <CircularProgress isIndeterminate color="green.300" />
      </Center>
    );
  }

  return (
    <Flex direction="row" flex={1}>
      <Box flex={4} padding={5}>
        <Button onClick={() => navigate('/movies')}>Go Back</Button>
        <Flex mt={5}>
          <Heading>{movie?.title}</Heading>
        </Flex>
        <VStack alignItems="left" spacing={5} mt={3}>
          <VStack alignItems="left" spacing={2}>
            <HStack alignItems="left">
              <Text fontSize="xl" fontWeight={400}>
                {dayjs(movie?.releaseDate).format('D')}
              </Text>
              <Text fontSize="xl" fontWeight={400}>
                {dayjs(movie?.releaseDate).format('MMMM')}
              </Text>
              <Text fontSize="xl" fontWeight={400}>
                {dayjs(movie?.releaseDate).format('YYYY')}
              </Text>
            </HStack>
            <Text fontSize="xl" fontWeight={400}>
              {movie?.duration} minutes
            </Text>
            <Text fontSize="xl" fontWeight={400}>
              +{movie?.ageLimit} ans
            </Text>
          </VStack>
          <VStack spacing={1}>
            <Text fontSize="md">{movie?.description}</Text>
            <Divider orientation="horizontal" />
          </VStack>
          <VStack spacing={1} alignItems="left">
            <Flex>
              <Text fontSize="xl" fontWeight={400}>
                Acteurs:
              </Text>
              <Text fontSize="lg" fontWeight={300} ml={2} mt={0.5}>
                {movie?.actors}
              </Text>
            </Flex>
            <Divider orientation="horizontal" />
          </VStack>
          <VStack spacing={1} alignItems="left">
            <Text fontSize="xl" fontWeight={400}>
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
          </VStack>
          <Center>
            <Button colorScheme="teal" size="lg">
              Watch Now
            </Button>
          </Center>
        </VStack>
      </Box>
      <Center flex={2}>
        <Image
          boxSize="sm"
          borderRadius={10}
          src={
            'https://upload.wikimedia.org/wikipedia/en/3/31/Interceptor_%28film%29.jpg'
          }
        />
      </Center>
    </Flex>
  );
};

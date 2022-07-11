import React from 'react';

import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
  Badge
} from '@chakra-ui/react';

import { useMoviesList } from './movies.service';

export const MovieBanner = ({ movieId }: { movieId: number}) => {
  let display: any = 'Just preventing error by this char';

  const { movies, isLoadingPage } = useMoviesList();

  const setMonth = (month: number) => {
    switch (month) {
      case 1:
        return 'january';

      case 2:
        return 'February';

      case 3:
        return 'March';

      case 4:
        return 'April';

      case 5:
        return 'May';

      case 6:
        return 'June';

      case 7:
        return 'July';

      case 8:
        return 'August';

      case 9:
        return 'September';

      case 10:
        return 'October';

      case 11:
        return 'November';

      case 12:
        return 'December';
    }
  };

  if (movieId === -1) {
    if (isLoadingPage === false) {
      display = movies![movies!.length - 1];
    }
  } else {
    movies?.map((movie) => {
      if (movie.id === movieId) {
        display = movie;
        let month = display.releaseDate.substr(5, 2);
        setMonth(month);
      }
    });
  }


  return (
    <Box>
      <Flex direction="row">
        <Box flex={4}>
          <Flex>
            <Heading mt={5}>
              {isLoadingPage ? 'loading...' : display.title}
            </Heading>
            <Badge ml='1' mt={7} fontSize='lg' colorScheme='green'>
              <Center mt={0.5}>Latest</Center>
            </Badge>
          </Flex>
          <Flex>
              <Text fontSize="xl" mt={5} fontWeight={400}>
                {isLoadingPage
                  ? 'loading...'
                  : display.releaseDate.substr(8, 2)}
              </Text>
              <Text fontSize="xl" mt={5} fontWeight={400} ml={2}>
                {isLoadingPage
                  ? 'loading...'
                  : setMonth(parseInt(display.releaseDate.substr(5, 2), 10))}
              </Text>
              <Text fontSize="xl" mt={5} fontWeight={400} ml={2}>
                {isLoadingPage
                  ? 'loading...'
                  : display.releaseDate.substr(0, 4)}
              </Text>
          </Flex>
          <Text fontSize="xl" fontWeight={400} mt={2}>
            {isLoadingPage ? 'loading...' : display.duration} minutes
          </Text>
          <Text fontSize="xl" fontWeight={400} mt={2}>
            +{isLoadingPage ? 'loading...' : display.ageLimit} ans
          </Text>
          <Text fontSize="md" mt={8}>
            {isLoadingPage ? 'loading...' : display.description}
          </Text>
          <Divider orientation="horizontal" />
            <Text fontSize="xl" fontWeight={400} mt={5}>Acteurs</Text>
            <Text fontSize="lg" fontWeight={300} mt={1}>
              {isLoadingPage ? 'loading...' : display.actors}
            </Text>
          <Divider orientation="horizontal" />
              <Text fontSize="xl" fontWeight={400} mt={5}>Catégories</Text>
              <Flex>
              <Box bgColor='green' borderRadius={5} w={100}  mt={1}>
                <Center>
                  <Text fontSize="lg" fontWeight={400}>
                    Romance
                  </Text>
                </Center>
              </Box>
              <Box bgColor='green' borderRadius={5} w={100}  mt={1} ml={2}>
                <Center>
                  <Text fontSize="lg" fontWeight={400}>
                    Action
                  </Text>
                </Center>
              </Box>
              <Box bgColor='green' borderRadius={5} w={100}  mt={1} ml={2}>
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
            src={`data:image/jpeg;base64,${display.image}`}
          />
        </Box>
      </Flex>
    </Box>
  );
};

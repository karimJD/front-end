import React from 'react';

import { Box, Center, Heading, Image, Stack, Text } from '@chakra-ui/react';

import { Movie } from '@/app/movie/movies.types';

import { useCategoriesList } from './categories.service';
import { useMoviesList } from './movies.service';

export const MoviesListBox = ({ setMovieId, categoryId }: any) => {
  const { data: movies } = useMoviesList();
  const { categories }: any = useCategoriesList();

  console.log({ movies, categories });

  const getTitle = (categoryId: number) => {
    switch (categoryId) {
      case 1:
        return 'Action';
      case 4:
        return 'Drama';
      case 5:
        return 'Comedy';
      case 3:
        return 'SiFi';
      case 2:
        return 'Horror';
    }
  };

  const handleImgClick = (id: number) => {
    setMovieId({ ...categoryId, id: id });
    setMovieId({ ...categoryId, state: true });
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  };

  // let selectedCategory = categories.filter(
  //   (category: any) => category.id === categoryId
  // );

  // selectedCategory.map((category: any) =>
  //   category.movies.map((CategoryMovie: any) =>
  //     movies?.content?.map((movie) => {
  //       if (movie.id === CategoryMovie.id) {
  //         categoryMovies.push(movie);
  //       }
  //     })
  //   )
  // );

  const categoryMovies: Movie[] = [];

  return (
    <Box mt={100}>
      <Heading size="lg">{getTitle(categoryId)}</Heading>
      <Stack spacing={4} direction="row" mt={10} overflowY="scroll">
        {categoryMovies?.map((movie) => (
          <>
            <Box
              key={movie.id}
              h={350}
              w={300}
              borderRadius={10}
              overflowY="scroll"
            >
              <Center>
                <Image
                  src={`data:image/jpeg;base64,${movie.image}`}
                  alt="Alt triggered"
                  h={60}
                  _hover={{ transform: 'scale(1.2)', cursor: 'pointer' }}
                  onClick={() => handleImgClick(movie.id)}
                />
              </Center>
              <Center>
                <Text mt={6} fontSize="lg">
                  {movie.title}
                </Text>
              </Center>
            </Box>
          </>
        ))}
      </Stack>
    </Box>
  );
};

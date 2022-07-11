import React from 'react';

import { Box, Center, Heading, Image, Stack, Text } from '@chakra-ui/react';

import { useMoviesList } from './movies.service';
import { useCategoriesList } from './categories.service';


export const MoviesListBox = ({setMovieId, categoryId}: any) => {

  let categoryMovies: any= [];
  let title;

  const { movies } = useMoviesList();
  const { categories }: any = useCategoriesList();

  switch (categoryId) {
    case 1:
      title = "Action";
      break;
    case 4:
      title = "Drama";
      break;
    case 5:
      title = "Comedy";
      break;
    case 3:
      title = "SiFi";
      break;
    case 2:
      title = "Horror";
      break;
  }

  const handleImgClick = (id: number) => {
    setMovieId(id);
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

  let selectedCategory = categories.filter((category: any) => (category.id === categoryId))

  selectedCategory.map((category: any) => (
      category.movies.map((CategoryMovie: any) => (
        movies?.map(movie => {
          if (movie.id === CategoryMovie.id) { 
            categoryMovies.push(movie);
          }
        }) 
      ))
    ))
  
  
  return (
    <Box mt={100}>
      <Heading size='lg'>{title}</Heading>
      <Stack spacing={4} direction="row" mt={10} overflowY="scroll">
        {categoryMovies?.map((movie: any) => (
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

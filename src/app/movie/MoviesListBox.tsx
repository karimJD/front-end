import React, { useRef } from 'react';

import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Box, Center, Flex, Heading, Image, Text } from '@chakra-ui/react';

import { useCategoriesList } from './categories.service';
import { useMoviesList } from './movies.service';

export const MoviesListBox = ({ setMovieId, categoryId }: any) => {
  const { data: movies, isLoading: isLoadingPage } = useMoviesList();
  const { categories }: any = useCategoriesList();
  const slider: any = useRef(null);

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

  const scroll = (scrollOffset: number) => {
      slider.current!.scrollLeft += scrollOffset;
  };
  
  const handleImgClick = (id: number) => {
    setMovieId(id);
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  };

  return (
    <Box mt={100}>
      <Heading size="lg" ml={5}>{getTitle(categoryId)}</Heading>
      <Box h={360} w="90%">
        <Flex
          ref={slider}
          h={370}
          flexDirection="row"
          mt={5}
          overflow="scroll"
          whiteSpace="nowrap"
          textAlign="center"
          alignItems="center"
           
        >
          {movies?.content.map((movie) => (
            <Box margin={2} w={300} h={350}>
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXCDeWcTDLEWXq-hhpO5gUZh-rB0QNhSLvCRwUfPk1Vft1tBSH"
                w={200}
                h={300}
                borderRadius={20}
                _hover={{ cursor: 'pointer' }}
                onClick={() => handleImgClick(movie.id)}
              />
              <Center w={200} mt={3}>
                <Heading size='md'>{movie.title}</Heading>
              </Center>
            </Box>
          ))}
        </Flex>
        <ArrowLeftIcon mt={-450} ml={-10} onClick={() => scroll(-500)} />
        <ArrowRightIcon mt={-450} ml={950} onClick={() => scroll(500)}/>
      </Box>
    </Box>
  );
};

import React, { useRef } from 'react';

import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Box, Center, Flex, Heading, Image } from '@chakra-ui/react';

import { useCategory } from './categories.service';
import { useMoviesList } from './movies.service';

export const MoviesListBox = ({
  setMovieId,
  categoryId,
}: {
  setMovieId: (movieId: number) => void | undefined;
  categoryId: number;
}) => {
  const { data: movies } = useMoviesList();
  const { category } = useCategory(categoryId);
  const slider = useRef<HTMLDivElement>(null);

  const scroll = (scrollOffset: number) => {
    slider.current!.scrollLeft += scrollOffset;
  };

  const handleImgClick = (id: number) => {
    setMovieId(id);
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  };

  return (
    <Box mt={50}>
      <Heading size="lg" ml={5}>
        {category?.name}
      </Heading>
      <Flex flexDirection="row">
        <Center flex={1}>
          <ArrowLeftIcon onClick={() => scroll(-500)} />
        </Center>
        <Flex
          flex={10}
          ref={slider}
          flexDirection="row"
          mt={5}
          overflow="scroll"
          whiteSpace="nowrap"
          textAlign="center"
          alignItems="center"
        >
          {movies?.content.map((movie) => (
            <Box margin={2}>
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXCDeWcTDLEWXq-hhpO5gUZh-rB0QNhSLvCRwUfPk1Vft1tBSH"
                borderRadius="lg"
                _hover={{ cursor: 'pointer' }}
                onClick={() => handleImgClick(movie.id)}
              />
              <Center w={200} mt={3}>
                <Heading size="md">{movie.title}</Heading>
              </Center>
            </Box>
          ))}
        </Flex>
        <Center flex={1}>
          <ArrowRightIcon onClick={() => scroll(500)} />
        </Center>
      </Flex>
    </Box>
  );
};

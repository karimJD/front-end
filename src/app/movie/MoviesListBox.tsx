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
    <Box mt={100}>
      <Heading size="lg" ml={5}>
        {category?.name}
      </Heading>
      <Flex h={400} w="100%" flexDirection="row">
        <ArrowLeftIcon flex={1} mt="20%" onClick={() => scroll(-500)} />
        <Flex
          flex={10}
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
                <Heading size="md">{movie.title}</Heading>
              </Center>
            </Box>
          ))}
        </Flex>
        <ArrowRightIcon flex={1} mt="20%" onClick={() => scroll(500)} />
      </Flex>
    </Box>
  );
};

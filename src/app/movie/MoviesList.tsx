import React, { ChangeEvent, useState } from 'react';

import {
  Center,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Skeleton,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

import { useCategory } from './categories.service';
import { useMoviesList } from './movies.service';
import { Movie } from './movies.types';

export const MoviesList = ({
  onMovieClick,
  categoryId,
}: {
  onMovieClick: (movieId: number) => void | undefined;
  categoryId?: number;
}) => {
  const { data: movies } = useMoviesList();
  const { category, isLoading: categoryLoading } = useCategory(categoryId);
  const [inputText, setInputText] = useState('');

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const lowerCase = event.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  const filteredData: Array<Movie> | undefined = movies?.content.filter(
    (movies) => {
      if (!!inputText) {
        return movies.title.toLowerCase().includes(inputText);
      } else {
        return movies;
      }
    }
  );

  return (
    <>
      <Flex direction="column">
        <Skeleton isLoaded={!categoryLoading} flex={1} noOfLines={1}>
          <Heading size="lg" p={2}>
            {!!categoryId ? category?.name : 'Action'}
          </Heading>
        </Skeleton>
        <InputGroup flex={1} pt={1}>
          <Input placeholder="Search movie.." onChange={inputHandler} />
          <InputRightElement
            children={<FaSearch name="AddIcon" color="green.500" />}
          />
        </InputGroup>
        <Wrap spacing={6} flex={30} justify="center">
          {filteredData?.map((movie: Movie) => (
            <WrapItem key={movie.id} p={3}>
              <VStack spacing={1} _hover={{ transform: 'scale(1.1)' }}>
                <Image
                  w={150}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXCDeWcTDLEWXq-hhpO5gUZh-rB0QNhSLvCRwUfPk1Vft1tBSH"
                  borderRadius="lg"
                  _hover={{ cursor: 'pointer' }}
                  onClick={() => onMovieClick(movie.id)}
                />
                <Center>
                  <Heading size="sm">{movie.title}</Heading>
                </Center>
              </VStack>
            </WrapItem>
          ))}
        </Wrap>
      </Flex>
    </>
  );
};

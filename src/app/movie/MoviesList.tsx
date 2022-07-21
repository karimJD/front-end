import React, { ChangeEvent, useState } from 'react';

import {
  Center,
  CircularProgress,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
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
  const { data: movies, isLoading } = useMoviesList();
  const { category } = useCategory(categoryId);
  const [inputText, setInputText] = useState('');

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const lowerCase = target.value.toLowerCase();
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

  if (isLoading) {
    return (
      <Center flex="1">
        <CircularProgress isIndeterminate color="green.300" />
      </Center>
    );
  }

  return (
    <>
      <Heading size="lg" p={2}>
        {!!categoryId ? category?.name : 'Action'}
      </Heading>
      <InputGroup>
        <Input placeholder="Search movie.." onChange={inputHandler} />
        <InputRightElement
          children={<FaSearch name="AddIcon" color="green.500" />}
        />
      </InputGroup>
      <Wrap spacing={6} mt={3}>
        {filteredData?.map((movie: any) => (
          <WrapItem key={movie.id}>
            <VStack spacing={1} _hover={{ transform: 'scale(1.2)' }}>
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
    </>
  );
};

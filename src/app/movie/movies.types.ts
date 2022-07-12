export type Movie = {
    id: number,
    title: string,
    duration: number,
    ageLimit: number,
    description: string,
    actors: string,
    releaseDate: Date,
    image: string
};

export type Category = { 
    id: number;
    movies: Movie[];
}

export type CategoryList = { 
  content: Category[];
  totalItems: number;
}

export type MovieList = {
  content: Movie[];
  totalItems: number;
};
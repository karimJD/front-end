import React from 'react';

import { Nav, NavGroup, NavItem } from '@/components';

import { useCategoriesList } from './categories.service';

export const MovieNav = ({
  setCategoryId,
  setShowMovies,
}: {
  setCategoryId: (categoryId: number) => void;
  setShowMovies: (showMovies: boolean) => void;
}) => {
  const { data: categories } = useCategoriesList();

  const onCategoryChange = (categoryId: number) => {
    setCategoryId(categoryId);
    setShowMovies(true);
    window.scrollTo({ left: 0, top: 500, behavior: 'smooth' });
  };
  return (
    <Nav>
      <NavGroup>
        {categories?.content.map((category) => (
          <NavItem onClick={() => onCategoryChange(category.id)}>
            {category.name}
          </NavItem>
        ))}
      </NavGroup>
    </Nav>
  );
};

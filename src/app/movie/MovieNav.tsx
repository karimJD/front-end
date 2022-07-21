import React from 'react';

import { Nav, NavGroup, NavItem } from '@/components';

import { useCategoriesList } from './categories.service';

export const MovieNav = ({
  setCategoryId,
}: {
  setCategoryId: (categoryId: number) => void;
}) => {
  const { data: categories } = useCategoriesList();

  const onCategoryChange = (categoryId: number) => {
    setCategoryId(categoryId);
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

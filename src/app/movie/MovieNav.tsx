import React from 'react';

import { Nav, NavGroup, NavItem } from '@/components';

import { useCategoriesList } from './categories.service';

export const MovieNav = ({
  setCategoryId,
  setIsCalled,
}: {
  setCategoryId: (categoryId: number) => void;
  setIsCalled: (isCalled: boolean) => void;
}) => {
  const { data: categories } = useCategoriesList();

  console.log(categories);
  const handleClick = (categoryId: number) => {
    setCategoryId(categoryId);
    setIsCalled(true);
    window.scrollTo({ left: 0, top: 500, behavior: 'smooth' });
  };

  return (
    <Nav>
      <NavGroup>
        <NavItem onClick={() => handleClick(1)}>Action</NavItem>
        <NavItem onClick={() => handleClick(4)}>Drama</NavItem>
        <NavItem onClick={() => handleClick(5)}>Comedy</NavItem>
        <NavItem onClick={() => handleClick(3)}>Sifi</NavItem>
        <NavItem onClick={() => handleClick(2)}>Horror</NavItem>
      </NavGroup>
    </Nav>
  );
};

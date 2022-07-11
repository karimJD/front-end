import React from 'react';

// import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';

import { Nav, NavGroup, NavItem } from '@/components';

export const MovieNav = ({setCategoryId}: any) => {
 // const { t } = useTranslation();

 const handleClick = (categoryId: number) => {
  setCategoryId(categoryId);
  window.scrollTo({ left: 0, top: 500, behavior: "smooth" });
 }

  return (
    <Nav>
      <NavGroup>
        <NavItem
        onClick={() => handleClick(1)}
        >
          Action
        </NavItem>
        <NavItem
        onClick={() => handleClick(4)}
        >
          Drama
        </NavItem>
        <NavItem
        onClick={() => handleClick(5)}
        >
          Comedy
        </NavItem>
        <NavItem
        onClick={() => handleClick(3)}
          //as={Link}
          //to="/admin/api"
          //isActive={isActive('/admin/api')}
        >
          Sifi
        </NavItem>
        <NavItem
        onClick={() => handleClick(2)}
          //isActive={isActive('/admin/api')}
        >
          Horror
        </NavItem>
      </NavGroup>
    </Nav>
  );
};

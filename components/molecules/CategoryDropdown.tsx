import React from 'react';
import { Dropdown } from '@/components/atoms/Dropdown';
import type { DropdownProps } from '@/types';

export const CategoryDropdown = (props: DropdownProps) => {
  return <Dropdown {...props} />;
};
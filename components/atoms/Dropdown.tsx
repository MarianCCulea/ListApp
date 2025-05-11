import React from 'react';
import { Dropdown as RneDropdown } from 'react-native-element-dropdown';
import { StyleSheet } from 'react-native'; 
import type { Category, DropdownProps } from '@/types';

export const Dropdown = ({
  data,
  selected,
  onSelect,
  placeholder = 'Select category',
}: DropdownProps) => {
  return (
    <RneDropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      data={data}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      value={selected}
      onChange={(item: Category) => onSelect(item.value)}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#9e9e9e',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});
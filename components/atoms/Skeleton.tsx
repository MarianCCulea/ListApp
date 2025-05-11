import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';

export const Skeleton = ({ width, height, style }: { width?: number | string; height?: number | string; style?: any }) => {
  const theme = useColorScheme();
  const bgColor = theme === 'dark' ? '#333' : '#e1e1e1';
  
  return (
    <View 
      style={[
        { 
          width, 
          height, 
          backgroundColor: bgColor,
          borderRadius: 4,
        },
        styles.container,
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});
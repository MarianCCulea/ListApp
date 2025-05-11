import { View, StyleSheet } from 'react-native';
import { Skeleton } from '@/components/atoms/Skeleton';
import React from 'react';

export const ProductCardSkeleton = () => (
  <View style={styles.container}>
    <Skeleton width={80} height={80} style={styles.image} />
    <View style={styles.textContainer}>
      <Skeleton width="70%" height={16} />
      <Skeleton width="40%" height={14} style={styles.price} />
      <Skeleton width="30%" height={12} style={styles.category} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  image: {
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  price: {
    marginTop: 8,
  },
  category: {
    marginTop: 6,
  },
});
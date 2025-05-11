import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { FilteredProductList } from '@/components/organisms/FilteredProductList';
import React = require('react');

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default function TabtwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FilteredProductList />
    </View>
  );
}
import { useState, useEffect, useMemo, useCallback } from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import { CategoryDropdown } from '@/components/molecules/CategoryDropdown';

import { Product, ProductListScreenProps } from '@/types';
import products from '@/mock-products';
import { Image } from '@/components/atoms/Image';

import React from 'react';

const PRODUCT_PER_PAGE = 20;
const FAKE_API_DELAY_MS = 1000;
const FAILURE_RATE = 1.0;

const styles = StyleSheet.create({
container: { flex: 1, padding: 16 },
category: { color: 'gray', fontSize: 12 },
image: {
  width: 80,
  height: 80,
  borderRadius: 8,
  marginRight: 16,
},
item: { padding: 16, borderBottomWidth: 1, borderColor: '#eee' },
error: { color: 'red', textAlign: 'center', padding: 16 },
noMore: { textAlign: 'center', padding: 16, color: '#888' }
});

export const FilteredProductList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  
  //API states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  // Fake API fetch
  const fetchProducts = useCallback(async (page: number, selectedCategory: string = '') => {
    console.log(`Fetching page ${page} with category: ${selectedCategory || 'all'}`);
    setIsLoading(true);
    setError(null);
    
    try {
      // Fake network delay
      await new Promise(resolve => setTimeout(resolve, FAKE_API_DELAY_MS));
      if (Math.random() < FAILURE_RATE) {
        throw new Error('API request failed (simulated)');
      }
      const filtered = selectedCategory 
      ? products.filter(p => p.category === selectedCategory)
      : [...products];

      const startIndex = (page - 1) * PRODUCT_PER_PAGE;
      const endIndex = startIndex + PRODUCT_PER_PAGE;
      const nextItems: Product[] = filtered.slice(startIndex, startIndex + PRODUCT_PER_PAGE);
      
      setDisplayedProducts(prev => [...prev, ...nextItems]);
      setHasMore(endIndex < products.length);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((p) => p.category))
    );
    return [
      { value: '', label: 'All Categories' },
      ...uniqueCategories.map((c) => ({ value: c, label: c })),
    ];
  }, [products]);

  useEffect(() => {
    setCurrentPage(1);
    setDisplayedProducts([]);
    fetchProducts(1, selectedCategory);
  }, [selectedCategory]);

  // Load more handler
  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      fetchProducts(currentPage + 1);
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, isLoading, hasMore, fetchProducts]);

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.item}>
      <Image 
      source={{ uri: item.image }} 
      style={styles.image}
    />
      <Text>{item.title}</Text>
      <Text style={styles.category}>{item.category}</Text>
      <Text>${item.price}</Text>
    </View>
  );

  const renderFooter = () => {
    if (isLoading) return <ActivityIndicator size="small" />;
    if (error) return <Text style={styles.error}>{error}</Text>;
    if (!hasMore) return <Text style={styles.noMore}>No more products</Text>;
    return null;
  };
  
  return (
    <View style={styles.container}>
      <CategoryDropdown
      data={categories}
      selected={selectedCategory}
      onSelect={setSelectedCategory}
      />

      <FlatList
        data={displayedProducts}
        renderItem={renderItem}
        keyExtractor={(item: Product) => item.id.toString()}
        onEndReached={() => {
          handleLoadMore();
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          !isLoading ? <Text>No products found</Text> : null
        }
      />
    </View>
  );
};
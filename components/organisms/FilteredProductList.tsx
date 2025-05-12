import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import { CategoryDropdown } from '@/components/molecules/CategoryDropdown';



import { Product, ProductListScreenProps } from '@/types';
import products from '@/mock-products';
import { Image } from '@/components/atoms/Image';
import { EmptyState } from '../molecules/EmptyState';

const PRODUCT_PER_PAGE = 50;
const FAKE_API_DELAY_MS = 3000;
const FAILURE_RATE = 0.5;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  category: { color: 'gray', fontSize: 12 },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  item: {
    height: 100,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center'
  },error: { color: 'red', textAlign: 'center', padding: 16 },
  noMore: { textAlign: 'center', padding: 16, color: '#888' }
});

export const FilteredProductList = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
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
        console.log('API failed');

        throw new Error('API request failed (simulated)');
      }
      console.log('Products fetched successfully');
      const filtered = selectedCategory 
      ? products.filter(p => p.category === selectedCategory)
      : [...products];

      const startIndex = (page) * PRODUCT_PER_PAGE;
      const endIndex = startIndex + PRODUCT_PER_PAGE;
      const nextItems: Product[] = filtered.slice(startIndex, endIndex);

      setCurrentPage(page + 1);
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
    setDisplayedProducts([]);
    fetchProducts(0, selectedCategory);
  }, [selectedCategory]);

  // Load more handler
  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      fetchProducts(currentPage, selectedCategory);
    }
  }, [isLoading, hasMore, fetchProducts]);

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

  //Should be ProductCard
  const ProductItem = React.memo(({ item }: { item: Product }) => (
    <View style={styles.item}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.image}
      />
      <View>
        <Text numberOfLines={1}>{item.title}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text>${item.price}</Text>
      </View>
    </View>
  ));
  

  const handleRetry = () => {
    fetchProducts(currentPage, selectedCategory);
  };

  const renderFooter = () => {
    if (isLoading) return <ActivityIndicator style={{ padding: 20 }} />;
    if (error) return <EmptyState message={error} onRetry={handleRetry} />;
    if (!hasMore && displayedProducts.length > 0) {
      return <Text style={styles.noMore}>No more products</Text>;
    }
    return null;
  };

  const renderContent = () => {
    if (isLoading && displayedProducts.length === 0) {
      return <ActivityIndicator size="large" />;
    }
    
    if (displayedProducts.length === 0) {
      return (
        <EmptyState 
          message={selectedCategory 
            ? `No products in ${selectedCategory} category`
            : "No products available"
          } 
          onRetry={handleRetry}
        />
      );
    }

    return (
      <FlatList
        data={displayedProducts}
        renderItem={({ item }) => <ProductItem item={item} />}
        keyExtractor={(item: Product) => item.id.toString()}
        getItemLayout={(data, index) => ({
          length: 100,
          offset: 100 * index,
          index,
        })}
        initialNumToRender={10} // Adjust based on screen size
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        windowSize={5}
        onEndReached={() => {
          handleLoadMore();
        }}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderFooter}
      />
    );
  };
  
  return (
    <View style={styles.container}>
      <CategoryDropdown
      data={categories}
      selected={selectedCategory}
      onSelect={setSelectedCategory}
      />

      {renderContent()}
    </View>
  );
};
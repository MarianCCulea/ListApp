import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export const EmptyState = ({ 
  message, 
  onRetry 
}: {
  message: string;
  onRetry?: () => void;
}) => (
  <View style={styles.container}>
    <Text style={styles.text}>{message}</Text>
    {onRetry && (
      <Button title="Try Again" onPress={onRetry} />
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center'
  }
});
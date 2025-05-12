import React from "react";
import { ActivityIndicator, ImageStyle, StyleProp, StyleSheet,Image, View, Text, ViewStyle } from "react-native";

import  products from "@/mock-products"
import type { Product, ProductListScreenProps } from '@/types';

import { useState, useEffect } from 'react';
import { FlatList} from 'react-native';


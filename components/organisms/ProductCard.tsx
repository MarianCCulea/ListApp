import React from "react";
import { ActivityIndicator, ImageStyle, StyleProp, StyleSheet,Image, View, Text, ViewStyle } from "react-native";

import  products from "@/mock-products"
import type { Product, ProductListScreenProps } from '@/types';

import { useState, useEffect } from 'react';
import { FlatList} from 'react-native';
import FastImage, { FastImageProps, Source } from "react-native-fast-image";

import EditScreenInfo from '@/components/EditScreenInfo';

// interface BrandCardProps {
//   item: BrandCardType;
//   cardWidth?: number;
//   containerStyle?: StyleProp<ViewStyle>;
//   onPress?: () => void;
//   imageOverlay?: string;
//   bottomText?: string;
//   imageStyle?: StyleProp<ImageStyle>;
//   testID?: string;
// }

const PAGE_SIZE = 20;


const ProductListScreen: React.FC<ProductListScreenProps> = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  
    const loadMoreProducts = (page: number): void => {
      const startIndex = (page - 1) * PAGE_SIZE;
      const nextItems: Product[] = products.slice(startIndex, startIndex + PAGE_SIZE);
      setDisplayedProducts(prev => [...prev, ...nextItems]);
    };
  
    useEffect(() => {
      console.log('Products data:', products); 
  
      loadMoreProducts(1);
    }, []);
  
    const renderItem = ({ item }: { item: Product }) => (
      <View style={styles.item}>
        <Text>{item.title}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text>${item.price}</Text>
      </View>
    );
  
    return (
      <View style={styles.container}>
        <FlatList
          data={displayedProducts}
          renderItem={renderItem}
          keyExtractor={(item: Product) => item.id.toString()}
          onEndReached={() => {
            loadMoreProducts(currentPage + 1);
            setCurrentPage(prev => prev + 1);
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => <ActivityIndicator size="small" color="#000" />}
        />
      </View>
    );
  };


// export const BrandCard: React.FC<BrandCardProps> = ({
//   item,
//   containerStyle,
//   onPress,
//   imageOverlay,
//   bottomText,
//   imageStyle,
//   testID,
// }) => {
//   const { isCreatorModeEnabled } = useAppSelector((state) => state.creatorMode);

//   const creatorCommission = isCreatorModeEnabled && item?.creatorCommission;

//   return (
//     <ButtonWithOpacity
//       style={[styles.container, cardsShadow, containerStyle]}
//       onPress={onPress}
//       testID={testID}
//     >
//       <ImageWithOverlay
//         imgUri={item?.logo ? getImageSrcWithParams(item.logo, Preset.AVATAR) : WISH_DEFAULT_COVER}
//         overlayColor={imageOverlay ? imageOverlay : Colors.Transparent}
//         containerStyle={[styles.imgContainer, item?.logo ? styles.smallImg : undefined, imageStyle]}
//         radius={12}
//         imgResizeType={item?.logo ? "contain" : "cover"}
//         imgStyle={item?.logo ? styles.img : undefined}
//       />
//       {typeof creatorCommission === "number" && creatorCommission > 0 && (
//         <>
//           <View style={[commissionFlapContainer, styles.commissionFlapContainer]} />
//           <CustomText style={styles.commissionText}>{creatorCommission}%</CustomText>
//         </>
//       )}
//       {bottomText && <CustomText style={styles.text}>{bottomText}</CustomText>}
//     </ButtonWithOpacity>
//   );
// };

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    minWidth: 70,
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  item: { padding: 16, borderBottomWidth: 1, borderColor: '#eee' },
  category: { color: 'gray', fontSize: 12 },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  imgContainer: {
    width: "100%",
    height: 70,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },
  smallImg: {
    width: "90%",
  },
  text: {
    textAlign: "center",
    color: "#B8BEC7",
    marginTop: 9,
  },
});

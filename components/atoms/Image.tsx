import { ImageProps } from 'expo-image';
import React from 'react';
import { Image as ExpoImage } from 'expo-image';


export const Image = (props: ImageProps) => (
  <ExpoImage
    {...props}
    recyclingKey={props.source && typeof props.source === 'object' && 'uri' in props.source ? props.source.uri : undefined}
    placeholder={require('@/assets/images/favicon.png')}
    contentFit="contain"
    transition={300}
  />
);
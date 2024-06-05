import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, Text, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

import { THEME } from '../theme';
import { api } from '@services/api';

interface Item {
  path: string;
  id: string;
}

interface MyCarouselProps {
  data: Item[];
}

export const MyCarousel: React.FC<MyCarouselProps> = ({ data }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const numOfPhotos = data.length;

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.item}>
      <Image source={{ uri: `${api.defaults.baseURL}/images/${item.path}` }} style={styles.image} />
      {/* <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text> */}
    </View>
  );

  return (
    <View style={{ height: (screenHeight) / 3 }}>
      <Carousel
        width={screenWidth}
        height={screenHeight / 3}
        data={data}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveSlide(index)}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
      />
      <View style={styles.paginationContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dotStyle,
              {
                opacity: activeSlide === index ? 1 : 0.4,
                width: (screenWidth * 0.6) / numOfPhotos,
              },
            ]}
          />

        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: screenWidth,
    height: screenHeight / 3,
    // backgroundColor: 'red',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  // title: {
  //   position: 'absolute',
  //   bottom: 10,
  //   left: 10,
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   color: 'black',
  //   backgroundColor: 'rgba(255,255,255,0.3)',
  //   padding: 5,
  //   borderRadius: 5,
  // },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
    height: 10,
  },
  dotStyle: {
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: THEME.colors.blue_light,
  },
});

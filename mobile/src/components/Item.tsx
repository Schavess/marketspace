import React from 'react';
import { Image, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { Box, Text, VStack, HStack, Badge, Avatar } from 'native-base';

import { THEME } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { api } from '@services/api';

interface ItemProps {
  product_images: { path: string, id: string }[];
  userAvatar: string;
  is_new: boolean;
  is_active: boolean;
  name: string;
  price: number;
}

export function Item({ product_images, userAvatar, is_new, is_active, name, price }: ItemProps) {
  const navigation = useNavigation<any>();

  const isMineAd = true;

  function handleClickItem() {
    if (isMineAd) {
      navigation.navigate('myaddetail');
    } else {
      navigation.navigate('addetail');
    }
  }

  return (
    <TouchableOpacity onPress={handleClickItem}>
      <Box
        borderRadius="lg"
        overflow="hidden"
        height={'250px'}
        width={'180px'}
        borderColor="coolGray.200"
        shadow="3"
        bg='white'
        m="1"
      >
        <Image source={{ uri: product_images[0]?.path ? `${api.defaults.baseURL}/images/${product_images[0].path}` : '' } as ImageSourcePropType} alt={name} style={{ width: '100%', height: 150 }} onError={(error) => console.log(error)} />
        {!is_active && (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={'40%'}
            bg="black"
            opacity={0.5}
          />
        )}
        <HStack position="absolute" top="2" left="2">
          <Avatar
            source={{ uri: userAvatar } as ImageSourcePropType}
            size="sm"
            borderWidth={2}
            borderColor="white"
          />
        </HStack>
        {!is_active && (
          <Badge
            backgroundColor={'transparent'}
            position="absolute"
            top="20%"
            left='20%'
            _text={{
              fontWeight: 'bold',
            }}
          >
            <Text fontSize={'sm'} fontFamily={'heading'} color={'white'}>
              ANÚNCIO DESATIVADO
            </Text>
          </Badge>
        )}
        <Badge
          backgroundColor={is_new ? THEME.colors.blue_light : THEME.colors.gray[300]}
          position="absolute"
          borderRadius={10}
          top="2"
          right="2"
          _text={{
            fontSize: 12,
            fontWeight: 'bold',
          }}
        >
          <Text fontFamily={'heading'} color={'white'}>
            {is_new ? 'NOVO' : 'USADO'}
          </Text>
        </Badge>
        <VStack space={1} p="1">
          <Text fontSize="lg" fontFamily={'body'} color="gray.100">
            {name}
          </Text>
          <HStack alignItems={'baseline'}>
            <Text fontSize="md" fontFamily={'heading'} color="black">
              R$
            </Text>
            <Text pl={1.5} fontSize="lg" fontFamily={'heading'} color="black">
              {price}
            </Text>
          </HStack>
        </VStack>
      </Box>
    </TouchableOpacity>
  );
}

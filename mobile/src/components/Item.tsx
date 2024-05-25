import { Image, ImageSourcePropType } from 'react-native';
import { Box, Text, VStack, HStack, Badge, Avatar } from 'native-base';

type ItemProps = {
  itemName: string;
  imageUrl: string;
  userAvatar: string;
  status: string;
  price: string;
};

import { THEME } from '../theme';

export function Item({ imageUrl, userAvatar, status, itemName, price }: ItemProps) {

  return (
    <>
      <Box
        borderRadius="lg"
        overflow="hidden"
        height={'250px'}
        borderColor="coolGray.200"
        shadow="3"
        bg="white"
        m="1"
      >
        <Image source={{ uri: imageUrl } as ImageSourcePropType} alt={itemName} style={{ width: '100%', height: 150 }} />
        <HStack position="absolute" top="2" left="2">
          <Avatar
            source={{ uri: userAvatar } as ImageSourcePropType}
            size="sm"
            borderWidth={2}
            borderColor="white"
          />
        </HStack>
        <Badge
          backgroundColor={status === 'USADO' ? THEME.colors.gray[300] : THEME.colors.blue_light}
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
            {status}
          </Text>
        </Badge>
        <VStack space={1} p="1">
          <Text fontSize="lg" fontFamily={'body'} color="gray.100">
            {itemName}
          </Text>
          <HStack alignItems={'baseline'} >
            <Text fontSize="md" fontFamily={'heading'} color="black">
              R$
            </Text>
            <Text pl={1.5} fontSize="lg" fontFamily={'heading'} color="black">
              {price}
            </Text>
          </HStack>
        </VStack>
      </Box>
    </>
  )
}
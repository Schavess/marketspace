import { Image, ImageSourcePropType } from 'react-native';
import { Box, Text, VStack, HStack, Badge, Avatar } from 'native-base';

type ItemProps = {
  itemName: string;
  imageUrl: string;
  userAvatar: string;
  status: string;
  price: string;
};

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
          <Avatar source={{ uri: userAvatar } as ImageSourcePropType} size="sm" />
        </HStack>
        <Badge
          colorScheme="amber"
          position="absolute"
          top="2"
          right="2"
          _text={{
            fontSize: 12,
            fontWeight: 'bold',
          }}
        >
          {status}
        </Badge>
        <VStack space={1} p="1">
          <Text fontSize="lg" fontFamily={'heading'} color="gray.100">
            {itemName}
          </Text>
          <Text fontSize="md" color="gray.100">
            R$ {price}
          </Text>
        </VStack>
      </Box>
    </>
  )
}
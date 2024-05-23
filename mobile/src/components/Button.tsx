import { ReactNode } from 'react';
import { Button as ButtonNativeBase, IButtonProps, Text, HStack } from 'native-base';

type Props = IButtonProps & {
  title?: string;
  variant?: 'solid' | 'outline';
  icon?: ReactNode;
  color?: string;
  textColor?: string;
}

export function Button({ title = '', variant = 'solid', textColor = 'black', color = 'blue_light', icon, ...rest }: Props) {
  return (
    <ButtonNativeBase
      h={14}
      bg={color}
      borderWidth={variant === 'outline' ? 1 : 0}
      borderColor="green.500"
      rounded="sm"
      _pressed={{
        bg: variant === 'outline' ? 'gray.500' : color
      }}
      {...rest}
    >
      <HStack>
        {icon && <>{icon}</>}
        <Text
          color={variant === 'outline' ? 'white' : textColor}
          fontFamily="heading"
          fontSize="sm"
          pl={2}
        >
          {title}
        </Text>
      </HStack>
    </ButtonNativeBase>
  );
}

import { Button as ButtonNativeBase, IButtonProps, Text, Icon } from 'native-base';
import { ReactElement } from 'react';

type Props = IButtonProps & {
  title: string;
  variant?: 'solid' | 'outline';
  leftIcon?: ReactElement;
  color?: string;
  textColor?: string;
}

export function Button({ title, variant = 'solid', textColor = 'black', color = 'blue_light', leftIcon, ...rest }: Props) {
  return (
    <ButtonNativeBase
      h={14}
      w={'full'}
      bg={color}
      borderWidth={variant === 'outline' ? 1 : 0}
      borderColor="green.500"
      rounded="sm"
      _pressed={{
        bg: variant === 'outline' ? 'gray.500' : color
      }}
      {...rest}
      leftIcon={leftIcon} // Passe o ícone aqui
    >
      <Text
        color={variant === 'outline' ? 'white' : textColor}
        fontFamily="heading"
        fontSize="sm"
      >
        {title}
      </Text>
    </ButtonNativeBase>
  );
}

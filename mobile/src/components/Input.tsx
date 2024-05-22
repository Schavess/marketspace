import { useState } from 'react';
import { Input as NativeBaseInput, IInputProps, FormControl, Icon, Pressable } from 'native-base';
import { Ionicons } from '@expo/vector-icons';  // Certifique-se de ter @expo/vector-icons instalado

type Props = IInputProps & {
  errorMessage?: string | null;
}

export function Input({ errorMessage = null, isInvalid, secureTextEntry, ...rest }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const invalid = !!errorMessage || isInvalid;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const renderInputRightElement = () => {
    if (secureTextEntry) {
      return (
        <Pressable onPress={togglePasswordVisibility}>
          <Icon
            as={<Ionicons name={showPassword ? "eye" : "eye-off"} />}
            size={5}
            mr={2}
            color="gray.300"
          />
        </Pressable>
      );
    }
    return undefined;
  };

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <NativeBaseInput
        bg="white"
        w={'full'}
        h={14}
        px={4}
        borderWidth={0}
        fontSize="md"
        color="black"
        fontFamily="body"
        placeholderTextColor="gray.400"
        isInvalid={invalid}
        secureTextEntry={secureTextEntry && !showPassword}
        _invalid={{
          borderWidth: 1,
          borderColor: "red.500"
        }}
        _focus={{
          bgColor: 'gray.700',
          borderWidth: 1,
          borderColor: 'blue'
        }}
        InputRightElement={renderInputRightElement()}
        {...rest}
      />
      <FormControl.ErrorMessage _text={{ color: 'red.500' }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}

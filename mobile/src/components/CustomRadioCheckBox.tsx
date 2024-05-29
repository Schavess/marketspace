import React, { useState } from 'react';
import { HStack, Radio, Center } from 'native-base';

import { THEME } from '../theme';

type RadioCheckProps = {
  onValueChange: (value: string) => void;
}

export function RadioCheckbox({ onValueChange }: RadioCheckProps) {
  const [selectedValue, setSelectedValue] = useState('new');

  const handleChange = (nextValue: string) => {
    setSelectedValue(nextValue);
    if (onValueChange) {
      onValueChange(nextValue);
    }
  };

  return (
    <Center flex={1} >
      <HStack w={'full'} >
        <Radio.Group
          name="productType"
          value={selectedValue}
          onChange={handleChange}
          flexDirection="row"
        >
          <Radio
            value="new"
            my={1}
            _text={{
              ml: 2,
              fontSize: 'sm',
              color: 'black',
            }}
            _checked={{
              borderColor: THEME.colors['blue_light'],
              _icon: {
                color: THEME.colors['blue_light'],
              },
            }}
            size="md"
          >
            Produto Novo
          </Radio>
          <Radio
            value="used"
            my={1}
            ml={5}
            _text={{
              ml: 2,
              fontSize: 'sm',
              color: 'black',
            }}
            _checked={{
              borderColor: THEME.colors['blue_light'],
              _icon: {
                color: THEME.colors['blue_light'],
              },
            }}
            size="md"
          >
            Produto Usado
          </Radio>
        </Radio.Group>
      </HStack>
    </Center>
  );
}

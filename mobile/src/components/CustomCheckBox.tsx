import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import { Check } from 'phosphor-react-native';

type CustomCheckboxProps = {
  label: string;
  value: boolean;
  onValueChange: (newValue: boolean) => void;
};

import { THEME } from '../theme';

const CustomCheckbox = ({ label, value, onValueChange }: CustomCheckboxProps) => {

  return (
    <TouchableOpacity onPress={() => onValueChange(!value)} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, value && styles.checkedCheckbox]}>
        {value ?
          <>
            <View style={styles.checkboxTick}>
              <Check size={15} color='white' weight='bold' />
            </View>
          </>
          : <></>
        }
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 0.5,
    borderColor: THEME.colors.blue_light,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkedCheckbox: {
    backgroundColor: THEME.colors.blue_light,
  },
  checkboxTick: {
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.colors.blue_light,
  },
  checkboxLabel: {
    fontSize: 16,
  },
});

export default CustomCheckbox;

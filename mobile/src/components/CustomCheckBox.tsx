import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type CustomCheckboxProps = {
  label: string;
  value: boolean;
  onValueChange: (newValue: boolean) => void;
};

const CustomCheckbox = ({ label, value, onValueChange }: CustomCheckboxProps) => {
  return (
    <TouchableOpacity onPress={() => onValueChange(!value)} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, value && styles.checkedCheckbox]}>
        {value && <View style={styles.checkboxTick} />}
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
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkedCheckbox: {
    backgroundColor: '#2196F3',
  },
  checkboxTick: {
    width: 12,
    height: 12,
    backgroundColor: '#fff',
  },
  checkboxLabel: {
    fontSize: 16,
  },
});

export default CustomCheckbox;

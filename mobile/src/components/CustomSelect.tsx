import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

import { CaretDown } from 'phosphor-react-native';

import { THEME } from '../theme';

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  service: string;
  setService: (value: string) => void;
  options: Option[];
}

export function CustomSelect({ service, setService, options }: CustomSelectProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedOption = options.find(option => option.value === service);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.select}
        onPress={() => setModalVisible(true)}
      >
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>

          <Text style={styles.selectText}>
            {selectedOption ? selectedOption.label : 'Todos'}
          </Text>
          <CaretDown />
        </View>

      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.overlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modal}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    setService(item.value);
                    setModalVisible(false);
                  }}
                >
                  <Text style={{
                    color: item.value === service ? THEME.colors.blue_light : THEME.colors.gray[400],
                    fontFamily: THEME.fonts['heading'],
                  }}
                  >{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
  },
  select: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    // backgroundColor: 'white',
  },
  selectText: {
    fontSize: 16,
    color: 'black',
    fontFamily: THEME.fonts['body'],

  },
  overlay: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

import React, { useState } from 'react';
import { Image, View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { X, PlusSquare } from 'phosphor-react-native';

const ImagePickerComponent: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const pickImages = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permissão para acessar a galeria é necessária!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const selectedUris = result.assets.map(asset => asset.uri);
      setSelectedImages([...selectedImages, ...selectedUris]);
    }
  };

  const removeImage = (uri: string) => {
    setSelectedImages(selectedImages.filter(imageUri => imageUri !== uri));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.imageContainer} horizontal={true}>
        {selectedImages.map((imageUri, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{ uri: imageUri }} style={styles.image} />
            <TouchableOpacity style={styles.removeButton} onPress={() => removeImage(imageUri)}>
              <X size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}
        {selectedImages.length < 5 && (
          <TouchableOpacity style={styles.addButton} onPress={pickImages}>
            <PlusSquare size={40} color="#888" />
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '100%',
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    // marginBottom: 10,
  },
  imageContainer: {
    flexDirection: 'row',
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 5,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 5,
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    padding: 2,
  },
  addButton: {
    alignSelf: 'center',
    // padding: 2,
    width: 100,
    height: 100,
    borderRadius: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ImagePickerComponent;

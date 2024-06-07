import React, { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Alert } from 'react-native';
import { VStack, Text, Center, ScrollView, Image } from 'native-base';
import { useForm, Controller } from 'react-hook-form';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import LogoSVG from '../assets/logo_marketspace.svg';
import ImageUserPhotoDefault from '../assets/ImageUserPhotoDefault.png';
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import { api } from '@services/api';
import { useAuth } from '@hooks/useAuth';

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [image, setImage] = useState<string | null>(null);

  const { singIn } = useAuth();

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Precisamos da permissão para acessar a galeria de fotos.');
      }
    })();
  }, []);

  function handleBackToLogin() {
    navigation.goBack();
  }

  async function pickImage() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível selecionar a imagem. Tente novamente.');
    }
  }

  async function onSubmit(data: any) {
    try {
      const formData = new FormData();

      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('tel', data.phone);
      formData.append('password', data.password);

      if (image) {
        const fileInfo = await FileSystem.getInfoAsync(image);
        const fileName = fileInfo.uri.split('/').pop();
        const fileType = fileInfo.uri.split('.').pop();

        formData.append('avatar', {
          uri: fileInfo.uri,
          name: fileName,
          type: `image/${fileType}`,
        } as any); // Usamos 'as any' para evitar erros de tipo com o FormData
      }

      const response = await api.post('/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Conta criada com sucesso!');

        await singIn(data.email, data.password);

      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao criar a conta. Tente novamente.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao enviar os dados. Tente novamente.');
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack bg={"gray.600"} borderRadius={20} pb={5} alignItems="center" >
        <Center my={10} w={'80%'} >
          <LogoSVG width={50} height={50} />
          <Text fontSize="xl" fontFamily="heading">Boas vindas!</Text>
          <Text color="gray.300" fontSize="sm" textAlign={'center'}>Crie sua conta e use o espaço para comprar itens variados e vender seus produtos.</Text>
        </Center>
        <Center w={'300'}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={image ? { uri: image } : ImageUserPhotoDefault}
              alt="User Photo"
              mb={5}
              width={'130px'}
              height={'130px'}
              borderRadius={'130px'}
            />
          </TouchableOpacity>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Nome"
                keyboardType="name-phone-pad"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="name"
            defaultValue=""
          />
          {errors.name && <Text color="red.500">Nome é obrigatório.</Text>}

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
            defaultValue=""
          />
          {errors.email && <Text color="red.500">E-mail é obrigatório.</Text>}

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Telefone"
                keyboardType="name-phone-pad"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="phone"
            defaultValue=""
          />
          {errors.phone && <Text color="red.500">Telefone é obrigatório.</Text>}

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
            defaultValue=""
          />
          {errors.password && <Text color="red.500">Senha é obrigatória.</Text>}

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Confirmar senha"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
            name="confirmPassword"
            defaultValue=""
          />
          {errors.confirmPassword && <Text color="red.500">Confirmar senha é obrigatório.</Text>}

          <Button
            title="Entrar"
            textColor='white'
            w={'full'}
            onPress={handleSubmit(onSubmit)}
          />
        </Center>
      </VStack >
      <VStack pt={10} pb={15} alignItems="center">
        <Center w={300}>
          <Text fontSize="md">Já têm uma conta?</Text>
          <Button
            title="Ir para o login"
            color='gray.500'
            mt={5}
            onPress={handleBackToLogin}
            w={'full'}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}

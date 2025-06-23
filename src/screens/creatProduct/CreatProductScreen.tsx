import React, { useState } from 'react';
import {
  Alert,
  Image,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { colors } from '../../assets/colors/colors';
import ScreenWrapper from '../../components/ScreenWrapper';
import { commonStyles } from '../../styles/commonStyle';
import { useDispatch } from 'react-redux';
import { ACTIONCONSTANTS } from '../../services/config/apiConstants';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { CustomHeader } from '../../components';
import Spacer from '../../components/Spacer';

const PrimaryButton = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const CreateProductScreen = () => {
  const route =
    useRoute<RouteProp<RootStackParamList, 'CreateProductScreen'>>();

  const existingProduct = route.params?.product;
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [title, setTitle] = useState(existingProduct?.title || '');
  const [price, setPrice] = useState(existingProduct?.price?.toString() || '');
  const [category, setCategory] = useState(existingProduct?.category || '');
  const [description, setDescription] = useState(
    existingProduct?.description || '',
  );
  const [imageUri, setImageUri] = useState(existingProduct?.image || null);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchCamera(
          {
            mediaType: 'photo',
            quality: 0.8,
          },
          (response: ImagePickerResponse) => {
            if (response.didCancel) return;
            if (response.errorMessage) {
              Alert.alert('Error', response.errorMessage);
              return;
            }
            if (response.assets && response.assets.length > 0) {
              setImageUri(response.assets[0].uri || null);
            }
          },
        );
        return true;
      } else {
        Alert.alert(
          'Permission Denied',
          'Camera permission is required to take a photo.',
        );
        return false;
      }
    } catch (err) {
      console.warn(err);
      Alert.alert('Error', 'Failed to request camera permission.');
      return false;
    }
  };

  const pickImage = async () => {
    Alert.alert('Select Image', 'Choose an option', [
      {
        text: 'Camera',
        onPress: async () => {
          await requestCameraPermission();
        },
      },
      {
        text: 'Gallery',
        onPress: () => {
          launchImageLibrary(
            {
              mediaType: 'photo',
              quality: 0.8,
            },
            (response: ImagePickerResponse) => {
              if (response.didCancel) return;
              if (response.errorMessage) {
                Alert.alert('Error', response.errorMessage);
                return;
              }
              if (response.assets && response.assets.length > 0) {
                setImageUri(response.assets[0].uri || null);
              }
            },
          );
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleSubmit = () => {
    if (!title || !price || !description || !imageUri) {
      Alert.alert(
        'Error',
        'Please fill all required fields and upload an image.',
      );
      return;
    }

    const newProduct = {
      id: existingProduct?.id || Date.now().toString(),
      price: Number(price),
      category: category || '',
      title,
      description,
      image: imageUri,
      rating: {
        rate: 0,
        count: 0,
      },
      isLocal: true,
    };

    if (existingProduct) {
      dispatch({ type: ACTIONCONSTANTS.UPDATE_PRODUCT, payload: newProduct });
      Alert.alert('Updated', 'Product updated successfully!');
    } else {
      dispatch({ type: ACTIONCONSTANTS.ADD_PRODUCT, payload: newProduct });
      Alert.alert('Created', 'Product added successfully!');
    }

    navigation.navigate('HomeScreen');
    // Reset form
    setTitle('');
    setPrice('');
    setCategory('');
    setDescription('');
    setImageUri(null);
  };

  return (
    <ScreenWrapper
      conatinerStyle={commonStyles.mainContainer}
      statusBarColor={colors.white}
    >
      <Spacer gap={RFPercentage(1)} />
      <CustomHeader text="Create product" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <Text style={styles.label}>Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter product title"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor={colors.lightGray}
          />

          <Text style={styles.label}>Price *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter price"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
            placeholderTextColor={colors.lightGray}
          />

          <Text style={styles.label}>Category</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter category (optional)"
            value={category}
            onChangeText={setCategory}
            placeholderTextColor={colors.lightGray}
          />

          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
            placeholder="Enter description"
            value={description}
            placeholderTextColor={colors.lightGray}
            onChangeText={setDescription}
            multiline
          />

          <Text style={styles.label}>Image *</Text>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={{ color: colors.gray }}>No image selected</Text>
            </View>
          )}
          <PrimaryButton title="Choose Image" onPress={pickImage} />

          <PrimaryButton
            title={existingProduct ? 'Update Product' : 'Create Product'}
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  form: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 18,
    marginHorizontal: 8,
    marginBottom: 30,
    shadowColor: colors.primary,
    shadowOpacity: 0.09,
    shadowRadius: 8,
    elevation: 3,
    marginTop: RFPercentage(2),
  },
  label: {
    fontWeight: '600',
    color: colors.primary,
    fontSize: 16,
    marginTop: 14,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: colors.white,
    color: colors.black,
  },
  imagePreview: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginVertical: 10,
    backgroundColor: '#f4f4f4',
  },
  imagePlaceholder: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 13,
    marginTop: 18,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 2,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 0.8,
  },
});

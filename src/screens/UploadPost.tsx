import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import {MentionInput} from 'react-native-controlled-mentions';
import {launchImageLibrary} from 'react-native-image-picker';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {useDispatch} from 'react-redux';
import {RootStackParamList} from '../../types';
import {MXicon} from '../components/Icons';
import {NormalText, TitleText} from '../components/Text';
import {AppDispatch, useAppSelector} from '../redux/appStore';
import {Person, Post, addPost} from '../redux/slices/userSlice';
import {colors} from '../utility';
import Header from './components/Header';
import ImageCarousel from './components/ImageCarousel';

const windowWidth = Dimensions.get('window').width;

interface ImageData {
  fileName: string;
  fileSize: number;
  height: number;
  originalPath: string;
  type: string;
  uri: string;
  width: number;
}

const UploadPost = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const followedUser = useAppSelector(
    state => state.home.followedUser,
  ) as Person[];
  const videoRef = useRef(null);
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = useState<string>('');
  const [selectedImages, setSelectedImages] = useState<ImageData[]>([]);
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>();
  const [usedTags, setUsedTags] = useState<Person[]>([]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const onPressGallery = () => {
    launchImageLibrary({mediaType: 'mixed'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log(`ImagePicker Error: ${response.errorMessage}`);
      } else if (response.assets && response.assets.length > 0) {
        const newImages = response.assets.map(asset => ({
          fileName: asset.fileName || '',
          fileSize: asset.fileSize || 0,
          height: asset.height || 0,
          originalPath: asset.uri || '',
          type: asset.type || '',
          uri: asset.uri || '',
          width: asset.width || 0,
        }));
        setSelectedImages(prevImages => [...prevImages, ...newImages]);
      }
    });
  };

  const deleteImage = (index: number) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  const uploadImage = () => {
    try {
      let onlyImages = selectedImages.map((item: any) => item.uri);
      if (onlyImages.length > 0 || value.length > 0) {
        const newPost: Post = {
          uploadedImages: onlyImages,
          likeCount: 0,
          commentCount: 0,
          username: 'Openxcell',
          userProfileImage:
            'https://media.licdn.com/dms/image/C4D0BAQHdV0Za6fJ6rQ/company-logo_200_200/0/1633950210028/openxcell_logo?e=2147483647&v=beta&t=MNfzk-Rn8tLLhr2CyUGr7ulFL1XADGIplebT4K7BFpk',
          isLiked: false,
          id: Math.random(),
          description: value?.trim(),
        };
        dispatch(addPost(newPost));
        navigation.goBack();
      } else {
        ToastAndroid.show(`Please share something!`, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderSuggestions = (props: {keyword: any; onSuggestionPress: any}) => {
    const {keyword, onSuggestionPress} = props;

    if (keyword == null) {
      return null;
    }

    const filteredUsers = followedUser.filter(
      one =>
        one.name.toLowerCase().includes(keyword.toLowerCase()) &&
        !usedTags.some(tag => tag.id === one.id),
    );

    if (filteredUsers.length === 0) {
      return (
        <View style={styles.suggestionsContainer}>
          <NormalText style={{margin: RFPercentage(1)}}>
            No followers.
          </NormalText>
        </View>
      );
    }

    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={styles.suggestionsContainer}>
        {filteredUsers.map(one => {
          const firstName = one.name.split(' ')[0];
          return (
            <Pressable
              key={one.id}
              onPress={() => {
                onSuggestionPress({id: one.id, name: firstName});
                setUsedTags(prevTags => [...prevTags, one]);
              }}
              style={styles.suggestionItem}>
              <NormalText>{firstName}</NormalText>
            </Pressable>
          );
        })}
      </ScrollView>
    );
  };

  const handleTagRemoval = (text: string) => {
    const mentionRegex = /@(\w+)/g;
    const mentionMatches = [...text.matchAll(mentionRegex)].map(
      match => match[1],
    );
    const removedTags = usedTags.filter(
      tag => !mentionMatches.includes(tag.name),
    );
    if (removedTags.length > 0) {
      setUsedTags(prevTags =>
        prevTags.filter(
          tag => !removedTags.some(removed => removed.id === tag.id),
        ),
      );
    }

    setValue(text);
  };

  return (
    <View style={styles.container}>
      <Header uploadImage={uploadImage} />
      <View style={styles.textInputContainer}>
        <MentionInput
          scrollEnabled
          placeholder={'Write something here...'}
          placeholderTextColor={colors.textGray}
          maxLength={300}
          style={styles.commentInput}
          value={value}
          onChange={handleTagRemoval}
          partTypes={[
            {
              trigger: '@',
              renderSuggestions: renderSuggestions,
              isBottomMentionSuggestionsRender: true,
              textStyle: {
                color: '#E90019',
                fontFamily: 'ComicNeue-Regular',
                fontSize: RFValue(12),
              },
            },
          ]}
        />
        <NormalText style={{textAlign: 'right', color: colors.black}}>
          {value.length}/300
        </NormalText>
      </View>
      {selectedImages.length > 0 ? (
        <ImageCarousel
          activeIndex={activeIndex}
          setActiveIndex={index => setActiveIndex(index)}
          deleteImage={index => deleteImage(index)}
          selectedImages={selectedImages ?? []}
        />
      ) : (
        <View style={styles.noPhotoContainer}>
          <Pressable onPress={onPressGallery}>
            <MXicon
              type="AntDesign"
              name="pluscircleo"
              size={RFPercentage(7)}
              color={colors.textGray}
            />
          </Pressable>
          <TitleText
            style={{marginVertical: RFPercentage(1), color: colors.textGray}}>
            Share you memory
          </TitleText>
        </View>
      )}
      {selectedImages.length > 0 &&
        selectedImages.length < 4 &&
        !isKeyboardVisible && (
          <Pressable
            style={styles.moreImagePickContainer}
            onPress={onPressGallery}>
            <TitleText
              style={{color: colors.white, marginHorizontal: RFPercentage(1)}}>
              Add more
            </TitleText>
            <MXicon
              type="Entypo"
              name="images"
              size={RFPercentage(2.5)}
              color={colors.white}
            />
          </Pressable>
        )}
    </View>
  );
};

export default UploadPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  textInputContainer: {
    padding: RFPercentage(1.5),
    backgroundColor: colors.white,
    borderRadius: 5,
    borderBottomWidth: 1,
    marginBottom: RFPercentage(1),
  },
  commentInput: {
    backgroundColor: colors.white,
    color: colors.black,
    fontSize: RFValue(12),
    height: RFPercentage(8),
    textAlignVertical: 'top',
    fontFamily: 'ComicNeue-Regular',
  },
  noPhotoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreImagePickContainer: {
    backgroundColor: colors.primeColor,
    margin: RFPercentage(2),
    borderRadius: 10,
    padding: RFPercentage(1),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  suggestionsContainer: {
    width: '100%',
    maxHeight: RFPercentage(15),
    top: -23,
    elevation: 3,
    backgroundColor: colors.white,
  },
  suggestionItem: {
    padding: 12,
  },
});

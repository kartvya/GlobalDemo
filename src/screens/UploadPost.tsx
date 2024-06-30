import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import {MentionInput} from 'react-native-controlled-mentions';
import Carousel from 'react-native-reanimated-carousel';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {RootStackParamList} from '../../types';
import {MXicon} from '../components/Icons';
import {NormalText, TitleText} from '../components/Text';
import {colors} from '../utility';
import {useDispatch} from 'react-redux';
import {AppDispatch, useAppSelector} from '../redux/appStore';
import {Person, Post, addPost} from '../redux/slices/userSlice';
import {launchImageLibrary} from 'react-native-image-picker';
//@ts-ignore
import Video from 'react-native-video';

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

interface ImageProps {
  assets: ImageData[];
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

  // const onPressGallery = () => {
  //   ImagePicker.openPicker({
  //     width: 1000,
  //     height: 800,
  //     cropping: true,
  //     includeBase64: false,
  //     compressImageQuality: 1,
  //     mediaType: 'any',
  //   })
  //   .then(images => {
  //     if (images) {
  //       setSelectedImages(prevImages => [...prevImages, images]);
  //     }
  //   })
  //   .catch(error => {
  //     console.log(error, 'image upload calncled');
  //   });
  // };

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

    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={{
          width: '100%',
          maxHeight: RFPercentage(15),
          top: -23,
          elevation: 3,
          backgroundColor: colors.white,
        }}>
        {followedUser
          .filter(one => one.name.toLowerCase().includes(keyword.toLowerCase()))
          .map(one => {
            const firstName = one.name.split(' ')[0];
            return (
              <Pressable
                key={one.id}
                onPress={() => onSuggestionPress({id: one.id, name: firstName})}
                style={{padding: 12}}>
                <NormalText>{firstName}</NormalText>
              </Pressable>
            );
          })}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Pressable onPress={() => navigation.goBack()}>
            <MXicon
              type="AntDesign"
              name="close"
              color={colors.black}
              size={RFPercentage(3)}
            />
          </Pressable>
          <TitleText style={{marginHorizontal: RFPercentage(1)}}>
            New post
          </TitleText>
        </View>
        <Pressable onPress={uploadImage}>
          <MXicon
            type="AntDesign"
            name={'check'}
            color={colors.black}
            size={RFPercentage(3)}
          />
        </Pressable>
      </View>
      <View style={styles.textInputContainer}>
        <MentionInput
          scrollEnabled
          placeholder={'Write something here...'}
          placeholderTextColor={colors.textGray}
          maxLength={300}
          style={styles.commentInput}
          value={value}
          onChange={setValue}
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
        <View style={styles.carouselContainer}>
          <Carousel
            width={windowWidth}
            height={RFPercentage(40)}
            autoPlay={false}
            loop={false}
            data={selectedImages ?? []}
            scrollAnimationDuration={1000}
            onSnapToItem={index => setActiveIndex(index)}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 50,
            }}
            renderItem={({item, index}) => {
              if (item?.type === 'video/mp4') {
                return (
                  <View style={{flex: 1}}>
                    <View
                      style={[
                        styles.imageCountConatiner,
                        {position: 'absolute', zIndex: 999, right: 10, top: 10},
                      ]}>
                      {selectedImages.length > 1 && (
                        <View style={styles.imageIcons}>
                          <NormalText style={styles.countText}>{`${index + 1}/${
                            selectedImages.length
                          }`}</NormalText>
                        </View>
                      )}
                      <Pressable
                        onPress={() => deleteImage(index)}
                        style={[
                          styles.imageIcons,
                          {marginLeft: RFPercentage(1)},
                        ]}>
                        <MXicon
                          type="AntDesign"
                          name={'close'}
                          color={colors.white}
                          size={RFPercentage(3)}
                        />
                      </Pressable>
                    </View>
                    <Video
                      source={{uri: item?.uri}}
                      ref={videoRef}
                      onBuffer={() => console.log('buffring')}
                      onError={() => console.log('error')}
                      style={[styles.bannerImageStyle]}
                      resizeMode="cover"
                      repeat={true}
                      useTextureView={false}
                      onPlaybackError={(error: any) =>
                        console.error('Video error:', error)
                      }
                      maxBitRate={700000}
                      ignoreSilentSwitch="ignore"
                      paused={
                        activeIndex == 0
                          ? false
                          : activeIndex == index
                          ? false
                          : true
                      }
                      automaticallyWaitsToMinimizeStalling={false}
                      hideShutterView={true}
                      disableFocus={true}
                    />
                  </View>
                );
              } else {
                return (
                  <View style={{flex: 1}}>
                    <ImageBackground
                      source={{uri: item.uri}}
                      style={styles.bannerImageStyle}
                      resizeMode="cover">
                      <View style={styles.imageCountConatiner}>
                        {selectedImages.length > 1 && (
                          <View style={styles.imageIcons}>
                            <NormalText style={styles.countText}>{`${
                              index + 1
                            }/${selectedImages.length}`}</NormalText>
                          </View>
                        )}
                        <Pressable
                          onPress={() => deleteImage(index)}
                          style={[
                            styles.imageIcons,
                            {marginLeft: RFPercentage(1)},
                          ]}>
                          <MXicon
                            type="AntDesign"
                            name={'close'}
                            color={colors.white}
                            size={RFPercentage(3)}
                          />
                        </Pressable>
                      </View>
                    </ImageBackground>
                  </View>
                );
              }
            }}
          />
        </View>
      ) : (
        <Pressable style={styles.noPhotoContainer} onPress={onPressGallery}>
          <MXicon
            type="AntDesign"
            name="pluscircleo"
            size={RFPercentage(7)}
            color={colors.textGray}
          />
          <TitleText
            style={{marginVertical: RFPercentage(1), color: colors.textGray}}>
            Share you memory
          </TitleText>
        </Pressable>
      )}
      {selectedImages.length > 0 &&
        selectedImages.length < 4 &&
        !isKeyboardVisible && (
          <Pressable
            style={styles.moreImagePickConatiner}
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: RFPercentage(1),
    paddingVertical: RFPercentage(2),
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'space-between',
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
  carouselContainer: {
    flex: 1,
  },
  carouselItem: {
    width: windowWidth,
    height: RFPercentage(30),
    borderRadius: 10,
    overflow: 'hidden',
  },
  bannerImageStyle: {
    flex: 1,
    height: RFPercentage(40),
    padding: RFPercentage(1),
  },
  imageOverlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: RFPercentage(1),
  },
  imageText: {
    color: colors.white,
    fontSize: RFPercentage(2),
  },
  deleteButton: {
    padding: RFPercentage(1),
  },
  countText: {
    color: colors.white,
  },
  imageIcons: {
    width: RFPercentage(5),
    height: RFPercentage(5),
    backgroundColor: colors.transAlpha2,
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageCountConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  moreImagePickConatiner: {
    backgroundColor: colors.primeColor,
    margin: RFPercentage(2),
    borderRadius: 10,
    padding: RFPercentage(1),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

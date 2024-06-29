import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {MentionInput} from 'react-native-controlled-mentions';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import Carousel from 'react-native-reanimated-carousel';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {RootStackParamList} from '../../types';
import {MXicon} from '../components/Icons';
import {NormalText, TitleText} from '../components/Text';
import {colors} from '../utility';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../redux/appStore';
import {Post, addPost} from '../redux/slices/userSlice';

const windowWidth = Dimensions.get('window').width;

const UploadPost = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = useState('');
  const [selectedImages, setSelectedImages] = useState<ImageOrVideo[]>([]);

  const onPressGallery = () => {
    ImagePicker.openPicker({
      width: 1000,
      height: 800,
      cropping: true,
      includeBase64: false,
      compressImageQuality: 1,
    })
      .then(images => {
        if (images) {
          setSelectedImages(prevImages => [...prevImages, images]);
        }
      })
      .catch(error => {
        console.log(error, 'image upload calncled');
      });
  };

  const deleteImage = (index: number) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  const uploadImage = () => {
    try {
      let onlyImages = selectedImages.map((item: any) => item.path);
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
    } catch (error) {
      console.log(error);
    }
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
          <TitleText>Upload</TitleText>
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
            data={selectedImages}
            scrollAnimationDuration={1000}
            onSnapToItem={index => console.log('current index:', index)}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 50,
            }}
            renderItem={({item, index}) => {
              return (
                <View style={{flex: 1}}>
                  <ImageBackground
                    source={{uri: item.path}}
                    style={styles.bannerImageStyle}
                    resizeMode="cover">
                    <View style={styles.imageCountConatiner}>
                      <View style={styles.imageIcons}>
                        <NormalText style={styles.countText}>{`${index + 1}/${
                          selectedImages.length
                        }`}</NormalText>
                      </View>
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
            Pick photo
          </TitleText>
        </Pressable>
      )}
      {selectedImages.length > 0 && selectedImages.length < 4 && (
        <Pressable
          style={styles.moreImagePickConatiner}
          onPress={onPressGallery}>
          <TitleText style={{color: colors.black}}>Pick more images</TitleText>
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
    fontSize: 16,
    height: RFPercentage(8),
    textAlignVertical: 'top',
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
    backgroundColor: colors.borderGray,
    margin: RFPercentage(2),
    borderRadius: 10,
    padding: RFPercentage(1),
    alignItems: 'center',
  },
});

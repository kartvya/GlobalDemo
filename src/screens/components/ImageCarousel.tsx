import React, {memo} from 'react';
import {
  View,
  ImageBackground,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {NormalText} from '../../components/Text';
import {MXicon} from '../../components/Icons';
import {colors} from '../../utility';
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

interface ImageCarouselProps {
  selectedImages: ImageData[];
  activeIndex: number | undefined;
  setActiveIndex: (index: number) => void;
  deleteImage: (index: number) => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  selectedImages,
  activeIndex,
  setActiveIndex,
  deleteImage,
}) => {
  return (
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
                    style={[styles.imageIcons, {marginLeft: RFPercentage(1)}]}>
                    <MXicon
                      type="AntDesign"
                      name={'close'}
                      color={colors.white}
                      size={RFPercentage(3)}
                    />
                  </Pressable>
                </View>
                <Video
                  source={{uri: item.uri}}
                  style={styles.bannerImageStyle}
                  resizeMode="cover"
                  repeat
                  paused={activeIndex !== index}
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
                </ImageBackground>
              </View>
            );
          }
        }}
      />
    </View>
  );
};

export default memo(ImageCarousel);

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
  },
  bannerImageStyle: {
    flex: 1,
    height: RFPercentage(40),
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
});

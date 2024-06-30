import React, {useRef, useState} from 'react';
import {Dimensions, Image, Pressable, StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {MXicon} from './Icons';
import Carousel from 'react-native-reanimated-carousel';
import {AppDispatch, useAppSelector} from '../redux/appStore';
import {useDispatch} from 'react-redux';
import {toggleImageModal} from '../redux/slices/userSlice';
//@ts-ignore
import Video from 'react-native-video';
import {colors} from '../utility';

interface FullscreenImageModalProps {}

const FullscreenImageModal: React.FC<FullscreenImageModalProps> = props => {
  const dispatch = useDispatch<AppDispatch>();
  const userPost = useAppSelector(state => state.home);
  const width = Dimensions.get('window').width;
  const videoRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState<number>();
  const [isSoundOn, setIsSoundOn] = useState<boolean>(false);

  const onCanclePress = () => {
    try {
      dispatch(toggleImageModal({images: [], open: false}));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      isVisible={userPost.showImageModal}
      style={{margin: 0}}
      testID={'modal'}
      animationIn={'fadeIn'}
      onSwipeComplete={() => {}}>
      <View style={styles.centeredView}>
        <Carousel
          loop={false}
          width={width}
          height={width}
          autoPlay={false}
          data={userPost.selectedImages}
          scrollAnimationDuration={1000}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          onSnapToItem={index => setActiveIndex(index)}
          renderItem={({index, item: imageUrl}) => {
            const regex = /(?:\.([^.]+))?$/;
            const match = imageUrl.match(regex);
            const extension = match ? match[1] : undefined;
            if (extension === 'mp4') {
              return (
                <View>
                  <Video
                    source={{uri: imageUrl}}
                    ref={videoRef}
                    onBuffer={() => console.log('buffring')}
                    onError={() => console.log('error')}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="cover"
                    repeat={true}
                    useTextureView={false}
                    onPlaybackError={(error: any) =>
                      console.error('Video error:', error)
                    }
                    maxBitRate={700000}
                    ignoreSilentSwitch="ignore"
                    paused={!(activeIndex == 0 || activeIndex == index)}
                    muted={isSoundOn}
                    automaticallyWaitsToMinimizeStalling={false}
                    hideShutterView={true}
                    disableFocus={true}
                  />
                  <Pressable
                    style={styles.soundBtnConatiner}
                    onPress={() => setIsSoundOn(!isSoundOn)}>
                    <MXicon
                      type="Entypo"
                      name={isSoundOn ? 'sound-mute' : 'sound'}
                      color={colors.white}
                      size={RFPercentage(2.2)}
                    />
                  </Pressable>
                </View>
              );
            } else {
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={{uri: imageUrl}}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="cover"
                  />
                </View>
              );
            }
          }}
        />
        <Pressable
          style={{flex: 0.2, alignItems: 'center'}}
          onPress={onCanclePress}>
          <MXicon
            type="AntDesign"
            name={'closecircle'}
            size={RFPercentage(7)}
            color={colors.white}
          />
        </Pressable>
      </View>
    </Modal>
  );
};

export default FullscreenImageModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  soundBtnConatiner: {
    position: 'absolute',
    backgroundColor: colors.transAlpha1,
    padding: RFPercentage(1.3),
    borderRadius: 100,
    bottom: 10,
    right: 10,
  },
});

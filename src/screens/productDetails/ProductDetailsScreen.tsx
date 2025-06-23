import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { colors } from '../../assets/colors/colors';
import { CustomHeader } from '../../components';
import Spacer from '../../components/Spacer';
import ScreenWrapper from '../../components/ScreenWrapper';
import { commonStyles } from '../../styles/commonStyle';

const ProductDetailsScreen = () => {
  const route =
    useRoute<RouteProp<RootStackParamList, 'ProductDetailsScreen'>>();
  const product = route.params?.product;

  if (!product) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No product data found.</Text>
      </View>
    );
  }

  return (
    <ScreenWrapper
      conatinerStyle={commonStyles.mainContainer}
      statusBarColor={colors.white}
    >
      <Spacer gap={RFPercentage(1)} />
      <CustomHeader text="Product Details" />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>
        {/* Title */}
        <Text style={styles.title}>{product.title}</Text>
        {/* Category */}
        <Text style={styles.category}>{product.category}</Text>
        {/* Price */}
        <Text style={styles.price}>${product.price}</Text>
        {/* Rating */}
        <View style={styles.ratingRow}>
          <Text style={styles.ratingStar}>⭐</Text>
          <Text style={styles.ratingText}>
            {product.rating?.rate || 0} ({product.rating?.count || 0} reviews)
          </Text>
        </View>
        {/* Description */}
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingHorizontal: RFPercentage(2),
  },
  imageContainer: {
    width: '100%',
    height: RFPercentage(55),
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: RFPercentage(3),
    marginTop: RFPercentage(2),
    shadowColor: colors.primary,
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  productImage: {
    width: '80%',
    height: '100%',
    borderRadius: 14,
  },
  title: {
    fontSize: RFPercentage(3.2),
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  category: {
    fontSize: RFPercentage(2),
    color: colors.gray,
    fontStyle: 'italic',
    marginBottom: 6,
    textAlign: 'center',
  },
  price: {
    fontSize: RFPercentage(2.6),
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFPercentage(2),
  },
  ratingStar: {
    fontSize: RFPercentage(2.2),
    marginRight: 3,
    color: '#FFD700',
  },
  ratingText: {
    fontSize: RFPercentage(2),
    color: colors.primary,
  },
  sectionTitle: {
    fontSize: RFPercentage(2.2),
    fontWeight: '600',
    color: colors.primary,
    alignSelf: 'flex-start',
    marginTop: RFPercentage(2),
    marginBottom: 4,
  },
  description: {
    fontSize: RFPercentage(2),
    color: colors.textColor,
    textAlign: 'left',
    width: '100%',
    lineHeight: 26,
    marginBottom: RFPercentage(4),
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: colors.primary,
  },
});

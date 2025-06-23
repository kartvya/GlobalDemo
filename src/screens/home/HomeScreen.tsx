import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../assets/colors/colors';
import ScreenWrapper from '../../components/ScreenWrapper';
import { commonStyles } from '../../styles/commonStyle';
import { wp } from '../../utils/helpers';
import { useGetProductsQuery } from '../../services/apis/user/userApi';
import { Icons } from '../../components/Icons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

const { width } = Dimensions.get('window');
const CARD_MARGIN = wp(2);
const CARD_SIZE = (width - wp(10) - CARD_MARGIN * 3) / 2;

const HomeScreen = () => {
  const { data, isLoading, isFetching } = useGetProductsQuery();
  const dispatch = useDispatch();

  // Get cart count from redux
  // const cartCount = useSelector((state: RootState) => state.cart.items.length);

  const handleAddToCart = (item: Product) => {
    // dispatch(addToCart(item));
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImg} />
      <Text style={styles.productTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.productPrice}>${item.price}</Text>
      <Text style={styles.productRating}>
        ⭐ {item.rating.rate} ({item.rating.count})
      </Text>
      <TouchableOpacity
        style={styles.plusBtn}
        onPress={() => handleAddToCart(item)}
        activeOpacity={0.7}
      >
        <Icons
          type="Feather"
          name="plus"
          size={RFPercentage(2.5)}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScreenWrapper
      conatinerStyle={commonStyles.mainContainer}
      statusBarColor={colors.white}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Products</Text>
        <View style={styles.cartContainer}>
          <Icons type="Feather" name="shopping-cart" size={RFPercentage(3)} />
          <View style={styles.cartBadge}>
            {/* <Text style={styles.cartBadgeText}>{cartCount}</Text> */}
          </View>
        </View>
      </View>

      {/* Product Grid */}
      {isLoading || isFetching ? (
        <View style={{ marginTop: 32 }}>
          <Text style={{ color: colors.textColor, textAlign: 'center' }}>
            Loading...
          </Text>
        </View>
      ) : (
        <FlatList
          data={data?.products || data || []}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.list}
          columnWrapperStyle={styles.row}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No products found.</Text>
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </ScreenWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: RFPercentage(2),
    marginTop: RFPercentage(3),
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
  },
  cartContainer: {
    position: 'relative',
    marginRight: wp(2),
  },
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -10,
    backgroundColor: colors.coralRed,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
    minWidth: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: RFPercentage(2.5),
    paddingTop: RFPercentage(1),
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: CARD_MARGIN,
  },
  productCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: CARD_MARGIN,
    width: CARD_SIZE,
    padding: wp(2),
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    position: 'relative',
  },
  productImg: {
    width: CARD_SIZE - wp(6),
    height: CARD_SIZE - wp(6),
    borderRadius: 8,
    marginBottom: wp(2),
    resizeMode: 'contain',
    backgroundColor: '#f7f7f7',
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textColor,
    marginBottom: 2,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 2,
    textAlign: 'center',
  },
  productRating: {
    fontSize: 13,
    color: colors.textColor,
    textAlign: 'center',
  },
  plusBtn: {
    position: 'absolute',
    top: wp(2),
    right: wp(2),
    backgroundColor: colors.primary,
    borderRadius: 40,
    padding: wp(1.8),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textColor,
    marginTop: 40,
    fontSize: 18,
  },
});

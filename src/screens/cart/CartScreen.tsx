import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../assets/colors/colors';
import ScreenWrapper from '../../components/ScreenWrapper';
import { commonStyles } from '../../styles/commonStyle';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';

import { Icons } from '../../components/Icons';
import { ACTIONCONSTANTS } from '../../services/config/apiConstants';
import { CustomHeader } from '../../components';
import Spacer from '../../components/Spacer';

const CartScreen = () => {
  const cart = useSelector(
    (state: RootState) => state.root.cartReducer.items || [],
  );

  const dispatch = useDispatch();

  const handleRemove = (id: number) => {
    dispatch({ type: ACTIONCONSTANTS.REMOVE_FROM_CART, payload: id });
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity < 1) {
      dispatch({ type: ACTIONCONSTANTS.REMOVE_FROM_CART, payload: id });
    } else {
      dispatch({
        type: ACTIONCONSTANTS.UPDATE_CART_QUANTITY,
        payload: { id, quantity },
      });
    }
  };

  const cartTotal = cart.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0,
  );

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.cartCard}>
      <Image source={{ uri: item.image }} style={styles.productImg} />
      <View style={styles.infoBox}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <View style={styles.qtyRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
          >
            <Icons
              type="Feather"
              name="minus"
              size={18}
              color={colors.primary}
            />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
          >
            <Icons
              type="Feather"
              name="plus"
              size={18}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtotal}>
          Subtotal: ${(item.price * item.quantity).toFixed(2)}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => handleRemove(item.id)}
      >
        <Icons
          type="Feather"
          name="trash-2"
          size={20}
          color={colors.coralRed}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScreenWrapper
      conatinerStyle={commonStyles.mainContainer}
      statusBarColor={colors.white}
    >
      <Spacer gap={RFPercentage(1)} />
      <CustomHeader text="Cart" />
      <FlatList
        data={cart}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={cart.length ? styles.list : styles.emptyList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        }
        showsVerticalScrollIndicator={false}
      />
      {/* Cart Total */}
      {cart.length > 0 && (
        <View style={styles.totalBar}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalAmount}>${cartTotal.toFixed(2)}</Text>
        </View>
      )}
    </ScreenWrapper>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  cartCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: RFPercentage(2),
    marginHorizontal: RFPercentage(2),
    padding: RFPercentage(2),
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    position: 'relative',
  },
  productImg: {
    width: RFPercentage(8),
    height: RFPercentage(8),
    borderRadius: 8,
    marginRight: RFPercentage(2),
    resizeMode: 'contain',
    backgroundColor: '#f7f7f7',
  },
  infoBox: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textColor,
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  qtyBtn: {
    backgroundColor: colors.lightBlueBackground,
    borderRadius: 4,
    padding: 4,
    marginHorizontal: 6,
  },
  qtyText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.textColor,
    minWidth: 28,
    textAlign: 'center',
  },
  subtotal: {
    fontSize: 13,
    color: colors.textColor,
    marginTop: 2,
  },
  deleteBtn: {
    marginLeft: 8,
    padding: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(255,0,0,0.07)',
  },
  totalBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: RFPercentage(3),
    paddingVertical: RFPercentage(2),
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  totalText: {
    fontSize: 18,
    color: colors.textColor,
    fontWeight: '700',
  },
  totalAmount: {
    fontSize: 19,
    color: colors.primary,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textColor,
    marginTop: RFPercentage(10),
    fontSize: 18,
  },
  list: {
    paddingBottom: RFPercentage(16),
    paddingTop: RFPercentage(2),
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

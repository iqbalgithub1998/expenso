import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/theme';

type TransactionPageProps = {
  title: string;
  color: string;
  onPressBack: () => void;
  children?: React.ReactNode;
};

const TransactionPage: React.FC<TransactionPageProps> = ({
  title,
  color,
  onPressBack,
  children,
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.topSection, { backgroundColor: color }]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginBottom: 15,
          }}
        >
          <TouchableOpacity
            onPress={onPressBack}
            style={{
              position: 'absolute',
              left: -2,
            }}
          >
            <Ionicons
              name="ios-arrow-back-outline"
              size={45}
              color={COLORS.white}
            />
          </TouchableOpacity>
          <Text style={styles.expense}>{title}</Text>
        </View>
        {children}
      </View>
    </View>
  );
};

export default TransactionPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  topSection: {
    flex: 3,
    marginVertical: 22,
    marginHorizontal: 20,
  },
  expense: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 12,
    color: COLORS.white,
  },
});

import {
  Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {COLORS, SIZES} from '../constants/theme';

type Props = {
  isModal: boolean;
  title: string;
  closeModal: () => void;
  children: any;
};

const CustomModal: React.FC<Props> = ({
  title,
  isModal,
  closeModal,
  children,
}) => {
  return (
    <Modal animationType={'slide'} transparent={true} visible={isModal}>
      <StatusBar backgroundColor={COLORS.white} />
      <View style={styles.modalHeader}>
        <Text style={{color: COLORS.black, fontSize: 24, fontWeight: '500'}}>
          {title}
        </Text>
        <TouchableWithoutFeedback onPress={closeModal}>
          <Ionicons
            style={{position: 'absolute', right: 5}}
            name="close"
            size={40}
            color={COLORS.gray}
          />
        </TouchableWithoutFeedback>
      </View>
      <View style={{backgroundColor: '#FFF'}}>{children}</View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalContent: {
    width: '100%',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalHeader: {
    width: '100%',
    height: 50,
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 2,
    position: 'relative',
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import LottieView from 'lottie-react-native';

// interface SuccessModalProps {
//   onClose?: () => void;
//   visible: boolean;
// }

// const SuccessModal: React.FC<SuccessModalProps> = ({visible, onClose}) => {
//   return (
//     <Modal visible={visible} transparent={true} animationType="fade">
//       {/* <LottieView
//         source={require('../assets/lotties/success-animation.json')}
//         autoPlay
//         loop={false}
//         onAnimationFinish={onClose}
//       /> */}
//       <Text>Success !!</Text>
//     </Modal>
//   );
// };

// export default SuccessModal;

// const styles = StyleSheet.create({});

import React, {useState, useEffect, useRef} from 'react';
import {Modal, View, Animated, StyleSheet, Image} from 'react-native';

interface ModalPopProps {
  visible: boolean;
  children?: React.ReactNode;
  onClose: () => void;
}

const ModalPop: React.FC<ModalPopProps> = ({visible, children, onClose}) => {
  const [showModal, setShowModal] = useState(visible);
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          <Image source={require('../assets/images/hero3.jpg')} />
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ModalPop;

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
});

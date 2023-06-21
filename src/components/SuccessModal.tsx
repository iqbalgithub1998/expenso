// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TextInputProps,
//   TextStyle,
//   TouchableOpacity,
//   Modal,
// } from 'react-native';
// import React from 'react';
// import {COLORS} from '../constants/theme';
// import {useState} from 'react';
// import DatePicker, {getFormatedDate} from 'react-native-modern-datepicker';

// import Ionicons from 'react-native-vector-icons/Ionicons';

// interface CustomTextInputProps {
//   placeholder?: string;
//   visible: boolean;
//   onClose: () => void;
// }

// const SuccessModal: React.FC<CustomTextInputProps> = ({visible, onClose}) => {
//   return (
//     <View style={styles.search}>
//       <Modal animationType="slide" transparent={true} visible={visible}>
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text>Success !!!</Text>
//             <TouchableOpacity onPress={onClose}>
//               <Text style={{color: 'white'}}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default SuccessModal;

// const styles = StyleSheet.create({
//   search: {
//     width: '100%',
//     minHeight: 60,
//     borderRadius: 15,
//     borderWidth: 1,
//     borderColor: COLORS.lightgrey,
//     alignSelf: 'center',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 15,
//   },
//   centeredView: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: '#080516',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 20,
//     padding: 35,
//     width: '90%',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   inputBtn: {
//     //borderWidth: 1,
//     borderRadius: 4,
//     //borderColor: "#222",
//     height: 50,
//     paddingLeft: 8,
//     fontSize: 18,
//     justifyContent: 'center',
//     marginTop: 14,
//   },
// });

import React from 'react';
import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import {COLORS} from '../constants/theme';

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({visible, onClose}) => {
  if (!visible) {
    return null; // Return null if the modal is not visible
  }

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Success !!!</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#080516',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 35,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
    color: COLORS.white,
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: COLORS.white,
  },
});

export default SuccessModal;

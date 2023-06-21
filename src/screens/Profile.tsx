// import React, {useContext, useEffect, useState} from 'react';
// import {Alert, StyleSheet, Text, View} from 'react-native';
// import TabContainer from '../components/TabContainer';
// import {getUserId} from '../utils/UserID';
// import firestore from '@react-native-firebase/firestore';
// import {COLORS} from '../constants/theme';
// import CustomButton from '../components/CustomButton';
import {AuthContext} from '../navigation/AuthStackProvider';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppNavigationParams} from '../navigation/AppNavigation';

type Props = NativeStackScreenProps<AppNavigationParams, 'HomeTab'>;

// const Profile: React.FC<Props> = ({navigation, route}) => {
//   const [loggedInUserName, setLoggedInUserName] = useState('');
//   const {logout} = useContext(AuthContext);

//   useEffect(() => {
//     fetchLoggedInUserName();
//   }, []);

//   const fetchLoggedInUserName = async () => {
//     const userId = await getUserId();
//     const userSnapshot = await firestore()
//       .collection('Users')
//       .where('userId', '==', userId)
//       .get();
//     if (!userSnapshot.empty) {
//       const userData = userSnapshot.docs[0].data();
//       const {name} = userData;
//       setLoggedInUserName(name);
//     }
//   };
//   const handleSubmit = () => {
//     logout()
//       .then(() => {
//         Alert.alert('Logout', 'Successfully Logged Out');
//         //AsyncStorage.removeItem('userToken');
//         navigation.navigate('Login');
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };

//   return (
//     <TabContainer>
//       <View
//         style={{
//           flex: 1,
//           justifyContent: 'space-between',
//           alignItems: 'flex-start',
//           marginBottom: 30,
//         }}>
//         <Text style={styles.heading}>Hello !!</Text>
//         <Text style={styles.name}>{loggedInUserName}</Text>

//         <CustomButton
//           title="LOGOUT"
//           onPress={handleSubmit}
//           // Style={styles.button}
//           // titleStyle={styles.ButtonText}
//           Style={[styles.button]}
//           titleStyle={[styles.ButtonText]}
//           backgroundColor={COLORS.primary}
//         />
//       </View>
//     </TabContainer>
//   );
// };

// export default Profile;

// const styles = StyleSheet.create({
//   heading: {
//     marginTop: 10,
//     marginHorizontal: 20,
//     fontSize: 50,
//     fontWeight: '800',
//     color: COLORS.black,
//   },
//   name: {
//     marginHorizontal: 20,
//     fontSize: 80,
//     fontWeight: 'bold',
//     color: COLORS.primary,
//   },
//   button: {
//     width: '90%',
//     // minHeight: 60,
//     // backgroundColor: COLORS.primary,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     // marginBottom: 5,
//     // borderRadius: 15,
//     elevation: 8,
//     // marginTop:6,
//     // zIndex:0
//     // width: SIZES.width - 30,
//     minHeight: 60,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 5,
//     borderRadius: 15,
//     alignSelf: 'center',
//   },
//   ButtonText: {
//     fontWeight: '500',
//     fontSize: 22,
//     color: COLORS.white,
//   },
// });

import React, {useContext, useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import TabContainer from '../components/TabContainer';
import {getUserId} from '../utils/UserID';
import firestore from '@react-native-firebase/firestore';
import {COLORS} from '../constants/theme';
import CustomButton from '../components/CustomButton';

const Profile: React.FC<Props> = ({navigation, route}) => {
  const [loggedInUserName, setLoggedInUserName] = useState('');
  const {logout} = useContext(AuthContext);

  useEffect(() => {
    fetchLoggedInUserName();
  }, []);

  const fetchLoggedInUserName = async () => {
    const userId = await getUserId();
    const userSnapshot = await firestore()
      .collection('Users')
      .where('userId', '==', userId)
      .get();
    if (!userSnapshot.empty) {
      const userData = userSnapshot.docs[0].data();
      const {name} = userData;
      setLoggedInUserName(name);
    }
  };

  const handleSubmit = () => {
    logout()
      .then(() => {
        Alert.alert('Logout', 'Successfully Logged Out');
        //AsyncStorage.removeItem('userToken');
        navigation.navigate('Login');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <TabContainer>
      <View style={styles.container}>
        <Text style={styles.heading}>Hello!!</Text>
        <Text style={styles.name}>{loggedInUserName}</Text>

        <CustomButton
          title="LOGOUT"
          onPress={handleSubmit}
          Style={[styles.button]}
          titleStyle={[styles.buttonText]}
          backgroundColor={COLORS.primary}
        />
      </View>
    </TabContainer>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 50,
    fontWeight: '800',
    color: COLORS.black,
  },
  name: {
    fontSize: 80,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  button: {
    width: '90%',
    minHeight: 60,
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontWeight: '500',
    fontSize: 22,
    color: COLORS.white,
  },
});

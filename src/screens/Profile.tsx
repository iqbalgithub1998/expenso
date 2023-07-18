import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {getUserId} from '../utils/UserID';
import firestore from '@react-native-firebase/firestore';
import {COLORS} from '../constants/theme';
import {deleteAsyncStorage} from '../utils/AuthChecker';
import {useDispatch, useSelector} from 'react-redux';
import {removeUser, updateUser} from '../Store/Slice/UserSlice';
import {RootState} from '../Store/rootReducer';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import CustomButton from '../components/CustomButton';

interface ListItem {
  label: string;
  icon: string;
  library: any; // Replace 'any' with the specific type of the library component
}

const Profile: React.FC<any> = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector((store: RootState) => store.user);
  // const [loggedInUserName, setLoggedInUserName] = useState('');

  // useEffect(() => {
  //   fetchLoggedInUserName();
  // }, []);

  // const fetchLoggedInUserName = async () => {
  //   const userId = await getUserId();
  //   const userSnapshot = await firestore()
  //     .collection('Users')
  //     .where('userId', '==', userId)
  //     .get();
  //   if (!userSnapshot.empty) {
  //     const userData = userSnapshot.docs[0].data();
  //     const {name} = userData;
  //     setLoggedInUserName(name);
  //   }
  // };
  // Inside your component
  const userData = useSelector((state: RootState) => state.userdata.userData);
  // You can console.log or perform any desired actions with the userData
  //console.log('list for testing', userData);

  const logout = async () => {
    await deleteAsyncStorage('ExpensoUserData');
    dispatch(removeUser());
  };

  const handleSubmit = () => {
    console.log('Profile Pic clicked');
  };

  const handleListItemPress = (label: string) => {
    if (label === 'Logout') {
      logout();
    } else {
      console.log(`${label} clicked`);
    }
  };

  const handleLogoutConfirmation = () => {
    // Alert.alert(
    //   'Logout Confirmation',
    //   'Are you sure you want to logout?',
    //   [
    //     {text: 'No', style: 'cancel'},
    //     {text: 'Yes', onPress: logout},
    //   ],
    //   {cancelable: true},
    // );
    toggleModal();
  };

  const handlesettingsClick = () => {
    navigation.navigate('Settings');
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const listItemData = [
    {label: 'Account', icon: 'wallet', library: Entypo},
    {label: 'Settings', icon: 'md-settings', library: Ionicons},
    {label: 'Export Data', icon: 'upload', library: AntDesign},
    {label: 'Logout', icon: 'logout', library: MaterialIcons},
  ];

  const renderItem = ({item, index}: {item: ListItem; index: number}) => {
    const IconComponent = item.library;
    const itemStyle =
      item.label === 'Logout' ? styles.logoutItem : styles.innerBox;
    const itemStyle2 =
      index < listItemData.length - 1
        ? styles.listItem
        : [styles.listItem, styles.lastListItem];
    const iconColor = item.label === 'Logout' ? COLORS.red : COLORS.primary;
    //const handleLogout = item.label === 'Logout' ? logout() : handleListItemPress();

    return (
      <TouchableOpacity
        style={itemStyle2}
        onPress={() => {
          if (item.label === 'Logout') {
            handleLogoutConfirmation();
          } else if (item.label === 'Settings') {
            handlesettingsClick();
          } else {
            handleListItemPress(item.label);
          }
        }}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 15}}>
          <View style={itemStyle}>
            <IconComponent name={item.icon} size={30} color={iconColor} />
          </View>
          <Text style={styles.listItemLabel}>{item.label}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.top}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <View style={styles.outerCircle}>
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.innerCircle}>
                <Image
                  source={require('../assets/images/hero2.jpg')}
                  style={styles.profilepic}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: 'flex-start',
                justifyContent: 'space-evenly',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: COLORS.grey,
                  fontWeight: '700',
                  left: 22,
                }}>
                User Name
              </Text>
              <Text style={styles.name}>{user.name}</Text>
            </View>
          </View>
          <TouchableWithoutFeedback onPress={() => console.log('Pressed!')}>
            <MaterialIcons name="edit" size={35} color={COLORS.primary} />
            {/* <Feather name="edit-2" size={35} color={COLORS.black} /> */}
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.box}>
          {/* {listItemData.map((item, index) => {
        const IconComponent = item.library;
        return (
          <TouchableOpacity
            key={index}
            style={styles.listItem}
            onPress={() => handleListItemPress()}
          >
            <IconComponent name={item.icon} size={24} color={COLORS.primary} style = {{paddingRight:10}} />
            <Text style={styles.listItemLabel}>{item.label}</Text>
          </TouchableOpacity>
        );
      })} */}
          <FlatList
            data={listItemData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <Modal
          style={{width: '100%', marginLeft: 0, marginBottom: 0}}
          isVisible={isModalVisible}
          onBackButtonPress={() => setModalVisible(false)}
          onBackdropPress={() => setModalVisible(false)}>
          <View style={styles.modalview}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.logouttext}>Logout ?</Text>
              <Text style={{color: COLORS.grey, fontWeight: '500'}}>
                Are you sure you want to log out?
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: 18,
              }}>
              <CustomButton
                Style={[styles.modalbutton]}
                title="No"
                titleStyle={{
                  color: COLORS.primary,
                  fontSize: 15,
                  fontWeight: '600',
                }}
                backgroundColor={COLORS.secondary}
                onPress={toggleModal}
              />
              <CustomButton
                Style={[styles.modalbutton]}
                title="Yes"
                titleStyle={{
                  color: COLORS.white,
                  fontSize: 15,
                  fontWeight: '600',
                }}
                backgroundColor={COLORS.primary}
                onPress={() => {
                  logout();
                }}
              />
            </View>
            {/* <Button title="Hide modal" onPress={toggleModal} /> */}
          </View>
        </Modal>

        {/* <View style={styles.button}>
        <Button color="red" title="logout" onPress={logout}></Button>
      </View> */}
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  heading: {
    marginTop: 10,
    marginHorizontal: 20,
    fontSize: 50,
    fontWeight: '800',
    color: COLORS.black,
  },
  name: {
    marginHorizontal: 20,
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  button: {
    marginTop: 15,
    alignSelf: 'center',
  },
  container: {flex: 1, marginTop: 50, backgroundColor: COLORS.bglight},
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  outerCircle: {
    height: 65,
    width: 65,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    // Adjust the value to increase or decrease the gap
  },
  innerCircle: {
    height: 55,
    width: 55,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilepic: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 30,
  },
  listItem: {
    paddingVertical: 15,
    //paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    //marginBottom:15,
    borderBottomWidth: 1,
    borderColor: COLORS.bordergrey,
  },
  listItemLabel: {
    fontSize: 20,
    color: COLORS.black,
    fontWeight: '600',
  },
  box: {
    marginTop: 30,
    borderRadius: 10,
    margin: 15,
    backgroundColor: COLORS.white,
    elevation: 2,
    paddingVertical: 12,
    paddingTop: 5,
    paddingBottom: 4,

    //paddingHorizontal:10
  },
  innerBox: {
    borderRadius: 10,
    height: 50,
    width: 50,
    marginRight: 10,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    //paddingLeft:10
  },
  logoutItem: {
    backgroundColor: COLORS.lightred,
    borderRadius: 10,
    height: 50,
    width: 50,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastListItem: {
    borderBottomWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  modalview: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: COLORS.white,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  logouttext: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.black,
    marginBottom: 10,
  },
  modalbutton: {
    minHeight: 60,
    width: '50%',
    // borderWidth: 1,
    // borderColor: 'black',
    borderRadius: 15,
    marginHorizontal: 5,
  },
});

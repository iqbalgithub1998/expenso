import {StyleSheet, Text, View, Alert} from 'react-native';
import {useState, useEffect, useContext} from 'react';
import {COLORS} from '../constants/theme';
import CustomButton from '../components/CustomButton';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../navigation/AuthStackProvider';

const Home: React.FC<any> = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const {logout} = useContext(AuthContext);

  //const formik = useFormikContext();

  const extractGivenName = (displayName: any) => {
    const names = displayName.split(' ');
    return names.length > 0 ? names[0] : '';
  };

  // useEffect(() => {
  //   // Fetch the user's display name from Firebase
  //   const fetchUserName = async () => {
  //     const currentUser = auth().currentUser;
  //     if (currentUser) {
  //       let displayName = currentUser.displayName || '';

  //       // Check if the user is signed in with Google
  //       const {providerData} = currentUser;
  //       const googleProvider = providerData.find(
  //         provider => provider.providerId === 'google.com',
  //       );

  //       if (googleProvider) {
  //         console.log(googleProvider);
  //         const {givenName} = googleProvider.user;
  //         displayName = givenName || displayName;
  //       }

  //       setUserName(displayName);
  //     }
  //   };

  //   fetchUserName();
  // }, []);

  const handleSubmit = () => {
    logout()
      .then(() => {
        Alert.alert('Logout', 'Successfully Logged Out');
        navigation.navigate('Login');
      })
      .catch(error => {
        console.log(error);
        return 'logout failed';
      });
  };

  const pressHandler = () => {
    navigation.navigate('Income');
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={{flex: 1, marginHorizontal: 20, justifyContent: 'flex-end'}}>
        <View
          style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
          <Text
            style={{fontSize: 60, fontWeight: '800', color: COLORS.primary}}>
            Welcome
          </Text>
          <Text style={{fontSize: 50, fontWeight: 'bold', color: COLORS.black}}>
            {userName}!
          </Text>
        </View>

        <View style={{marginVertical: 22}}>
          <CustomButton
            title="Log Out"
            onPress={handleSubmit}
            Style={styles.button}
            titleStyle={styles.ButtonText}
          />
          <CustomButton
            title="Expense"
            onPress={pressHandler}
            Style={styles.button}
            titleStyle={styles.ButtonText}
          />
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    minHeight: 60,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    borderRadius: 15,
    elevation: 8,
    marginTop: 6,
  },
  ButtonText: {
    fontWeight: '500',
    fontSize: 22,
    color: COLORS.white,
  },
});

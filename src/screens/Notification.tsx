// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React, {useState} from 'react';
// import {COLORS} from '../constants/theme';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {Checkbox, Switch} from 'react-native-paper';

// const Notification: React.FC<any> = ({navigation}) => {
//   const [lightChecked, setLightChecked] = useState(false);
//   const [darkChecked, setDarkChecked] = useState(false);
//   const [deviceThemeChecked, setDeviceThemeChecked] = useState(false);

//   const handlePress = () => {
//     navigation.goBack();
//   };

//   const handleonPress = (checkboxName: string) => {
//     switch (checkboxName) {
//       case 'light':
//         setLightChecked(true);
//         setDarkChecked(false);
//         setDeviceThemeChecked(false);
//         break;
//       case 'dark':
//         setLightChecked(false);
//         setDarkChecked(true);
//         setDeviceThemeChecked(false);
//         break;
//       case 'deviceTheme':
//         setLightChecked(false);
//         setDarkChecked(false);
//         setDeviceThemeChecked(true);
//         break;
//       default:
//         break;
//     }
//     console.log('Will change Notification');
//   };

//   const [isSwitchOn, setIsSwitchOn] = useState(false);

//   const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

//   return (
//     <View style={styles.container}>
//       <View style={styles.container2}>
//         <TouchableOpacity onPress={handlePress} style={styles.arrowContainer}>
//           <Ionicons
//             name="ios-arrow-back-outline"
//             size={45}
//             color={COLORS.black}
//           />
//         </TouchableOpacity>
//         <Text style={styles.title}>Notification</Text>
//       </View>
//       <View style={styles.block}>
//         <View style={styles.box}>
//           <Text style={{fontSize: 17, fontWeight: '600', color: COLORS.black}}>
//             Expense Alert
//           </Text>
//           <Text style={{fontSize: 13, fontWeight: '500', color: COLORS.grey}}>
//             Get notifications about your expenses
//           </Text>
//         </View>
//         <Switch
//           value={isSwitchOn}
//           onValueChange={onToggleSwitch}
//           color={COLORS.primary}
//         />
//       </View>
//       <View style={styles.block}>
//         <View style={styles.box}>
//           <Text style={{fontSize: 17, fontWeight: '600', color: COLORS.black}}>
//             Budget
//           </Text>
//           <Text style={{fontSize: 13, fontWeight: '500', color: COLORS.grey}}>
//             Get notifications on budget limit getting exceeded
//           </Text>
//         </View>
//         <Switch
//           value={isSwitchOn}
//           onValueChange={onToggleSwitch}
//           color={COLORS.primary}
//         />
//       </View>
//       <View style={styles.block}>
//         <View style={styles.box}>
//           <Text style={{fontSize: 17, fontWeight: '600', color: COLORS.black}}>
//             Tips and Articles
//           </Text>
//           <Text style={{fontSize: 13, fontWeight: '500', color: COLORS.grey}}>
//             Nugget sized practical financial advises
//           </Text>
//         </View>
//         <Switch
//           value={isSwitchOn}
//           onValueChange={onToggleSwitch}
//           color={COLORS.primary}
//         />
//       </View>
//     </View>
//   );
// };

// export default Notification;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//   },
//   container2: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: COLORS.white,
//     marginTop: 30,
//     borderBottomWidth: 1,
//     paddingBottom: 5,
//     borderColor: COLORS.bordergrey,
//   },
//   arrowContainer: {
//     left: 10,
//   },
//   title: {
//     flex: 1,
//     fontSize: 25,
//     fontWeight: 'bold',
//     marginVertical: 10,
//     color: COLORS.black,
//     textAlign: 'center',
//     right: 15,
//   },
//   block: {
//     marginTop: 15,
//     minHeight: 60,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     flexDirection: 'row',
//     paddingRight: 10,
//   },
//   text: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: COLORS.black,
//     paddingLeft: 15,
//   },
//   icon: {
//     paddingRight: 5,
//   },
//   box: {
//     paddingLeft: 15,
//   },
// });

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Checkbox, Switch} from 'react-native-paper';

const Notification: React.FC<any> = ({navigation}) => {
  const [expenseAlertSwitch, setExpenseAlertSwitch] = useState(false);
  const [budgetSwitch, setBudgetSwitch] = useState(false);
  const [tipsSwitch, setTipsSwitch] = useState(false);

  const handlePress = () => {
    navigation.goBack();
  };

  const handleSwitchToggle = (switchName: string) => {
    switch (switchName) {
      case 'expenseAlert':
        setExpenseAlertSwitch(!expenseAlertSwitch);
        break;
      case 'budget':
        setBudgetSwitch(!budgetSwitch);
        break;
      case 'tips':
        setTipsSwitch(!tipsSwitch);
        break;
      default:
        break;
    }
    console.log('Will change Notification');
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <TouchableOpacity onPress={handlePress} style={styles.arrowContainer}>
          <Ionicons
            name="ios-arrow-back-outline"
            size={45}
            color={COLORS.black}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Notification</Text>
      </View>
      <View style={styles.block}>
        <View style={styles.box}>
          <Text style={{fontSize: 17, fontWeight: '600', color: COLORS.black}}>
            Expense Alert
          </Text>
          <Text style={{fontSize: 13, fontWeight: '500', color: COLORS.grey}}>
            Get notifications about your expenses
          </Text>
        </View>
        <Switch
          value={expenseAlertSwitch}
          onValueChange={() => handleSwitchToggle('expenseAlert')}
          color={COLORS.primary}
        />
      </View>
      <View style={styles.block}>
        <View style={styles.box}>
          <Text style={{fontSize: 17, fontWeight: '600', color: COLORS.black}}>
            Budget
          </Text>
          <Text style={{fontSize: 13, fontWeight: '500', color: COLORS.grey}}>
            Get notifications on budget limit getting exceeded
          </Text>
        </View>
        <Switch
          value={budgetSwitch}
          onValueChange={() => handleSwitchToggle('budget')}
          color={COLORS.primary}
        />
      </View>
      <View style={styles.block}>
        <View style={styles.box}>
          <Text style={{fontSize: 17, fontWeight: '600', color: COLORS.black}}>
            Tips and Articles
          </Text>
          <Text style={{fontSize: 13, fontWeight: '500', color: COLORS.grey}}>
            Nugget sized practical financial advises
          </Text>
        </View>
        <Switch
          value={tipsSwitch}
          onValueChange={() => handleSwitchToggle('tips')}
          color={COLORS.primary}
        />
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    marginTop: 30,
    borderBottomWidth: 1,
    paddingBottom: 5,
    borderColor: COLORS.bordergrey,
  },
  arrowContainer: {
    left: 10,
  },
  title: {
    flex: 1,
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 10,
    color: COLORS.black,
    textAlign: 'center',
    right: 15,
  },
  block: {
    marginTop: 15,
    minHeight: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
    paddingLeft: 15,
  },
  icon: {
    paddingRight: 5,
  },
  box: {
    paddingLeft: 15,
  },
});

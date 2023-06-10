import {StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';

import AppNavigation from './src/navigation/AppNavigation';
import {COLORS} from './src/constants/theme';
import Expense from './src/screens/Expense';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <AppNavigation
        Initial={undefined}
        Login={undefined}
        SignUp={undefined}
        Welcome={undefined}
        ForgotPassword={undefined}
        Confirmation={undefined}
        Home={undefined}
        Expense={undefined}
      />
      {/* <Expense /> */}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});

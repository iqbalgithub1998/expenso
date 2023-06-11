import {StyleSheet, View} from 'react-native';
import React from 'react';

import AppNavigation from './src/navigation/AppNavigation';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <View style={styles.mainContainer}>
      <AppNavigation
        Initial={undefined}
        Login={undefined}
        SignUp={undefined}
        Welcome={undefined}
        ForgotPassword={undefined}
        Confirmation={undefined}
        HomeTab={undefined}
        Expense={undefined}
        Income={undefined}
        Transfer={undefined}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

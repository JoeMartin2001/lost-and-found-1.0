import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const OopsComponent = () => {
  return (
    <View style={styles.main}>
      <Text>Oops, something went wrong!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OopsComponent;

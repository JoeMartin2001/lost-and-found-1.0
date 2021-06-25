import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {colors} from '../config/colors';
import LottieView from 'lottie-react-native';

const CustomLoading = () => {
  return (
    <View style={styles.main}>
      <LottieView
        source={require('../../assets/pocket-rocket.json')}
        autoPlay
        loop
        style={{width: 300}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
});

export default CustomLoading;

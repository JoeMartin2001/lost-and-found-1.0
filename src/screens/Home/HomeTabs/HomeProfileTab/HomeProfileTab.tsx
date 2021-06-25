import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {NavigationProp, Route} from '@react-navigation/core';
import {AppParamList} from '../../../../navigation/AppParamList';
import {colors} from '../../../../config/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useQuery} from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseUrl} from '../../../../config/baseUrl';
import CustomLoading from '../../../../components/CustomLoading';
import OopsComponent from '../../../../components/OopsComponent';
import HomeProfileTabUserInfo from './HomeProfileTabUserInfo';
import HomeProfileLang from './HomeProfileLang';
import HomeProfileSettings from './HomeProfileSettings';

const HomeProfileTab = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<AppParamList, 'Profile'>;
  route: Route<'Profile'>;
}) => {
  const {data, isFetching, isError} = useQuery([], async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const response = await fetch(`${baseUrl}/api/auth/getUserById/${userId}`);
      const d = await response.json();

      return d;
    } catch (error) {
      throw error;
    }
  });

  if (isFetching) return <CustomLoading />;
  if (isError) return <OopsComponent />;

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}} style={styles.main}>
      <View style={styles.bodyView}>
        <View style={styles.avatarView}>
          <View style={styles.avatarIconWrapper}>
            <FontAwesome5 name="user-circle" size={80} color={colors.primary} />
          </View>
        </View>
        <HomeProfileTabUserInfo data={data} />
        <HomeProfileLang />
        <HomeProfileSettings />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.primaryWithOpacity,
  },
  bodyView: {
    marginTop: 60,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  avatarView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -40,
  },
  avatarIconWrapper: {
    width: 90,
    height: 90,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default HomeProfileTab;

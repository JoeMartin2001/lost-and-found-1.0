import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from 'react-native';
import {Divider} from 'react-native-paper';
import {ListItem} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppParamList} from '../../../../navigation/AppParamList';
import {colors} from '../../../../config/colors';
import {useTranslation} from 'react-i18next';

const menuItems = [
  {
    title: 'Terms & Services',
    subTitle: 'Theme, preferences, etc',
    Icon: () => (
      <MaterialIcons name="help-outline" size={24} color={colors.primary} />
    ),
    to: 'TermsAndServices',
  },
  {
    title: 'Support',
    subTitle: 'Theme, preferences, etc',
    Icon: () => (
      <AntDesign name="customerservice" size={24} color={colors.primary} />
    ),
    to: 'Support',
  },
  {
    title: 'About Us',
    subTitle: 'Developers, contact, etc',
    Icon: () => <Feather name="info" size={24} color={colors.primary} />,
    to: 'About',
  },
];

const HomeProfileSettings = () => {
  const {t, i18n} = useTranslation();
  const navigation: NavigationProp<AppParamList, 'Home'> = useNavigation();

  return (
    <View style={styles.settingsView}>
      {menuItems.map((item, idx) => (
        <TouchableOpacity
          key={idx.toString()}
          onPress={() => navigation.navigate(item.to as keyof AppParamList)}>
          <View style={styles.settingsViewItem}>
            {item.Icon()}
            <Text style={styles.settingsViewItemText}>{t(item.title)}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  settingsView: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 10,
    marginVertical: 20,
  },
  settingsViewItem: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsViewItemText: {
    marginLeft: 15,
    fontFamily: 'AirbnbCerealLight',
  },
});

export default HomeProfileSettings;

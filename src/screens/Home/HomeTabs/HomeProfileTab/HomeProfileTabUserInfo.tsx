import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {View, Text} from 'react-native';
import {Divider} from 'react-native-paper';

const HomeProfileTabUserInfo = ({
  data,
}: {
  data: {fullName: string; username: string; password: string; email: string};
}) => {
  const {t, i18n} = useTranslation();

  return (
    <View style={styles.userInfoView}>
      <View style={styles.userInfoViewItem}>
        <Text style={styles.userInfoViewItemTitle}>{t('Name')}</Text>
        <Text style={styles.userInfoViewItemInfo}>{data.fullName}</Text>
      </View>
      <Divider />
      <View style={styles.userInfoViewItem}>
        <Text style={styles.userInfoViewItemTitle}>{t('Username')}</Text>
        <Text style={styles.userInfoViewItemInfo}>{data.username}</Text>
      </View>
      <Divider />
      <View style={styles.userInfoViewItem}>
        <Text style={styles.userInfoViewItemTitle}>{t('Password')}</Text>
        <Text style={styles.userInfoViewItemInfo}>{data.password}</Text>
      </View>
      <Divider />
      <View style={styles.userInfoViewItem}>
        <Text style={styles.userInfoViewItemTitle}>{t('Email')}</Text>
        <Text style={styles.userInfoViewItemInfo}>{data.email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfoView: {
    width: '90%',
    marginTop: 60,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 10,
  },
  userInfoViewInner: {
    borderRadius: 20,
    flex: 1,
  },
  userInfoViewItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  userInfoViewItemTitle: {
    color: 'grey',
    marginBottom: 10,
    fontSize: 16,
    fontFamily: 'AirbnbCerealLight',
  },
  userInfoViewItemInfo: {
    fontSize: 16,
    fontFamily: 'AirbnbCerealLight',
  },
});

export default HomeProfileTabUserInfo;

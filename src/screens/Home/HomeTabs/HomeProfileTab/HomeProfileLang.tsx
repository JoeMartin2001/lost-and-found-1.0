import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../../../config/colors';

const langItems = [
  {name: 'uz', displayName: "O'zb"},
  {name: 'ru', displayName: 'Рус'},
  {name: 'en', displayName: 'Eng'},
];

const HomeProfileLang = () => {
  const {t, i18n} = useTranslation();

  const isLangSelected = (l: string) => i18n.language === l;

  const handleLangSelect = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const renderLangItem = (l: {name: string; displayName: string}) => {
    return (
      <View
        key={l.name}
        style={
          isLangSelected(l.name)
            ? styles.langViewItemSelected
            : styles.langViewItem
        }>
        <TouchableOpacity
          onPress={() => handleLangSelect(l.name)}
          style={
            isLangSelected(l.name)
              ? styles.langViewItemSelectedTouchable
              : styles.langViewItemTouchable
          }>
          <Text
            style={
              isLangSelected(l.name)
                ? styles.langViewItemSelectedText
                : styles.langViewItemText
            }>
            {l.displayName}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.langViewWrapper}>
      <Text style={styles.langViewText}>{t('App language')}</Text>
      <View style={styles.langView}>
        {langItems.map((l, idx) => renderLangItem(l))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  langViewWrapper: {
    width: '90%',
    height: 100,
  },
  langView: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 10,
  },
  langViewText: {
    fontSize: 16,
    color: 'grey',
    marginVertical: 10,
    fontFamily: 'AirbnbCerealLight',
  },
  langViewItem: {
    flex: 1,
    borderRadius: 10,
  },
  langViewItemTouchable: {
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  langViewItemText: {
    fontSize: 18,
    color: '#000000',
    fontFamily: 'AirbnbCerealLight',
  },
  langViewItemSelected: {
    flex: 1,
    borderRadius: 10,
  },
  langViewItemSelectedText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'AirbnbCerealLight',
  },
  langViewItemSelectedTouchable: {
    backgroundColor: colors.primary,
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeProfileLang;

import {NavigationProp, Route} from '@react-navigation/core';
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import {useQuery} from 'react-query';
import CustomLoading from '../../components/CustomLoading';
import OopsComponent from '../../components/OopsComponent';
import {baseUrl} from '../../config/baseUrl';
import {colors} from '../../config/colors';
import {getParsedDate, getParsedTime} from '../../functions/timeParsers';
import {AppParamList} from '../../navigation/AppParamList';
import Feather from 'react-native-vector-icons/Feather';
import {callNumber} from '../../utils/makePhoneCall';
import {Divider, FAB} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

// const data = {
//   title: 'Title',
//   date: new Date(),
//   case: 'Lost',
//   description: 'description',
//   phone: 'phone',
//   region: 'region',
// };

const ItemInfo = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<AppParamList, 'ItemInfo'>;
  route: Route<'ItemInfo', {id: string}>;
}) => {
  const {t, i18n} = useTranslation();
  const {
    params: {id},
  } = route;

  const {isFetching, isError, data} = useQuery(['itemInfo', id], async () => {
    try {
      const response = await fetch(`${baseUrl}/api/item/getItemById/${id}`);
      const d = await response.json();
      return d;
    } catch (error) {
      throw error;
    }
  });

  if (isFetching) return <CustomLoading />;
  if (isError) return <OopsComponent />;

  return (
    <View style={styles.main}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.bodyView}>
          <View style={styles.bodyItemView}>
            <Text style={styles.itemTitle}>{t('Title')}:</Text>
            <Text style={styles.itemResult}>{data.title}</Text>
          </View>
          <Divider />
          <View style={styles.bodyItemView}>
            <Text style={styles.itemTitle}>{t('Case')}:</Text>
            <Text style={styles.itemResult}>{data.case}</Text>
          </View>
          <Divider />
          <View style={styles.bodyItemView}>
            <Text style={styles.itemTitle}>{t('Date')}:</Text>
            <Text style={styles.itemResult}>
              {getParsedDate(data.date)}, {getParsedTime(data.date)}
            </Text>
          </View>
          <Divider />
          <View style={styles.bodyItemView}>
            <Text style={styles.itemTitle}>{t('Phone')}:</Text>
            <Text style={styles.itemResult}>{data.phone}</Text>
          </View>
          <Divider />
          <View style={styles.bodyItemView}>
            <Text style={styles.itemTitle}>{t('Region')}:</Text>
            <Text style={styles.itemResult}>{data.region}</Text>
          </View>
          <Divider />
          <View style={styles.bodyItemView}>
            <Text style={styles.itemTitle}>{t('Description')}:</Text>
            <Text style={styles.itemResult}>{data.description}</Text>
          </View>
        </View>
        <View style={styles.buttonView}>
          <FAB
            icon="phone"
            color="#ffffff"
            style={{backgroundColor: 'green'}}
            onPress={() => callNumber(data.phone)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  bodyView: {
    borderWidth: 1,
    borderColor: '#e5e5e5',
    margin: 20,
    borderRadius: 10,
  },
  bodyItemView: {
    marginBottom: 3,
    marginHorizontal: 15,
    paddingVertical: 10,
    // borderBottomWidth: 1,
    borderColor: '#e5e5e5',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'AirbnbCerealLight',
    color: 'grey',
  },
  itemResult: {
    fontStyle: 'italic',
    fontSize: 18,
    fontFamily: 'AirbnbCerealLight',
  },
  buttonView: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default ItemInfo;

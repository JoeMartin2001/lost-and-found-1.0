import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  TextInput as RNTextInput,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {TextInput} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {regions} from '../../../../common/regions';
import DatePickerComponent from '../../../../components/DatePickerComponent';
import {colors} from '../../../../config/colors';
import {useMutation} from 'react-query';
import {baseUrl} from '../../../../config/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {Button} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTranslation} from 'react-i18next';

const HomeUploadTab = () => {
  const {t, i18n} = useTranslation();
  const [title, setTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCase, setSelectedCase] = useState('Lost');
  const [selectedRegion, setSelectedRegion] = useState('Toshkent');

  const {mutate, isLoading} = useMutation(async () =>
    fetch(`${baseUrl}/api/item/createItem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        phone,
        case: selectedCase,
        region: selectedRegion,
        date: selectedDate,
        user: await AsyncStorage.getItem('userId'),
      }),
    })
      .then(res => res.json())
      .then(() => {
        setTitle('');
        setDescription('');
        setPhone('');
        showMessage({
          message: 'Your item has successfully been uploaded!',
          type: 'success',
        });
      })
      .catch(err => console.log(err)),
  );

  const isSubmitBtnDisabled = () =>
    title && description && phone ? false : true;

  return (
    <View style={styles.main}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.bodyView}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>{t('Upload an item')}</Text>
            <AntDesign name="rocket1" size={26} color={colors.primary} />
          </View>

          <View style={styles.inputView}>
            <TextInput
              selectionColor="#000000"
              label={t('Title')}
              mode="outlined"
              theme={{colors: {primary: 'red', background: '#ffffff'}}}
              value={title}
              onChangeText={text => setTitle(text)}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              selectionColor="#000000"
              label={t('Description')}
              mode="outlined"
              theme={{colors: {primary: 'red', background: '#ffffff'}}}
              value={description}
              onChangeText={text => setDescription(text)}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              keyboardType="phone-pad"
              selectionColor="#000000"
              label={t('Phone')}
              mode="outlined"
              theme={{colors: {primary: 'red', background: '#ffffff'}}}
              value={phone}
              style={{fontFamily: 'AirbnbCerealLight'}}
              onChangeText={text => setPhone(text)}
            />
          </View>

          <View style={styles.pickerView}>
            <Picker
              prompt={t('Case')}
              selectedValue={selectedCase}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCase(itemValue)
              }>
              <Picker.Item label={t('Lost')} value="Lost" />
              <Picker.Item label={t('Found')} value="Found" />
            </Picker>
          </View>

          <View style={styles.pickerView}>
            <Picker
              prompt={t('Region')}
              selectedValue={selectedRegion}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedRegion(itemValue)
              }>
              {regions.map((region: string, idx: number) => (
                <Picker.Item label={region} value={region} key={idx} />
              ))}
            </Picker>
          </View>

          <DatePickerComponent date={selectedDate} setDate={setSelectedDate} />

          <View style={styles.bottomView}>
            <TouchableOpacity
              disabled={isSubmitBtnDisabled()}
              onPress={() => mutate()}
              style={
                isSubmitBtnDisabled()
                  ? styles.bottomTouchableDisabled
                  : styles.bottomTouchable
              }>
              {isLoading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.bottomTouchableText}>{t('Upload')}</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    fontFamily: 'AirbnbCerealLight',
    backgroundColor: '#f5f5f5',
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: 30,
    marginRight: 10,
  },
  bodyView: {
    marginTop: 20,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    flex: 1,
    paddingHorizontal: 10,
  },
  pickerView: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: '#ffffff',
  },
  inputView: {
    marginBottom: 5,
  },
  bottomView: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 20,
  },
  bottomTouchable: {
    width: 250,
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomTouchableDisabled: {
    width: 250,
    height: 50,
    backgroundColor: '#c8c8c8',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomTouchableText: {
    fontSize: 18,
    color: '#ffffff',
    fontFamily: 'AirbnbCerealLight',
  },
});

export default HomeUploadTab;

import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {Modal, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';

const SelectLangModal = ({
  isModalVisible,
  setModalVisible,
}: {
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {t, i18n} = useTranslation();

  return (
    <Modal
      visible={isModalVisible}
      transparent
      onRequestClose={() => setModalVisible(false)}>
      <View style={styles.mainView}>
        <View style={styles.pickerView}>
          <View style={styles.headerView}>
            <Text style={styles.headerViewText}>Select Language</Text>
          </View>
          {/* <Picker
            prompt="Case"
            mode="dropdown"
            selectedValue={i18n.language}
            onValueChange={(itemValue, itemIndex) =>
              i18n.changeLanguage(itemValue)
            }>
            <Picker.Item label="O'zbek" value="uz" />
            <Picker.Item label="Русский" value="ru" />
            <Picker.Item label="English" value="en" />
          </Picker> */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerView: {
    backgroundColor: '#ffffff',
    width: '80%',
    height: '50%',
  },
  headerView: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerViewText: {
    fontSize: 20,
  },
});

export default SelectLangModal;

import React, {Dispatch, SetStateAction} from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useQuery} from 'react-query';
import CustomLoading from '../../../../components/CustomLoading';
import {baseUrl} from '../../../../config/baseUrl';
import {getParsedDate, getParsedTime} from '../../../../functions/timeParsers';

const HomeLostInfoModal = ({
  itemId,
  isInfoModalVisible,
  setIsInfoModalVisible,
}: {
  itemId: string;
  isInfoModalVisible: boolean;
  setIsInfoModalVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  const {isFetching, isError, data} = useQuery(
    ['itemInfo', itemId],
    async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/item/getitemById/${itemId}`,
        );
        const data = await response.json();

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  );

  if (isFetching) return <CustomLoading />;

  if (isError)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Oops, something went wrong!</Text>
      </View>
    );

  console.log(data);

  return (
    <Modal visible={isInfoModalVisible} animationType="slide">
      <View style={styles.main}>
        <View style={styles.headerView}>
          <Text style={styles.headerTitle}>Item Details</Text>
          <View style={styles.closeView}>
            <TouchableOpacity
              style={styles.closeOpacity}
              onPress={() => setIsInfoModalVisible(false)}>
              <AntDesign name="closesquareo" size={25} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bodyView}>
          <View style={styles.bodyItemView}>
            <Text>Title:</Text>
            <Text>{data.title}</Text>
          </View>
          <View style={styles.bodyItemView}>
            <Text>Case:</Text>
            <Text>{data.case}</Text>
          </View>
          <View style={styles.bodyItemView}>
            <Text>Date:</Text>
            <Text>
              {getParsedDate(data.date)}, {getParsedTime(data.date)}
            </Text>
          </View>
          <View style={styles.bodyItemView}>
            <Text>Description:</Text>
            <Text>{data.description}</Text>
          </View>
          <View style={styles.bodyItemView}>
            <Text>Phone:</Text>
            <Text>{data.phone}</Text>
          </View>
          <View style={styles.bodyItemView}>
            <Text>Region:</Text>
            <Text>{data.region}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerView: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  closeView: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  closeOpacity: {
    flex: 1,
    padding: 5,
  },
  bodyView: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  bodyItemView: {
    marginBottom: 5,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default HomeLostInfoModal;

import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ListItem} from 'react-native-elements';
import {getParsedDate} from '../../../../functions/timeParsers';
import {callNumber} from '../../../../utils/makePhoneCall';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppParamList} from '../../../../navigation/AppParamList';
import {StyleSheet} from 'react-native';

type navType = NavigationProp<AppParamList, 'Home'>;

const HomeLostRenderItem = ({
  item,
  handleInfoModalPress,
}: {
  item: {title: string; _id: string; date: Date; phone: string; user: string};
  handleInfoModalPress: (id: string) => void;
}) => {
  const navigation: navType = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('ItemInfo', {id: item._id})}>
      <View style={styles.itemView}>
        <View style={styles.itemViewLeft}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDate}>{getParsedDate(item.date)}</Text>
        </View>
        <TouchableOpacity
          onPress={() => callNumber(item.phone)}
          style={styles.phoneTouchable}>
          <FontAwesome name="phone" size={26} color="green" />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  itemView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  itemViewLeft: {},
  itemTitle: {
    marginBottom: 5,
    fontSize: 16,
  },
  itemDate: {
    color: 'grey',
  },
  phoneTouchable: {
    padding: 5,
  },
});

export default HomeLostRenderItem;

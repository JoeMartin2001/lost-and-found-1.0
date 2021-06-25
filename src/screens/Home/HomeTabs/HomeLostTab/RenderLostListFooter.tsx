import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native';
import {View, Text} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../../../../config/colors';

interface Props {
  data: any;
  setPage: any;
  page: number;
}

const RenderLostListFooter: React.FC<Props> = ({data, setPage, page}) => {
  return (
    <View style={styles.loadMoreView}>
      <TouchableOpacity
        style={styles.loadMoreTouchable}
        disabled={!data.previous}
        onPress={() => setPage((old: number) => Math.max(old - 1, 1))}>
        <Text
          style={
            !data.previous ? styles.loadMoreTextDisabled : styles.loadMoreText
          }>
          <Entypo name="chevron-thin-left" size={20} />
        </Text>
      </TouchableOpacity>
      <Text style={{fontSize: 20, borderBottomWidth: 1}}>{page}</Text>
      <TouchableOpacity
        style={styles.loadMoreTouchable}
        disabled={!data.next}
        onPress={() => {
          setPage(page + 1);
        }}>
        <Text
          style={
            !data.next ? styles.loadMoreTextDisabled : styles.loadMoreText
          }>
          <Entypo name="chevron-thin-right" size={20} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loadMoreView: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '25%',
  },
  loadMoreTouchable: {},
  loadMoreText: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.primaryWithOpacity,
    borderRadius: 25,
  },
  loadMoreTextDisabled: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    backgroundColor: '#e5e5e5',
    borderRadius: 25,
  },
});

export default RenderLostListFooter;

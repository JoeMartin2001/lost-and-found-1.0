import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const TermsAndServices = () => {
  return (
    <View style={styles.main}>
      <View style={styles.headerView}>
        <Text style={styles.headerViewText}>TermsAndServices</Text>
      </View>
      <View style={styles.infoBox}>
        <View style={styles.infoBoxWarningView}>
          <Feather name="info" size={30} />
          <Text style={styles.infoBoxWarningViewText}>
            By using our application you agree to our terms and services.
          </Text>
        </View>
        <View style={styles.infoBoxBody}>
          <Text style={styles.infoBoxBodyText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingVertical: 10,
  },
  headerView: {
    padding: 10,
  },
  headerViewText: {
    fontSize: 30,
  },
  infoBox: {
    backgroundColor: 'rgba(107, 159, 255, 0.1)',
    padding: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  infoBoxWarningView: {
    display: 'flex',
    flexDirection: 'row',
  },
  infoBoxWarningViewText: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  infoBoxBody: {
    marginVertical: 20,
  },
  infoBoxBodyText: {
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'justify',
  },
});

export default TermsAndServices;

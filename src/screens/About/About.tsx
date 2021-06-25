import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import {View, Text} from 'react-native';
import {Divider} from 'react-native-paper';
import {colors} from '../../config/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationProp, Route, useNavigation} from '@react-navigation/native';
import {AppParamList} from '../../navigation/AppParamList';
import {useEffect} from 'react';
import {Button} from 'react-native-elements/dist/buttons/Button';
import {useTranslation} from 'react-i18next';

const About = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<AppParamList, 'About'>;
  route: Route<'About', {}>;
}) => {
  const {t, i18n} = useTranslation();

  return (
    <View style={styles.main}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <ImageBackground
          source={require('../../../assets/me.jpg')}
          style={styles.imgView}>
          <View style={styles.imgInnerView}>
            <View style={styles.headerView}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{padding: 5}}>
                <Ionicons name="arrow-back" size={26} color="#ffffff" />
              </TouchableOpacity>
              <Text style={styles.headerViewText}>{t('About Us')}</Text>
            </View>

            <View style={styles.aboutMeView}>
              <Text style={styles.aboutMeTitle}>- About Me</Text>
              <Divider />
              <Text style={styles.aboutMeText}>
                Hi, I am{' '}
                {
                  <Text style={{fontFamily: 'AirbnbCerealMedium'}}>
                    Aminjonov Sardorbek
                  </Text>
                }
                , Full Stack web and mobile developer since about 2020. I can
                build websites, servers, mobile and desktop apps!
              </Text>
            </View>
          </View>

          {/* <Image source={require('../../../assets/me.jpg')} style={styles.img} /> */}
        </ImageBackground>
        <View style={styles.bodyView}>
          <View style={styles.toolsView}></View>
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
  headerView: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerViewText: {
    color: '#ffffff',
    marginLeft: 25,
    fontSize: 20,
  },
  imgView: {
    height: 350,
    width: '100%',
    backgroundColor: colors.primaryWithOpacity,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
  },
  imgInnerView: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bodyView: {
    flex: 1,
    padding: 10,
  },
  aboutMeView: {
    borderWidth: 1,
    borderColor: '#e5e5e5',
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  aboutMeTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  aboutMeText: {
    fontSize: 18,
    marginVertical: 10,
  },
  toolsView: {},
});

export default About;

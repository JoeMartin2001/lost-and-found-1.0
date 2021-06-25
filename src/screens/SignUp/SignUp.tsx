import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  ActivityIndicator,
  TextInput as PaperTextInput,
} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {colors} from '../../config/colors';
import {loginUser} from '../../redux/auth/authSlice';
import Entypo from 'react-native-vector-icons/Entypo';
import {NavigationProp, Route} from '@react-navigation/core';
import {AuthParamList} from '../../navigation/AuthParamList';
import {useMutation} from 'react-query';
import {baseUrl} from '../../config/baseUrl';
import {Card} from 'react-native-elements/dist/card/Card';
import {showMessage} from 'react-native-flash-message';
import {useTranslation} from 'react-i18next';
import SelectLangModal from '../Login/SelectLangModal';

const SignUp = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<AuthParamList, 'SignUp'>;
  route: Route<'SignUp'>;
}) => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const [isRequestPending, setRequestPending] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLangModalVisible, setLangModalVisible] = useState(false);

  const {mutate} = useMutation(async () => {
    try {
      const response = await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({fullName, email, username, password}),
      });

      const data = await response.json();

      setRequestPending(false);
      if (response.ok) {
        return dispatch(loginUser(data.token));
      }

      showMessage({
        message: data.msg,
        type: 'danger',
        icon: 'danger',
      });
    } catch (error) {
      setRequestPending(false);
      throw error;
    }
  });

  const handleSubmit = () => {
    if (fullName && email && username && password) {
      setRequestPending(true);
      return mutate();
    }
  };

  const isButtonDisabled = () =>
    fullName && email && username && password ? false : true;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.langBtnView}>
            <TouchableOpacity
              style={styles.langBtnOpacity}
              onPress={() => setLangModalVisible(true)}>
              <Text style={styles.langBtnText}>O'zbek</Text>
              <Entypo name="chevron-small-down" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <View style={styles.bodyView}>
            <Card
              containerStyle={{
                borderColor: '#f5f5f5',
                backgroundColor: '#ffffff',
                borderRadius: 5,
              }}>
              <View style={styles.headerView}>
                <Text style={styles.headerViewText}>Chora</Text>
              </View>
              <View style={styles.inputView}>
                <PaperTextInput
                  label={t('Full Name')}
                  style={styles.input}
                  mode="outlined"
                  theme={{
                    colors: {background: '#f2f2f2', primary: colors.primary},
                  }}
                  value={fullName}
                  onChangeText={text => setFullName(text)}
                />
                <PaperTextInput
                  label={t('Email')}
                  style={styles.input}
                  mode="outlined"
                  theme={{
                    colors: {background: '#f2f2f2', primary: colors.primary},
                  }}
                  value={email}
                  onChangeText={text => setEmail(text)}
                />
                <PaperTextInput
                  label={t('Username')}
                  style={styles.input}
                  mode="outlined"
                  theme={{
                    colors: {background: '#f2f2f2', primary: colors.primary},
                  }}
                  value={username}
                  onChangeText={text => setUsername(text)}
                />
                <PaperTextInput
                  label={t('Password')}
                  style={styles.input}
                  mode="outlined"
                  theme={{
                    colors: {background: '#f2f2f2', primary: colors.primary},
                  }}
                  value={password}
                  onChangeText={text => setPassword(text)}
                  secureTextEntry
                />
              </View>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  disabled={isButtonDisabled()}
                  onPress={handleSubmit}
                  style={
                    !isButtonDisabled()
                      ? styles.submitBtn
                      : styles.submitBtnDisabled
                  }>
                  {isRequestPending ? (
                    <ActivityIndicator color="#ffffff" size="small" />
                  ) : (
                    <Text style={styles.submitBtnText}>{t('Register')}</Text>
                  )}
                </TouchableOpacity>
              </View>
            </Card>
          </View>
          <View style={styles.signUpView}>
            <Text style={styles.signUpQuestionText}>
              {t('Already have an account?')}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signUpText}>{t('Login')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <SelectLangModal
        isModalVisible={isLangModalVisible}
        setModalVisible={setLangModalVisible}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 20,
    paddingTop: 10,
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
  },
  langBtnView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  langBtnOpacity: {
    height: 40,
    width: 200,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  langBtnText: {
    fontSize: 16,
    color: '#ffffff',
  },
  bodyView: {},
  headerView: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerViewText: {
    fontSize: 60,
    fontFamily: 'magic_owl',
    color: colors.primary,
  },
  inputView: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  input: {
    marginVertical: 5,
  },
  btnContainer: {
    marginTop: 45,
  },
  submitBtn: {
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnDisabled: {
    height: 50,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    fontSize: 18,
    color: '#ffffff',
  },
  signUpView: {
    marginTop: 45,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpQuestionText: {
    fontSize: 16,
    marginRight: 10,
  },
  signUpText: {
    fontSize: 16,
    color: '#ffffff',
  },
});

export default SignUp;

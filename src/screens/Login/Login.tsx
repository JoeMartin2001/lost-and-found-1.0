import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {socketIO} from '../../common/socketIO';
import {Card} from 'react-native-elements/dist/card/Card';
import {showMessage} from 'react-native-flash-message';
import {useTranslation} from 'react-i18next';

const Login = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<AuthParamList, 'Login'>;
  route: Route<'Login'>;
}) => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRequestPending, setRequestPending] = useState(false);

  const {mutate} = useMutation(async () =>
    fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password}),
    })
      .then(res => res.json())
      .then(async data => {
        setRequestPending(false);
        if (data.token) {
          socketIO.connect();
          socketIO.on('connect', () => {
            socketIO.emit('new_user', {userId: data.id, socketId: socketIO.id});
          });
          await AsyncStorage.setItem('userId', data.id);
          return dispatch(loginUser(data.token));
        }
        showMessage({
          message: 'Infalid form data!',
          type: 'warning',
          icon: 'warning',
        });
      })
      .catch(err => {
        setRequestPending(false);
        showMessage({
          message: 'Network request failed! Do you have internet connection!',
          type: 'danger',
          icon: 'danger',
        });
      }),
  );

  const handleSubmit = () => {
    if (username && password.length >= 3) {
      setRequestPending(true);
      return mutate();
    }
  };

  const isButtonDisabled = () =>
    username && password.length >= 3 ? false : true;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.langBtnView}>
            <TouchableOpacity style={styles.langBtnOpacity}>
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
                  label={t('Username')}
                  mode="outlined"
                  theme={{
                    colors: {background: '#f5f5f5', primary: colors.primary},
                  }}
                  value={username}
                  onChangeText={text => setUsername(text)}
                />
                <PaperTextInput
                  label={t('Password')}
                  mode="outlined"
                  theme={{
                    colors: {background: '#f5f5f5', primary: colors.primary},
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
                  <Text style={styles.submitBtnText}>
                    {isRequestPending ? (
                      <ActivityIndicator color="#ffffff" size="small" />
                    ) : (
                      t('Login')
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            </Card>
          </View>
          <View style={styles.signUpView}>
            <Text style={styles.signUpQuestionText}>
              {t("Don't have an account?")}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signUpText}>{t('Sign Up')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerViewText: {
    fontSize: 60,
    fontFamily: 'magic_owl',
    color: colors.primary,
  },
  inputView: {
    height: 150,
    flexDirection: 'column',
    justifyContent: 'space-between',
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

export default Login;

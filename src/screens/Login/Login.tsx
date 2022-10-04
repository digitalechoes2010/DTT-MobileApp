/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, Text, View, TextInput, TouchableOpacity, Platform, PermissionsAndroid, ActivityIndicator, Alert} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './LoginStyle';
import {lightColors, darkColors} from '../../colormode/ColorMode';
import {connect} from 'react-redux';
import {setLight, setDark} from '../../store/Actions/themeActionCreator';
import {requestLogin} from '../../store/Actions/loginActionCreator';
import {useTranslation} from 'react-i18next';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {Formik} from 'formik';
import * as yup from 'yup';

const Login = ({navigation, theme, language, doLogin}: any) => {

  const {t} = useTranslation();
  
  const goBack = () => {
    navigation.pop();
  };

  const {passwordVisibility, rightIcon, handlePasswordVisibility} = useTogglePasswordVisibility();

  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingSecond, setIsLoadingSecond] = React.useState(false);

  const loginValidationSchema = yup.object().shape({
    identifier: yup.string().email(t('validEmail')),
    password: yup.string().min(8, ({min}) => t('minimumPassword'))
  });

  const emailValidation = (value:any) => {
    const regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return regx.test(value);
  };

  interface ILocation {
    latitude: number;
    longitude: number;
  }
  
  const [latitude, setLatitude] = React.useState<ILocation | number>();
  const [longitude, setLongitude] = React.useState<ILocation | number>();
  const [error, setError] = React.useState('');

  Geocoder.init('AIzaSyDVVSGAtwY4iOR87tRmWqvnSwvif8YC4o4');
  async function requestPermissions() {
    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization("whenInUse");
      if(auth === "granted") {
        Geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            console.log("Position:", position);
            Geocoder.from(position.coords.latitude, position.coords.longitude)
            .then(async json => { 
              var countryCode = json.results[0].address_components[4].short_name;
              var country = json.results[0].address_components[4].long_name;
              var city = json.results[0].address_components[1].long_name;
              console.log("Country", country, "City", city);
              navigation.navigate('RegisterStepOne', {country: country, city: city, countryCode: countryCode});
              setTimeout(() => {
                setIsLoadingSecond(false);
              }, 1000);
            })
            .catch(err => {
              console.log('Error:', err);
              Alert.alert(
                t('unidentifiedLocation'),
                t('countryCityManually'),
                [{text: t('closeTxt')}],
                {cancelable: false},
              );
              setTimeout(() => {
                setIsLoadingSecond(false);
              }, 1000);
            });
          },
          (error) => {
            setError(error.message)
            console.log("Location Access Denied");
            setIsLoadingSecond(false);
            navigation.navigate('RegisterStepOne', {country: '', city: '', countryCode: 'AE'});
          },
          {enableHighAccuracy: false, timeout: 10000, maximumAge: 100000}
        );
      }
    }
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (PermissionsAndroid.RESULTS.GRANTED === "granted") {
        Geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            console.log("Position:", position);
            Geocoder.from(position.coords.latitude, position.coords.longitude)
            .then(async json => { 
              var countryCode = json.results[0].address_components[4].short_name;
              var country = json.results[0].address_components[4].long_name;
              var city = json.results[0].address_components[1].long_name;
              console.log("Country", country, "City", city);
              navigation.navigate('RegisterStepOne', {country: country, city: city, countryCode: countryCode});
              setTimeout(() => {
                setIsLoadingSecond(false);
              }, 1000);
            })
            .catch(err => {
              console.log('Error:', err);
              Alert.alert(
                t('unidentifiedLocation'),
                t('countryCityManually'),
                [{text: t('closeTxt')}],
                {cancelable: false},
              );
              setTimeout(() => {
                setIsLoadingSecond(false);
              }, 1000);
            });
          },
          (error) => {
            setError(error.message)
            console.log("Location Access Denied");
            setIsLoadingSecond(false);
            navigation.navigate('RegisterStepOne', {country: '', city: '', countryCode: 'AE'});
          },
          {enableHighAccuracy: false, timeout: 10000, maximumAge: 100000}
        );
      }
    }
  }

  const loginHandle = (values:any) => {
    if (values.identifier.length == 0 || values.password.length == 0) {
      Alert.alert(
        t('requiredInput'),
        t('emailPasswordEmpty'),
        [{text: t('closeTxt')}],
        {cancelable: false},
      );
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return;
    } else if (!emailValidation(values.identifier)) {
      Alert.alert(
        t('emailInvalid'),
        t('validEmailAlert'),
        [{text: t('closeTxt')}],
        {cancelable: false},
      );
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return;
    } else if (values.password.length < 8) {
      Alert.alert(
        t('passwordInvalid'),
        t('minimumPasswordAlert'),
        [{text: t('closeTxt')}],
        {cancelable: false},
      );
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return;
    }
    setIsLoading(true);
    loginFunction(values);
  }

  const loginFunction = async (values: any) => {
    console.log("Login Values:", values);
    var json = JSON.stringify(values);
    console.log(typeof json);
    await doLogin(json);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  function values(values: any) {
    throw new Error('Function not implemented.');
  }

  React.useEffect(() => {
    let isMounted = true;
    loginFunction(values).then(() => {
      if(isMounted) {
        setIsLoading(true);
        setIsLoadingSecond(true);
      } 
    });
    return () => {
      isMounted = false;
      setIsLoading(false);
      setIsLoadingSecond(false);
    };
  }, []);

  return (
    <SafeAreaView style={[styles.contentPage, {backgroundColor: theme === true ? lightColors.bgColor : darkColors.bgColor}]}>
      <View style={styles.upperTab}>
        <Text style={styles.upperTabTxt}>{t('loginTitle')}{' '}</Text>
      </View>
      <View style={styles.formPage}>
        <TouchableOpacity onPress={goBack} style={styles.backIcon}>
          <Ionicons name="arrow-back" color={theme === true ? lightColors.txtColor : darkColors.txtColor} size={24} />
        </TouchableOpacity>
        <Formik
          initialValues={{identifier: '', password: ''}}
          validateOnMount={true}
          onSubmit={values => console.log(values)}
          validationSchema={loginValidationSchema}>
          {({handleChange, handleSubmit, values, touched, errors}) => (
            <>
              <Animatable.View
                animation="fadeIn"
                iterationDelay={500}>
                <View style={styles.inputView}>
                  <Text style={[styles.inputLabel, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>{t('emailAddress')}{' '}</Text>
                  <TextInput
                    style={[styles.inputStyle, {backgroundColor: theme === true ? lightColors.bgInput : darkColors.bgInput}]}
                    placeholder="example@domain.com"
                    placeholderTextColor="#AAA"
                    autoCapitalize="none"
                    value={values.identifier} 
                    onChangeText={handleChange('identifier')}
                  />
                  {(errors.identifier && touched.identifier) &&
                  <Text style={styles.errorMsg}>{errors.identifier}</Text>}
                </View>
              </Animatable.View>
              <Animatable.View
                animation="fadeIn"
                iterationDelay={1000}>
                <View style={styles.inputView}>
                  <Text style={[styles.inputLabel, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>{t('password')}{' '}</Text>
                  <View style={[styles.inputPasswordView, {backgroundColor: theme === true ? lightColors.bgInput : darkColors.bgInput}]}>
                    <TextInput
                      style={[styles.inputPasswordStyle, {backgroundColor: theme === true ? lightColors.bgInput : darkColors.bgInput}]}
                      placeholder="Test@123"
                      placeholderTextColor="#AAA"
                      autoCapitalize="none"
                      value={values.password} 
                      onChangeText={handleChange('password')}
                      secureTextEntry={passwordVisibility}
                    />
                    <TouchableOpacity
                      style={styles.passwordIcon}
                      onPress={handlePasswordVisibility}>
                      <Ionicons name={rightIcon} size={24} color="#AE1614" />
                    </TouchableOpacity>
                  </View>
                  {(errors.password && touched.password) &&
                  <Text style={styles.errorMsg}>{errors.password}</Text>}
                </View>
              </Animatable.View>
              <TouchableOpacity onPress={() => navigation.navigate('ResetPasswordStepOne')}>
                <Text style={styles.forgotPass}>{t('forgotPassword')}{' '}</Text>
              </TouchableOpacity>
              <Animatable.View
                animation="bounceInDown"
                iterationCount={1}
                iterationDelay={1500}
                direction="alternate">
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => {handleSubmit(); loginHandle(values);}}>
                  {isLoading == false ? (
                    <Text style={styles.actionTxtBtn}>{t('loginButton')}{' '}</Text>
                  ) : (
                    <ActivityIndicator
                      size="small"
                      color="#FFFFFF"
                      style={styles.activityIndicator}
                    />
                  )}
                </TouchableOpacity>
              </Animatable.View>
            </>
          )}
        </Formik>
        {language === 'en' || language === 'sp' ? 
        <View style={styles.lastView}>
          <Text style={[styles.haveAccount, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>{t('noAccount')}{' '}</Text>
          <TouchableOpacity
            onPress={async () => {setIsLoadingSecond(true); await requestPermissions();}}>
            {isLoadingSecond == false ? (
              <Text style={styles.secondActionBtn}>{t('registerTitle')}{' '}</Text>
            ) : (
              <ActivityIndicator
                size="small"
                color="#000000"
                style={styles.activityIndicator}
              />
            )}
          </TouchableOpacity>
        </View> : 
        <View style={styles.lastView}>
          <TouchableOpacity
            onPress={async () => {setIsLoadingSecond(true); await requestPermissions();}}>
            {isLoadingSecond == false ? (
              <Text style={styles.secondArabicActionBtn}>{t('registerTitle')}{' '}</Text>
            ) : (
              <ActivityIndicator
                size="small"
                color="#000000"
                style={styles.activityIndicator}
              />
            )}
          </TouchableOpacity>
          <Text style={[styles.haveAccount, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>{t('noAccount')}{' '}</Text>
        </View>}
      </View>
    </SafeAreaView>
  );

};

export const useTogglePasswordVisibility = () => {

  const [passwordVisibility, setPasswordVisibility] = React.useState(true);
  const [rightIcon, setRightIcon] = React.useState('eye');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return {
    passwordVisibility,
    rightIcon,
    handlePasswordVisibility
  };
  
};

const mapStateToProps = (state: any) => {
  return {
    theme: state.ThemeReducer.theme,
    language: state.LanguageReducer.language,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  setLight: () => dispatch(setLight()),
  setDark: () => dispatch(setDark()),
  doLogin: (params: any) => dispatch(requestLogin(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

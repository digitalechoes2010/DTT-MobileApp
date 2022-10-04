/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, ScrollView, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './RegisterStepTwoStyle';
import {lightColors, darkColors} from '../../colormode/ColorMode';
import {connect} from 'react-redux';
import {setLight, setDark} from '../../store/Actions/themeActionCreator';
import {useTranslation} from 'react-i18next';
import {Formik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const RegisterStepTwo = ({navigation, theme, language, route}: any) => {

  const {t} = useTranslation();

  const goBack = () => {
    navigation.pop();
  };
  
  const {passwordVisibility, confirmPasswordVisibility, rightPasswordIcon, rightConfirmPasswordIcon, handlePasswordVisibility, handleConfirmPasswordVisibility} = useTogglePasswordVisibility();

  const [isLoading, setIsLoading] = React.useState(false);

  const registerValidationSchema = yup.object().shape({
    identifier: yup.string().email(t('validEmail')).required(t('requiredEmail')),
    password: yup.string().min(8, ({min}) => t('minimumPassword')).required(t('requiredPassword'))
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    t('passwordValidation')),
    confirmPassword: yup.string().when('password', {
      is: (val: any) => (val && val.length > 0 ? true : false),
      then: yup.string().oneOf(
        [yup.ref('password')],
        t('passwordConfirmSame')
      ),
    }).required(t('requiredConfirmPassword')),
  });

  const emailValidation = (value:any) => {
    const regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return regx.test(value);
  };

  const passwordValidation = (value:any) => {
    const regx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return regx.test(value);
  };

  const registerStepTwoHandle = (values:any) => {
    if (values.identifier.length == 0 || values.password.length == 0 || values.confirmPassword.length == 0) {
      Alert.alert(
        t('requiredInput'),
        t('fieldsEmpty'),
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
    } else if (values.password.length < 8 || !passwordValidation(values.password)) {
      Alert.alert(
        t('passwordInvalid'),
        t('passwordValidationAlert'),
        [{text: t('closeTxt')}],
        {cancelable: false},
      );
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return;
    } else if (values.password !== values.confirmPassword) {
      Alert.alert(
        t('unmatchingPasswords'),
        t('passwordConfirmSameAlert'),
        [{text: t('closeTxt')}],
        {cancelable: false},
      );
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return;
    }
    console.log("Country", route.params.country);
    console.log("City", route.params.city);
    setIsLoading(true);
    registerFunction(values);
  }

  const registerFunction = async (values: any) => {
    console.log('Register Step Two Values:', values);
    await axios
      .post(
        'https://dtt-cms-egztq.ondigitalocean.app/api/auth/local/register',
        {
          fullname: route.params.values.fullname,
          phone: route.params.values.phone,
          email: values.identifier,
          username: values.identifier,
          identifier: values.identifier,
          country: route.params.country,
          city: route.params.city,
          password: values.password,
        },
      )
      .then(response => {
        console.log('Register Response:', response);
        navigation.navigate('EmailConfirmation', {values: values});
      })
      .catch(err => { 
        console.log('Error:', err);
        Alert.alert(
          t('emailAlreadyExists'),
          t('differentEmail'),
          [{text: t('closeTxt')}],
          {cancelable: false},
        );
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={[styles.contentPage, {backgroundColor: theme === true ? lightColors.bgColor : darkColors.bgColor}]}>
      <View style={styles.upperTab}>
        <Text style={styles.upperTabTxt}>{t('registerTitle')} </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formPage}>
          <TouchableOpacity onPress={goBack} style={styles.backIcon}>
            <Ionicons name="arrow-back" color={theme === true ? lightColors.txtColor : darkColors.txtColor} size={24} />
          </TouchableOpacity>
          <Text style={[styles.pageTitle, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>{t('createAccount')}{' '}</Text>
          <Text style={[styles.pageSubTitle, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>{t('createNotion')}{' '}</Text>
          <Formik
            initialValues={{identifier: '', password: '', confirmPassword: ''}}
            validateOnMount={true}
            onSubmit={values => console.log(values)}
            validationSchema={registerValidationSchema}>
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
                    {errors.identifier && touched.identifier && (
                    <Text style={styles.errorMsg}>{errors.identifier}</Text>)}
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
                        <Ionicons name={rightPasswordIcon} size={24} color="#AE1614" />
                      </TouchableOpacity>
                    </View>
                    {(errors.password && touched.password) &&
                    <Text style={styles.errorMsg}>{errors.password}</Text>}
                  </View>
                </Animatable.View>
                <Animatable.View
                 animation="fadeIn"
                  iterationDelay={1500}>
                  <View style={styles.inputView}>
                    <Text style={[styles.inputLabel, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>{t('confirmPassword')}{' '}</Text>
                    <View style={[styles.inputPasswordView, {backgroundColor: theme === true ? lightColors.bgInput : darkColors.bgInput}]}>
                      <TextInput
                        style={[styles.inputPasswordStyle, {backgroundColor: theme === true ? lightColors.bgInput : darkColors.bgInput}]}
                        placeholder="Test@123"
                        placeholderTextColor="#AAA"
                        autoCapitalize="none"
                        value={values.confirmPassword}
                        onChangeText={handleChange('confirmPassword')}
                        secureTextEntry={confirmPasswordVisibility}
                      />
                      <TouchableOpacity
                        style={styles.passwordIcon}
                        onPress={handleConfirmPasswordVisibility}>
                        <Ionicons name={rightConfirmPasswordIcon} size={24} color="#AE1614" />
                      </TouchableOpacity>
                    </View>
                    {(errors.confirmPassword && touched.confirmPassword) &&
                    <Text style={styles.errorMsg}>{errors.confirmPassword}</Text>}
                  </View>
                </Animatable.View>
                <Animatable.View
                  animation="bounceInDown"
                  iterationCount={1}
                  iterationDelay={2000}
                  direction="alternate">
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => {handleSubmit(); registerStepTwoHandle(values);}}>
                    {isLoading == false ? (
                      <Text style={styles.actionTxtBtn}>{t('registerTitle')}{' '}</Text>
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
            <Text style={[styles.haveAccount, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>{t('haveAccount')}{' '}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.secondActionBtn}>{t('loginButton')} </Text>
            </TouchableOpacity>
          </View> : 
          <View style={styles.lastView}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.secondArabicActionBtn}>{t('loginButton')} </Text>
            </TouchableOpacity>
            <Text style={[styles.haveAccount, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>{t('haveAccount')}{' '}</Text>
          </View>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );

};

export const useTogglePasswordVisibility = () => {

  const [passwordVisibility, setPasswordVisibility] = React.useState(true);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = React.useState(true);
  const [rightPasswordIcon, setRightPasswordIcon] = React.useState('eye');
  const [rightConfirmPasswordIcon, setRightConfirmPasswordIcon] = React.useState('eye');

  const handlePasswordVisibility = () => {
    if (rightPasswordIcon === 'eye') {
      setRightPasswordIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightPasswordIcon === 'eye-off') {
      setRightPasswordIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const handleConfirmPasswordVisibility = () => {
    if (rightConfirmPasswordIcon === 'eye') {
      setRightConfirmPasswordIcon('eye-off');
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    } else if (rightConfirmPasswordIcon === 'eye-off') {
      setRightConfirmPasswordIcon('eye');
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    }
  };

  return {
    passwordVisibility,
    confirmPasswordVisibility,
    rightPasswordIcon,
    rightConfirmPasswordIcon,
    handlePasswordVisibility,
    handleConfirmPasswordVisibility
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
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterStepTwo);

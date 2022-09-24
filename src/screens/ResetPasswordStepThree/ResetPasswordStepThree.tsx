/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './ResetPasswordStepThreeStyle';
import {lightColors, darkColors} from '../../colormode/ColorMode';
import {connect} from 'react-redux';
import {setLight, setDark} from '../../store/Actions/themeActionCreator';
import {useTranslation} from 'react-i18next';
import {Formik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const ResetPasswordStepThree = ({navigation, theme, reduxValues}: any) => {

  const {t} = useTranslation();
  
  const goBack = () => {
    navigation.pop();
  };

  const {newPasswordVisibility, confirmPasswordVisibility, rightNewPasswordIcon, rightConfirmPasswordIcon, handleNewPasswordVisibility, handleConfirmPasswordVisibility} = useTogglePasswordVisibility();
 
  const [isLoading, setIsLoading] = React.useState(false);

  const resetPasswordSchema = yup.object().shape({
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

  const passwordValidation = (value:any) => {
    const regx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return regx.test(value);
  };

  const changePasswordHandle = (values:any) => {
    if (values.password.length == 0 || values.confirmPassword.length == 0) {
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
    setIsLoading(true);
    updateInfo(values);
  }

  const updateInfo = async (values: any) => {
    console.log('Updated Values:', values);
    await axios
      .put(
        'https://dtt-cms-egztq.ondigitalocean.app/api/users/' + reduxValues.userData.user.id,
        {
          password: values.password,
        },
        {
          headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + reduxValues.userData.jwt
          }
        }
      )
      .then(response => {
        navigation.navigate('Drawer');
        Alert.alert(
          t('passwordSuccessfullyReset'),
          t('passwordSuccessfullyResetTxt'),
          [{text: t('closeTxt')}],
          {cancelable: false},
        )
        {console.log('Register Response:', response)}
      })
      .catch(err => {
        console.log('Error:', err);
        Alert.alert(
          t('serversDown'),
          t('tryAgain'),
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
        <Text style={styles.upperTabTxt}>{t('resetPassword')}{' '}</Text>
      </View>
      <View style={styles.formPage}>
        <TouchableOpacity onPress={goBack} style={styles.backIcon}>
          <Ionicons name="arrow-back" color={theme === true ? lightColors.txtColor : darkColors.txtColor} size={24} />
        </TouchableOpacity>
        <Formik
           initialValues={{password: '', confirmPassword: ''}}
           validateOnMount={true}
           onSubmit={values => console.log(values)}
           validationSchema={resetPasswordSchema}>
          {({handleChange, handleSubmit, values, touched, errors}) => (
            <>
              <View>
                <Text style={[styles.inputLabel, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>{t('password')}{' '}</Text>
                <View style={[styles.inputPasswordView, {backgroundColor: theme === true ? lightColors.bgInput : darkColors.bgInput}]}>
                  <TextInput
                    style={[styles.inputPasswordStyle, {backgroundColor: theme === true ? lightColors.bgInput : darkColors.bgInput}]}
                    placeholder="Test@123"
                    placeholderTextColor="#AAA"
                    autoCapitalize="none"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    secureTextEntry={newPasswordVisibility}
                  />
                  <TouchableOpacity
                    style={styles.passwordIcon}
                    onPress={handleNewPasswordVisibility}>
                    <Ionicons name={rightNewPasswordIcon} size={24} color="#AE1614" />
                  </TouchableOpacity>
                </View>
                {(errors.password && touched.password) &&
                <Text style={styles.errorMsg}>{errors.password}</Text>}
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
              <Animatable.View
                animation="bounceInDown"
                iterationCount={1}
                iterationDelay={250}
                direction="alternate">
                <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => {handleSubmit(); changePasswordHandle(values);}}>
                    {isLoading == false ? (
                      <Text style={styles.actionTxtBtn}>{t('resetButton')}{' '}</Text>
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
      </View>
    </SafeAreaView>
  );
  
};

export const useTogglePasswordVisibility = () => {

  const [newPasswordVisibility, setNewPasswordVisibility] = React.useState(true);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = React.useState(true);
  const [rightNewPasswordIcon, setRightNewPasswordIcon] = React.useState('eye');
  const [rightConfirmPasswordIcon, setRightConfirmPasswordIcon] = React.useState('eye');

  const handleNewPasswordVisibility = () => {
    if (rightNewPasswordIcon === 'eye') {
      setRightNewPasswordIcon('eye-off');
      setNewPasswordVisibility(!newPasswordVisibility);
    } else if (rightNewPasswordIcon === 'eye-off') {
      setRightNewPasswordIcon('eye');
      setNewPasswordVisibility(!newPasswordVisibility);
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
    newPasswordVisibility,
    confirmPasswordVisibility,
    rightNewPasswordIcon,
    rightConfirmPasswordIcon,
    handleNewPasswordVisibility,
    handleConfirmPasswordVisibility
  };
  
};

const mapStateToProps = (state: any) => {
  return {
    theme: state.ThemeReducer.theme,
    reduxValues: state.LoginReducer,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  setLight: () => dispatch(setLight()),
  setDark: () => dispatch(setDark()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordStepThree);

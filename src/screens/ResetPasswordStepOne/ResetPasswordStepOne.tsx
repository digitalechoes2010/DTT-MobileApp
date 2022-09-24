/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './ResetPasswordStepOneStyle';
import {lightColors, darkColors} from '../../colormode/ColorMode';
import {connect} from 'react-redux';
import {setLight, setDark} from '../../store/Actions/themeActionCreator';
import {useTranslation} from 'react-i18next';
import {Formik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const ResetPasswordStepOne = ({navigation, theme}: any) => {

  const {t} = useTranslation();
  
  const goBack = () => {
    navigation.pop();
  };

  const [isLoading, setIsLoading] = React.useState(false);

  const resetPasswordStepOneSchema = yup.object().shape({
    identifier: yup.string().email(t('validEmail')).required(t('requiredEmail')),
  });

  const emailValidation = (value:any) => {
    const regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return regx.test(value);
  };

  const resetPasswordStepOneHandle = (values:any) => {
    if (values.identifier.length == 0) {
      Alert.alert(
        t('requiredInput'),
        t('emailEmpty'),
        [{text: t('closeTxt')}],
        {cancelable: false},
      );
      return;
    } else if (!emailValidation(values.identifier)) {
      Alert.alert(
        t('emailInvalid'),
        t('validEmailAlert'),
        [{text: t('closeTxt')}],
        {cancelable: false},
      );
      return;
    }
    setIsLoading(true);
    resetPasswordFunction(values);
  }

  const resetPasswordFunction = async (values: any) => {
    console.log('Reset Password Step One Values:', values);
    await axios
      .post(
        'https://dtt-cms-egztq.ondigitalocean.app/api/passwordless/send-link',
        {
          username: values.identifier,
        },
      )
      .then(response => {
        console.log('Reset Response:', response);
        console.log('qaaa:', response.data.sent);
        if (response.data.sent == true) {
          navigation.navigate('ResetPasswordStepTwo', {values: values});
        }
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
          initialValues={{identifier: ''}}
          validateOnMount={true}
          onSubmit={values => console.log(values)}
          validationSchema={resetPasswordStepOneSchema}>
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
                animation="bounceInDown"
                iterationCount={1}
                iterationDelay={1000}
                direction="alternate">
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => {handleSubmit(); resetPasswordStepOneHandle(values);}}>
                  {isLoading == false ? (
                    <Text style={styles.actionTxtBtn}>{t('nextTitle')}{' '}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordStepOne);

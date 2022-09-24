/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './ResetPasswordStepTwoStyle';
import {lightColors, darkColors} from '../../colormode/ColorMode';
import {connect} from 'react-redux';
import {setLight, setDark} from '../../store/Actions/themeActionCreator';
import {requestLoginResetPassword} from '../../store/Actions/loginResetPasswordActionCreator';
import {useTranslation} from 'react-i18next';
import {Formik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const ResetPasswordStepTwo = ({navigation, theme, doLoginResetPassword}: any) => {

  const {t} = useTranslation();
  
  const goBack = () => {
    navigation.pop();
  };

  const [isLoading, setIsLoading] = React.useState(false);

  const resetPasswordStepTwoValidationSchema = yup.object().shape({
    loginToken: yup.string().required(t('requiredToken'))
  });

  const resetPasswordStepTwoHandle = (values:any) => {
    if (values.loginToken.length == 0) {
      Alert.alert(
        t('requiredInput'),
        t('tokenEmpty'),
        [{text: t('closeTxt')}],
        {cancelable: false},
      );
      return;
    }
    setIsLoading(true);
    resetFunction(values);
  }

  const resetFunction = async (values: any) => {
    console.log("Reset Password Step Two Values:", values);
    await doLoginResetPassword(values.loginToken);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  function values(values: any) {
    throw new Error('Function not implemented.');
  }

  React.useEffect(() => {
    let isMounted = true;
    resetFunction(values).then(() => {
      if(isMounted) {
        setIsLoading(true);
      } 
    });
    return () => {
      isMounted = false;
      setIsLoading(false);
    };
  }, []);

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
          initialValues={{loginToken: ''}}
          validateOnMount={true}
          onSubmit={values => console.log(values)}
          validationSchema={resetPasswordStepTwoValidationSchema}>
          {({handleChange, handleSubmit, values, touched, errors}) => (
            <>
              <Animatable.View
                animation="fadeIn"
                iterationDelay={500}>
                <View style={styles.inputView}>
                  <Text style={[styles.inputLabel, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>{t('token')}{' '}</Text>
                  <TextInput
                    style={[styles.inputStyle, {backgroundColor: theme === true ? lightColors.bgInput : darkColors.bgInput}]}
                    placeholder="ece454c059c690bd974..."
                    placeholderTextColor="#AAA"
                    autoCapitalize="none"
                    numberOfLines={1}
                    value={values.loginToken} 
                    onChangeText={handleChange('loginToken')}
                  />
                  {(errors.loginToken && touched.loginToken) &&
                  <Text style={styles.errorMsg}>{errors.loginToken}</Text>}
                </View>
              </Animatable.View>
              <Animatable.View
                animation="bounceInDown"
                iterationCount={1}
                iterationDelay={1000}
                direction="alternate">
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => {handleSubmit(); resetPasswordStepTwoHandle(values);}}>
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

export function LoginResetPasswordUser(request: any) {
  return axios
    .get(
      'https://dtt-cms-egztq.ondigitalocean.app/api/passwordless/login',
      {params: {loginToken: request}},
    )
    .then((data: any) => data)
    .catch((error: any) => {
      console.log("Login Token:", request);
      return error.response;
    });
}

const mapStateToProps = (state: any) => {
  return {
    theme: state.ThemeReducer.theme,
    language: state.LanguageReducer.language,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  setLight: () => dispatch(setLight()),
  setDark: () => dispatch(setDark()),
  doLoginResetPassword: (params: any) => dispatch(requestLoginResetPassword(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordStepTwo);

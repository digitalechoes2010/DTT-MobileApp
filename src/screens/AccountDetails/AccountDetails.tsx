/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, Text, View, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PhoneInput from "react-native-phone-number-input";
import {Picker} from '@react-native-picker/picker';
import styles from './AccountDetailsStyle';
import {lightColors, darkColors} from '../../colormode/ColorMode';
import {connect} from 'react-redux';
import {setLight, setDark} from '../../store/Actions/themeActionCreator';
import {logout} from '../../store/Actions/loginActionCreator';
import {useTranslation} from 'react-i18next';
import {Formik} from 'formik';
import axios from 'axios';
import {updateUserRequest} from '../../store/Actions/userActionCreator';

const AccountDetails = ({navigation, theme, route, reduxValues, reduxUserValues, doLogout}: any) => {

  const {t} = useTranslation();
  
  const goBack = () => {
    navigation.pop();
  };

  const [isLoading, setIsLoading] = React.useState(false);
  
  React.useEffect(() => {
    if(reduxValues.isLoggedIn == true)
      console.log("Account Details:",
      reduxValues.userData.user.fullname,
        "#",reduxValues.userData.user.phone,
        "#", reduxValues.userData.user.type);
  });

  const phoneInput = React.useRef<PhoneInput>(null);

  const [userType, setUserType] = React.useState(reduxValues.userData.user.type);

  const updateInfoHandle = (values:any) => {
    setIsLoading(true);
    updateInfo(values);
  }

  const updateInfo = async (values: any) => {
    console.log('Updated Values:', values);
    await axios
      .put(
        'https://dtt-cms-egztq.ondigitalocean.app/api/users/' + reduxValues.userData.user.id,
        {
          fullname: values.fullname,
          phone: values.phone,
          type: userType,
        },
        {
          headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + reduxValues.userData.jwt
          }
        }
      )
      .then(response => {
        // navigation.push('SettingStack');
        doLogout();
        {console.log('Register Response:', response)}
      })
      .catch(err => console.log('Error:', err));
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={[styles.contentPage, {backgroundColor: theme === true ? lightColors.bgColor : darkColors.bgColor}]}>
      <View style={styles.upperTab}>
        <Text style={styles.upperTabTxt}>{t('settingsTitle')}{' '}</Text>
      </View>
      <View style={styles.formPage}>
        <TouchableOpacity onPress={goBack} style={styles.backIcon}>
          <Ionicons name="arrow-back" color={theme === true ? lightColors.txtColor : darkColors.txtColor} size={24} />
        </TouchableOpacity>
        <View style={styles.avatarImage}>
          <MaterialIcons name="account-box" color={theme === true ? lightColors.txtColor : darkColors.txtColor} size={96} />
        </View>
        <Formik
          initialValues={{fullname: reduxValues.userData.user.fullname, phone: reduxValues.userData.user.phone, type: reduxValues.userData.user.type, id: reduxValues.userData.user.id, jwt: reduxValues.userData.jwt}}
          validateOnMount={true}
          onSubmit={values => console.log(values)}>
          {({handleChange, handleSubmit, values, touched, errors}) => (
            <>
              <Text style={[styles.txtName, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>{t('accountDetails')}{' '}</Text>
              <View style={styles.inputView}>
                <TextInput 
                  style={[styles.inputStyle, {backgroundColor: theme === true ? lightColors.bgInput : darkColors.bgInput}]}
                  placeholder={t('fullName')}
                  placeholderTextColor="#AAA"
                  value={values.fullname}
                  onChangeText={handleChange('fullname')}
                />
              </View>
              <View style={styles.inputView}>
                <PhoneInput
                  ref={phoneInput}
                  defaultCode={route.params.countryCode}
                  layout="first"
                  placeholder=" "
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  containerStyle={[styles.phoneInputContainer, {backgroundColor: theme === true ? lightColors.bgInput : darkColors.bgInput}]}
                  textContainerStyle={[styles.phoneTextContainer, {backgroundColor: theme === true ? lightColors.bgInput : darkColors.bgInput}]}
                  textInputStyle={[styles.phoneTextInput, {backgroundColor: theme === true ? lightColors.bgInput : darkColors.bgInput}]}
                  codeTextStyle={[styles.phoneTextCode, {backgroundColor: theme === true ? lightColors.bgInput : darkColors.bgInput}]}
                />
              </View>
              <View style={[styles.selectFields, {backgroundColor: theme === true ? lightColors.bgInput : darkColors.bgInput}]}>
                <Picker
                  selectedValue={userType}
                  onValueChange={(userType) => setUserType(userType)}
                  dropdownIconColor={'#000000'}
                  itemStyle={{height: 50, fontSize: 14}}>
                  <Picker.Item label={'Beginner'} value={'Beginner'} />
                  <Picker.Item label={'Experienced'} value={'Experienced'} />
                </Picker>
              </View>
              <Animatable.View
                animation="bounceInDown"
                iterationCount={1}
                iterationDelay={500}
                direction="alternate">
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => {updateInfoHandle(values)}}>
                  {isLoading == false ? (
                    <Text style={styles.actionTxtBtn}>{t('saveButton')}{' '}</Text>
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

export function UpdateInfo (values: any) {
  console.log('Updated Valuesssss:', values);
  axios
    .put(
      'https://dtt-cms-egztq.ondigitalocean.app/api/users/' + values.id,
      {
        fullname: values.fullname,
        phone: values.phone,
        type: values.type,
      },
      {
        headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + values.jwt
        }
      }
    )
    .then(response => {
      {console.log('Register Response:', response)}
    })
    .catch(err => console.log('Error:', err));
};

const mapStateToProps = (state: any) => {
  return {
    theme: state.ThemeReducer.theme,
    reduxValues: state.LoginReducer,
    reduxUserValues: state.UserReducer,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  setLight: () => dispatch(setLight()),
  setDark: () => dispatch(setDark()),
  doLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetails);

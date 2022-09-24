/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, ScrollView, Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PhoneInput from "react-native-phone-number-input";
import {Picker} from '@react-native-picker/picker';
import {countryCityData} from '../../constants/countryCityData';
import styles from './RegisterStepOneStyle';
import {lightColors, darkColors} from '../../colormode/ColorMode';
import {connect} from 'react-redux';
import {setLight, setDark} from '../../store/Actions/themeActionCreator';
import {useTranslation} from 'react-i18next';
import {Formik} from 'formik';
import * as yup from 'yup';

const RegisterStepOne = ({navigation, theme, language, route}: any) => {

  const {t} = useTranslation();

  const goBack = () => {
    navigation.pop();
  };

  const registerValidationSchema = yup.object().shape({
    fullname: yup.string().required(t('requiredFullName')),
    phone: yup.string().required(t('requiredPhoneNumber')),
    country: yup.string().required(t('requiredCountry')),
    city: yup.string().required(t('requiredCity')),
  });

  const registerStepOneHandle = (values:any) => {
    if (values.fullname.length == 0 || values.phone.length == 0) {
      Alert.alert(
        t('requiredInput'),
        t('fieldsEmpty'),
        [{text: t('closeTxt')}],
        {cancelable: false},
      );
      return;
    }
    navigation.navigate('RegisterStepTwo', {values: values, country: selectedCountry, city: selectedCity});
  }

  const phoneInput = React.useRef<PhoneInput>(null);

  const [selectedCountryCode, setSelectedCountryCode] = React.useState(route.params.countryCode);
  const [selectedCountry, setSelectedCountry] = React.useState(route.params.country);
  const [selectedCity, setSelectedCity] = React.useState(route.params.city);
  const availableCity = countryCityData.countries.find((c) => c.name === selectedCountry);

  {console.log("::LL", selectedCountryCode)}
  
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
            initialValues={{fullname: '', phone: '', selectedCountry, selectedCity}}
            validateOnMount={true}
            onSubmit={values => console.log(values)}
            validationSchema={registerValidationSchema}>
            {({handleChange, handleSubmit, values, touched, errors}) => (
              <>
                <Animatable.View
                  animation="fadeIn"
                  iterationDelay={500}>
                  <View style={styles.inputView}>
                    <Text style={[styles.inputLabel, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>{t('fullName')}{' '}</Text>
                    <TextInput
                      style={[styles.inputStyle, {backgroundColor: theme === true ? lightColors.bgInput : darkColors.bgInput}]}
                      placeholder="John Doe"
                      placeholderTextColor="#AAA"
                      value={values.fullname}
                      onChangeText={handleChange('fullname')}
                    />
                    {errors.fullname && touched.fullname && (
                    <Text style={styles.errorMsg}>{errors.fullname}</Text>)}
                  </View>
                </Animatable.View>
                <Animatable.View
                    animation="fadeIn"
                  iterationDelay={1000}>
                  <View style={styles.inputView}>
                    <Text style={[styles.inputLabel, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>{t('phoneNumber')}{' '}</Text>
                    <PhoneInput
                      ref={phoneInput}
                      defaultCode={selectedCountryCode}
                      layout="first"
                      placeholder=" "
                      value={values.phone}
                      onChangeText={handleChange('phone')}
                      containerStyle={[styles.phoneInputContainer, {backgroundColor: theme === true ? lightColors.bgInput : darkColors.bgInput}]}
                      textContainerStyle={[styles.phoneTextContainer, {backgroundColor: theme === true ? lightColors.bgInput : darkColors.bgInput}]}
                      textInputStyle={[styles.phoneTextInput, {backgroundColor: theme === true ? lightColors.bgInput : darkColors.bgInput}]}
                      codeTextStyle={[styles.phoneTextCode, {backgroundColor: theme === true ? lightColors.bgInput : darkColors.bgInput}]}
                    />
                    {errors.phone && touched.phone && (
                    <Text style={styles.errorMsg}>{errors.phone}</Text>)}
                  </View>
                </Animatable.View>
                <Animatable.View
               animation="fadeIn"
                  iterationDelay={1500}>
                  <View style={styles.inputView}>
                    <Text style={[styles.inputLabel, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>{t('country')}{' '}</Text>
                    <View style={[styles.selectFields, {backgroundColor: theme === true ? lightColors.bgInput : darkColors.bgInput}]}>
                      <Picker
                        selectedValue={selectedCountry}
                        onValueChange={(selectedCountry) => setSelectedCountry(selectedCountry)}
                        dropdownIconColor={'#000000'}>
                        <Picker.Item label='Select an item' value='' color='#AAA'/>
                        {countryCityData.countries.map((country, key) => {
                          return (
                            <Picker.Item label={country.name} value={country.name} key={key} />
                          );
                        })}
                      </Picker>
                    </View>
                  </View>
                </Animatable.View>
                <Animatable.View
                  animation="fadeIn"
                  iterationDelay={2000}>
                  <View style={styles.inputView}>
                    <Text style={[styles.inputLabel, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>{t('city')}{' '}</Text>
                    <View style={[styles.selectFields, {backgroundColor: theme === true ? lightColors.bgInput : darkColors.bgInput}]}>
                      <Picker
                        selectedValue={selectedCity}
                        onValueChange={(selectedCity) => setSelectedCity(selectedCity)}
                        dropdownIconColor={'#000000'}>
                        <Picker.Item label='Select an item' value='' color='#AAA' />
                        {availableCity?.cities.map((city, key) => {
                          return (
                            <Picker.Item label={city} value={city} key={key} />
                          );
                        })}
                      </Picker>
                    </View>
                  </View>
                </Animatable.View>
                <Animatable.View
                  animation="bounceInDown"
                  iterationCount={1}
                  iterationDelay={2500}
                  direction="alternate">
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => {handleSubmit(); registerStepOneHandle(values);}}>
                    <Text style={styles.actionTxtBtn}>{t('nextTitle')}{' '}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterStepOne);

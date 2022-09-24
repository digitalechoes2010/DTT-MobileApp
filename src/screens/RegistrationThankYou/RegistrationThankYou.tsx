/* eslint-disable prettier/prettier */
import React from 'react';
import {SafeAreaView, Text, View, TextInput, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CountryPicker from 'react-native-country-picker-modal';
import styles from './RegistrationThankYouStyle';
import {lightColors, darkColors} from '../../colormode/ColorMode';
import {connect} from 'react-redux';
import {setLight, setDark} from '../../store/Actions/themeActionCreator';
import {useTranslation} from 'react-i18next';

const RegistrationThankYou = ({theme}: any) => {

  const {t} = useTranslation();

  const [countryCode, setCountryCode] = React.useState('AE'); 
  const [callingCode, setCallingCode] = React.useState('971');

  return (
    <SafeAreaView style={[styles.contentPage, {backgroundColor: theme === true ? lightColors.bgColor : darkColors.bgColor}]}>
      <View style={styles.upperTab}>
        <Text style={styles.upperTabTxt}>{t('confirmationTitle')}{' '}</Text>
      </View>
      <View style={styles.formPage}>
        <Text style={[styles.thankYouRegistration, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>{t('thankYouRegistration')}{' '}</Text>
        <View style={styles.thankYouMessageView}>
          <Text style={styles.thankYouMessage}>{t('thankYouMessage')}{' '}</Text>
        </View>
        <View style={styles.inputView}>
          <View style={[styles.countryPicker, { backgroundColor: theme === true ? lightColors.bgInput : darkColors.bgInput }]}>
            <CountryPicker
              countryCode={countryCode}
              withCountryNameButton={true}
              onSelect={country => {
                const { cca2, callingCode } = country;
                setCountryCode(cca2);
                setCallingCode(callingCode[0]);
              }}
              containerButtonStyle={{
                justifyContent: 'center',
                height: 50,
                width: '100%',
              }}
            />
            <MaterialIcons name="keyboard-arrow-down" color={'#000000'} size={24} />
          </View>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={[styles.inputStyle, { backgroundColor: theme === true ? lightColors.bgInput : darkColors.bgInput }]}
            placeholder={t('city')}
            placeholderTextColor="#AAA"
          />
        </View>
        <TouchableOpacity
          style={styles.actionBtn}>
          <Text style={styles.actionTxtBtn}>{t('submitButton')}{' '}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

};

const mapStateToProps = (state: any) => {
  return {
    theme: state.ThemeReducer.theme,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  setLight: () => dispatch(setLight()),
  setDark: () => dispatch(setDark()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationThankYou);

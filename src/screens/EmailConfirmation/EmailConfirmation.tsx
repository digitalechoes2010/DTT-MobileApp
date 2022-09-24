/* eslint-disable prettier/prettier */
import React from 'react';
import {SafeAreaView, Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './EmailConfirmationStyle';
import {lightColors, darkColors} from '../../colormode/ColorMode';
import {connect} from 'react-redux';
import {setLight, setDark} from '../../store/Actions/themeActionCreator';
import {requestLoginRegister} from '../../store/Actions/loginRegisterActionCreator';
import {useTranslation} from 'react-i18next';

const EmailConfirmation = ({navigation, theme, route, doLoginRegister}: any) => {

  const {t} = useTranslation();
  
  const goBack = () => {
    navigation.pop();
  };

  const nextFunction = async (values: any) => {
    console.log("Email Confirmation Values:", values);
    var json = JSON.stringify(values);
    console.log(typeof json);
    await doLoginRegister(json);
  };

  return (
    <SafeAreaView style={[styles.contentPage, {backgroundColor: theme === true ? lightColors.bgColor : darkColors.bgColor}]}>
      <View style={styles.upperTab}>
        <Text style={styles.upperTabTxt}>{t('confirmationTitle')}{' '}</Text>
      </View>
      <View style={styles.formPage}>
        <TouchableOpacity onPress={goBack} style={styles.backIcon}>
          <Ionicons name="arrow-back" color={theme === true ? lightColors.txtColor : darkColors.txtColor} size={24} />
        </TouchableOpacity>
        <Text style={[styles.confirmEmail, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>{t('confirmEmail')}{' '}</Text>
        <View style={styles.confirmMessageView}>
          <Text style={styles.confirmMessage}>{t('confirmMessage')}{' '}</Text>
          <Text style={styles.confirmMessage}>{route.params.values.identifier}</Text>
          <Text style={styles.confirmMessage}>{t('confirmCheck')}{' '}</Text>
        </View>
        <Animatable.View
          animation="bounceInDown"
          iterationCount={1}
          iterationDelay={500}
          direction="alternate">
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => { navigation.navigate('RegistrationThankYou'); }}>
            <Text style={styles.actionTxtBtn}>{t('confirmationButton')}{' '}</Text>
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View
          animation="bounceInDown"
          iterationCount={1}
          iterationDelay={1000}
          direction="alternate">
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => {nextFunction(route.params.values);}}>
            <Text style={styles.actionTxtBtn}>{t('nextTitle')}{' '}</Text>
          </TouchableOpacity>
        </Animatable.View>
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
  doLoginRegister: (params: any) => dispatch(requestLoginRegister(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailConfirmation);

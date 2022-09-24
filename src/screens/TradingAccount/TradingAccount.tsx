/* eslint-disable prettier/prettier */
import React from 'react';
import {SafeAreaView, Image, Text, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {images} from '../../constants';
import styles from './TradingAccountStyle';
import {lightColors, darkColors} from '../../colormode/ColorMode';
import {connect} from 'react-redux';
import {setLight, setDark} from '../../store/Actions/themeActionCreator';
import {useTranslation} from 'react-i18next';

const TradingAccount = ({navigation, theme}: any) => {

  const {t} = useTranslation();

  return (
    <SafeAreaView style={[styles.content, {backgroundColor: theme === true ? lightColors.bgColor : darkColors.bgColor}]}>
      <Image style={styles.appLogo} source={images.dttLogo} resizeMode="contain" />
      <Text style={[styles.questionTxt, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>{t('tradingAccount')}{' '}</Text> 
      <Animatable.View
        animation="bounceInDown"
        iterationCount={1}
        iterationDelay={500}
        direction="alternate">
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate('Drawer')}>
          <Text style={styles.actionTxtBtn}>{t('yesButton')}{' '}</Text>
        </TouchableOpacity>
      </Animatable.View>
      <Animatable.View
        animation="bounceInDown"
        iterationCount={1}
        iterationDelay={1000}
        direction="alternate">
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate('TraderType')}>
          <Text style={styles.actionTxtBtn}>{t('noButton')}{' '}</Text>
        </TouchableOpacity>
      </Animatable.View>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(TradingAccount);

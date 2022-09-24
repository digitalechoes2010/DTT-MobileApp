/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './LanguageSettingStyle';
import {lightColors, darkColors} from '../../colormode/ColorMode';
import {connect} from 'react-redux';
import {setLight, setDark} from '../../store/Actions/themeActionCreator';
import {setEnglish, setArabic, setEspanol} from '../../store/Actions/languageActionCreator';
import '../../assets/i18n/i18n';
import {useTranslation} from 'react-i18next';

const LanguageSetting = ({navigation, theme, language, makeEnglish, makeArabic, makeEspanol}: any) => {

  const {t, i18n} = useTranslation();

  const transEnglish = () => {
    i18n
      .changeLanguage('en')
      .then(() => {
        makeEnglish();
        language === 'en';
        navigation.navigate('SettingStack');
      })
      .catch(err => console.log(err));
  };

  const transArabic = () => {
    i18n
      .changeLanguage('ar')
      .then(() => {
        makeArabic();
        language === 'ar';
        navigation.navigate('SettingStack');
      })
      .catch(err => console.log(err));
  };

  const transEspanol = () => {
    i18n
      .changeLanguage('sp')
      .then(() => {
        makeEspanol();
        language === 'sp';
        navigation.navigate('SettingStack');
      })
      .catch(err => console.log(err));
  };

  const goBack = () => {
    navigation.pop();
  };

  return (
    <SafeAreaView style={[styles.contentPage, {backgroundColor: theme === true ? lightColors.bgColor : darkColors.bgColor}]}>
      <View style={styles.upperTab}>
        <Text style={styles.upperTabTxt}>{t('settingsTitle')} </Text>
      </View>
      <View style={styles.formPage}>
        <TouchableOpacity onPress={goBack} style={styles.backIcon}>
          <Ionicons name="arrow-back" color={theme === true ? lightColors.txtColor : darkColors.txtColor} size={24} />
        </TouchableOpacity>
        <View style={styles.avatarImage}>
          <AntDesign name="earth" color={theme === true ? lightColors.txtColor : darkColors.txtColor} size={96} />
        </View>
        <Text style={[styles.txtName, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>{t('chooseLanguage')}{' '}</Text>
        <View style={styles.languageButtons}>
          <Animatable.View
            animation="bounceInDown"
            iterationCount={1}
            iterationDelay={500}
            direction="alternate">
            <TouchableOpacity
              style={[styles.actionBtn, {backgroundColor: language === 'en' ? '#AE1614' : '#E6E6E6'}]}
              onPress={() => {transEnglish()}}>
              <Text style={styles.actionTxtBtn}>English</Text>
            </TouchableOpacity>
          </Animatable.View>
          <Animatable.View
            animation="bounceInDown"
            iterationCount={1}
            iterationDelay={1000}
            direction="alternate">
            <TouchableOpacity
              style={[styles.actionBtn, {backgroundColor: language === 'ar' ? '#AE1614' : '#E6E6E6'}]}
              onPress={() => {transArabic()}}>
              <Text style={styles.actionTxtBtn}>Arabic</Text>
            </TouchableOpacity>
          </Animatable.View>
          <Animatable.View
            animation="bounceInDown"
            iterationCount={1}
            iterationDelay={1500}
            direction="alternate">
            <TouchableOpacity
              style={[styles.actionBtn, {backgroundColor: language === 'sp' ? '#AE1614' : '#E6E6E6'}]}
              onPress={() => {transEspanol()}}>
              <Text style={styles.actionTxtBtn}>Español</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
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
  makeEnglish: () => dispatch(setEnglish()),
  makeArabic: () => dispatch(setArabic()),
  makeEspanol: () => dispatch(setEspanol()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSetting);

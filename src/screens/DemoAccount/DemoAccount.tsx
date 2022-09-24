/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, ScrollView, Text, TouchableOpacity} from 'react-native';
import styles from './DemoAccountStyle';
import {lightColors, darkColors} from '../../colormode/ColorMode';
import {connect} from 'react-redux';
import {setLight, setDark} from '../../store/Actions/themeActionCreator';
import {useTranslation} from 'react-i18next';

const DemoAccount = ({navigation, theme}: any) => {

  const {t} = useTranslation();

  return (
    <SafeAreaView style={[styles.contentPage, {backgroundColor: theme === true ? lightColors.bgColor : darkColors.bgColor}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[styles.pageTxt, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>Develop your skills and master the art of trading in a risk-free environment by opening a 
          free, 30 day trial Direct TT Demo account.</Text>
        <Text style={[styles.pageTxt, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>50 000$ Virtual Account</Text>
        <Text style={[styles.pageTxt, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>Live Prices & Authentic Experience</Text>
        <Text style={[styles.pageTxt, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>Trade at your own pace with zero risks</Text>
        <Text style={[styles.pageTxt, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>Access to real-time spreads and execution speed</Text>
        <Text style={[styles.pageTxt, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>Manage your virtual portfolio easily with a clean and simple interface</Text>
        <Text style={[styles.pageTxt, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>Follow each instrument's real-time trends with advanced analysis tools</Text>
        <Text style={[styles.pageTxt, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>Experiment with different risk levels by applying leverage, Stop Loss and Take Profit</Text>
        <Text style={[styles.pageTxt, {marginBottom: 0, color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>Connect with top traders from all over the world</Text>
        <TouchableOpacity
          style={styles.actionBtn}>
          <Text style={styles.actionTxtBtn}>{t('learnMoreButton')}{' '}</Text>
        </TouchableOpacity>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(DemoAccount);

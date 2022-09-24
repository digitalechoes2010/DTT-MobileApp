/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './AboutStyle';
import {lightColors, darkColors} from '../../colormode/ColorMode';
import {connect} from 'react-redux';
import {setLight, setDark} from '../../store/Actions/themeActionCreator';
import {useTranslation} from 'react-i18next';

const About = ({navigation, theme}: any) => {

  const {t} = useTranslation();

  return (
    <SafeAreaView style={[styles.contentPage, {backgroundColor: theme === true ? lightColors.bgColor : darkColors.bgColor}]}>
      <Text style={[styles.pageTitle, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>{t('aboutTitle')}{' '}</Text>
      <View style={styles.videoPlayer}>
        <Ionicons name="play-circle-outline" color={'#AE1614'} size={96} />
      </View>
      <Animatable.View
        animation="bounceInDown"
        iterationCount={1}
        iterationDelay={500}
        direction="alternate">
        <TouchableOpacity 
          style={styles.actionBtn}
          onPress={() => navigation.navigate('TradingAccount')}>
          <Text style={styles.actionTxtBtn}>Select Menu</Text>
        </TouchableOpacity>
      </Animatable.View>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);

/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './TraderTypeStyle';
import {lightColors, darkColors} from '../../colormode/ColorMode';
import {connect} from 'react-redux';
import {setLight, setDark} from '../../store/Actions/themeActionCreator';
import {useTranslation} from 'react-i18next';

const TraderType = ({navigation, theme}: any) => {

  const {t} = useTranslation();

  const goBack = () => {
    navigation.pop();
  };

  return (
    <SafeAreaView>
      <ScrollView style={[styles.contentPage, {backgroundColor: theme === true ? lightColors.bgColor : darkColors.bgColor}]} showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={goBack} style={styles.backIcon}>
          <Ionicons name="arrow-back" color={theme === true ? lightColors.txtColor : darkColors.txtColor} size={24} />
        </TouchableOpacity>
        <View style={styles.divChild}>
          <Text style={[styles.titleTxt, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>{t('beginnerTrader')}{' '}</Text>
          <Text style={[styles.contentTxt, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>{t('beginnerTxt')}{' '}</Text>
          <TouchableOpacity 
            style={styles.actionBtn}
            onPress={() => navigation.navigate('PartnershipInterested', {userType: 'Beginner'})}>
            <Text style={styles.actionTxtBtn}>{t('beginnerButton')}{' '}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.divChild}>
          <Text style={[styles.titleTxt, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>{t('experiencedTrader')}{' '}</Text>
          <Text style={[styles.contentTxt, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>{t('experiencedTxt')}{' '}</Text>
          <TouchableOpacity 
            style={styles.actionBtn}
            onPress={() => navigation.navigate('PartnershipInterested', {userType: 'Experienced'})}>
            <Text style={styles.actionTxtBtn}>{t('experiencedButton')}{' '}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
  
};

const mapStateToProps = (state: any) => {
  return {
    theme: state.ThemeReducer.theme,
    reduxValues: state.LoginReducer,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  setLight: () => dispatch(setLight()),
  setDark: () => dispatch(setDark()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TraderType);

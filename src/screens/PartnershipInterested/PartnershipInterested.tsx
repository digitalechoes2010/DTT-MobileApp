/* eslint-disable prettier/prettier */
import React from 'react';
import {SafeAreaView, Image, Text, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {images} from '../../constants';
import styles from './PartnershipInterestedStyle';
import {lightColors, darkColors} from '../../colormode/ColorMode';
import {connect} from 'react-redux';
import {setLight, setDark} from '../../store/Actions/themeActionCreator';
import {logout} from '../../store/Actions/loginActionCreator';
import {useTranslation} from 'react-i18next';
import axios from 'axios';

const PartnershipInterested = ({theme, route, reduxValues, doLogout}: any) => {

  const {t} = useTranslation();

  const assignType = async (userType: any, userPartnership:any) => {
    console.log('Account Type:', userType);
    await axios
      .put(
        'https://dtt-cms-egztq.ondigitalocean.app/api/users/' + reduxValues.userData.user.id,
        {
          type : userType,
          partnership: userPartnership,
        },
        {
          headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + reduxValues.userData.jwt
          }
        }
      )
      .then(response => {
        doLogout();
        // navigation.push('Drawer');
        {console.log('Register Response:', response)}
        {console.log('Assigned Type:', reduxValues.userData.user.type)}
      })
      .catch(err => console.log('Error:', err));
  };

  return (
    <SafeAreaView style={[styles.content, {backgroundColor: theme === true ? lightColors.bgColor : darkColors.bgColor}]}>
      <Image style={styles.appLogo} source={images.dttLogo} resizeMode="contain" />
      <Text style={[styles.questionTxt, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>{t('partnershipInterested')}{' '}</Text> 
      <Animatable.View
        animation="bounceInDown"
        iterationCount={1}
        iterationDelay={500}
        direction="alternate">
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => assignType(route.params.userType, true)}>
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
          onPress={() => assignType(route.params.userType, false)}>
          <Text style={styles.actionTxtBtn}>{t('noButton')}{' '}</Text>
        </TouchableOpacity>
      </Animatable.View>
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
    doLogout: () => dispatch(logout()),
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(PartnershipInterested);

/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, Text, View, TouchableOpacity, Modal, Animated} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './SettingStyle';
import countryCodes from '../../constants/countriesCodes';
import {lightColors, darkColors} from '../../colormode/ColorMode';
import {connect} from 'react-redux';
import {setLight, setDark} from '../../store/Actions/themeActionCreator';
import {logout} from '../../store/Actions/loginActionCreator';
import {useTranslation} from 'react-i18next';

const Setting = ({navigation, theme, reduxValues, doLogout}: any) => {

  const {t} = useTranslation();

  const [visible, setVisible] = React.useState(false);
  
  let diallingCode = '';
  countryCodes.map((countryCodeDial: any) => {
    if(countryCodeDial.country === reduxValues.userData.user.country)
        return diallingCode = countryCodeDial.isoCode2;
    return diallingCode;
  })
  
  const ModalPopup = ({visible, children}:any) => {
    const [showModal, setShowModal] = React.useState(visible);
    const scaleValue = React.useRef(new Animated.Value(0)).current;
    React.useEffect(() => {
      toggleModal();
    }, [visible]);
    const toggleModal = () => {
      if (visible) {
        setShowModal(true);
        Animated.spring(scaleValue, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
      } else {
        setTimeout(() => setShowModal(false), 200);
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    };
    return (
      <Modal transparent visible={showModal}>
        <View style={styles.modalBackground}>
          <Animated.View
            style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
            {children}
          </Animated.View>
        </View>
      </Modal>
    );
  };

  function renderVerificationModal() {
    return (
      <View>
        <ModalPopup visible={visible}>
          <Text style={styles.questionTxt}>{t('logoutConfirmation')}{' '}</Text>
          <TouchableOpacity
            style={styles.actionBtnModalView}
            onPress={() => {doLogout();}}>
            <Text style={styles.actionTxtBtn}>{t('yesButton')}{' '}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionBtnModalView}
            onPress={() => setVisible(false)}>
            <Text style={styles.actionTxtBtn}>{t('noButton')}{' '}</Text>
          </TouchableOpacity>
        </ModalPopup>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.contentPage, {backgroundColor: theme === true ? lightColors.bgColor : darkColors.bgColor}]}>
      <View style={styles.upperTab}>
        <Text style={styles.upperTabTxt}>{t('settingsTitle')}{' '}</Text>
      </View>
      <View style={styles.formPage}>
        <View style={styles.avatarImage}>
          <MaterialIcons name="account-box" color={theme === true ? lightColors.txtColor : darkColors.txtColor} size={96} />
        </View>
        <View style={[styles.personName, {backgroundColor: theme === true ? lightColors.bgInverseColor : darkColors.bgInverseColor}]}>
          <Text style={[styles.txtName, {color: theme === true ? lightColors.bgColor : darkColors.bgColor}]}>{reduxValues.userData.user.fullname}</Text>
        </View>
        <View style={styles.actionView}>
          <Animatable.View
            animation="bounceInDown"
            iterationCount={1}
            iterationDelay={500}
            direction="alternate">
            <TouchableOpacity
              style={styles.actionBtnView}
              onPress={() => {navigation.navigate('AccountDetailStack', {countryCode: diallingCode}); }}>
              <Text style={styles.actionTxtBtn}>{t('accountDetails')}{' '}</Text>
            </TouchableOpacity>
          </Animatable.View>
          <Animatable.View
            animation="bounceInDown"
            iterationCount={1}
            iterationDelay={1000}
            direction="alternate">
            <TouchableOpacity
              style={styles.actionBtnView}
              onPress={() => {navigation.navigate('ChangePasswordStack'); }}>
              <Text style={styles.actionTxtBtn}>{t('changePassword')}{' '}</Text>
            </TouchableOpacity>
          </Animatable.View>
          <Animatable.View
            animation="bounceInDown"
            iterationCount={1}
            iterationDelay={1500}
            direction="alternate">
            <TouchableOpacity
              style={styles.actionBtnView}
              onPress={() => {navigation.navigate('LanguageSettingStack'); }}>
              <Text style={styles.actionTxtBtn}>{t('language')}{' '}</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
        <Animatable.View
          animation="bounceInDown"
          iterationCount={1}
          iterationDelay={2000}
          direction="alternate">
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => setVisible(true)}>
            <Text style={styles.actionTxtBtn}>{t('logoutButton')}{' '}</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
      {renderVerificationModal()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Setting);

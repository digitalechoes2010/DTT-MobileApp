/* eslint-disable prettier/prettier */
import React from 'react';
import {SafeAreaView, View, Switch, TouchableOpacity, Modal, Animated} from 'react-native';
import {Avatar, Title, Caption, Drawer, Text} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {images} from '../../constants';
import styles from './CustomDrawerStyle';
import {lightColors, darkColors} from '../../colormode/ColorMode';
import {connect} from 'react-redux';
import {setLight, setDark} from "../../store/Actions/themeActionCreator";
import {logout} from '../../store/Actions/loginActionCreator';
import {useTranslation} from 'react-i18next';

function CustomDrawer({theme, setLight, setDark, reduxValues, doLogout}:any) {

  const {t} = useTranslation();

  const [visible, setVisible] = React.useState(false);

  const toggleFunction = () => {
    if(theme === true) {
      setDark();
    }
    else {
      setLight();
    }
  };

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
    <SafeAreaView style={[styles.flexContent, {backgroundColor: theme === true ? lightColors.bgColor : darkColors.bgColor}]}>
      <DrawerContentScrollView>
        <View style={styles.flexContent}>
          <View style={styles.userInfoSection}>
            <View style={styles.avatarPart}>
              <Avatar.Image source={images.backgroundImage} size={50} />
              <View style={styles.avatarInfo}>
                <Title style={[styles.title, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>{reduxValues.userData.user.fullname}</Title>
                <Caption style={[styles.caption, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>{reduxValues.userData.user.type}</Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <Text style={[styles.preferenceTitle, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>Preferences</Text>
            <View style={styles.preference}>
              <Text style={[styles.preferenceTxt, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>Dark Theme</Text>
              <Switch
                trackColor={{false: '#AAA', true: '#CBCBCB'}}
                thumbColor={theme ? '#CBCBCB' : '#AE1614'}
                ios_backgroundColor="#3e3e3e"
                value={theme}
                onValueChange={toggleFunction}
                style={{transform: [{rotate: '180deg'}]}}
              />
            </View>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({size}) => (
            <MaterialCommunityIcons name="exit-to-app" color={theme === true ? lightColors.txtColor : darkColors.txtColor} size={size} />
          )}
          label={t('logoutButton')}
          labelStyle={{color: theme === true ? lightColors.txtColor : darkColors.txtColor}}
          onPress={() => setVisible(true)}
        />
      </Drawer.Section>
      {renderVerificationModal()}
    </SafeAreaView>
  );

}

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

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);

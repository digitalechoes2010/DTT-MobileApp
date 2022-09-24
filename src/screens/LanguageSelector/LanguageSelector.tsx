/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, ImageBackground, Image, Text, View, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {images} from '../../constants';
import styles from './LanguageSelectorStyle';
import {connect} from 'react-redux';
import {setEnglish, setArabic, setEspanol} from '../../store/Actions/languageActionCreator';
import '../../assets/i18n/i18n';
import {useTranslation} from 'react-i18next';

const LanguageSelector = ({navigation, language, makeEnglish, makeArabic, makeEspanol}: any) => {
  
  const {i18n} = useTranslation();

  const transEnglish = () => {
    i18n
      .changeLanguage('en')
      .then(() => {
        makeEnglish();
        language === 'en';
        navigation.navigate('RegistrationLogin');
      })
      .catch(err => console.log(err));
  };

  const transArabic = () => {
    i18n
      .changeLanguage('ar')
      .then(() => {
        makeArabic();
        language === 'ar';
        navigation.navigate('RegistrationLogin');
      })
      .catch(err => console.log(err));
  };

  const transEspanol = () => {
    i18n
      .changeLanguage('sp')
      .then(() => {
        makeEspanol();
        language === 'sp';
        navigation.navigate('RegistrationLogin');
      })
      .catch(err => console.log(err));
  };

  return (
    <SafeAreaView>
      <ImageBackground style={styles.backgroundImage} source={images.backgroundImage} resizeMode="cover">
        <View style={styles.content}>
          <Image style={styles.appLogo} source={images.fullDTTLogo} resizeMode="contain" />
          <View style={styles.actionView}>
            <Animatable.View
              animation="bounceInUp"
              iterationCount={1}
              iterationDelay={500}
              direction="alternate">
              <TouchableOpacity 
                style={styles.actionBtn}
                onPress={() => {transEnglish()}}>
                <Text style={styles.actionTxtBtn}>English</Text>
              </TouchableOpacity>
            </Animatable.View>
            <Animatable.View
              animation="bounceInUp"
              iterationCount={1}
              iterationDelay={1000}
              direction="alternate">
              <TouchableOpacity 
                style={styles.actionBtn}  
                onPress={() => {transArabic()}}>
                <Text style={styles.actionTxtBtn}>Arabic</Text>
              </TouchableOpacity>
            </Animatable.View>
            <Animatable.View
              animation="bounceInUp"
              iterationCount={1}
              iterationDelay={1500}
              direction="alternate">
              <TouchableOpacity 
                style={styles.actionBtn}
                onPress={() => {transEspanol()}}>
                <Text style={styles.actionTxtBtn}>Espanol</Text>
              </TouchableOpacity>
            </Animatable.View>
          </View>
        </View>
      </ImageBackground>
      {console.log('Language:', language)}
    </SafeAreaView>
  );
  
};

const mapStateToProps = (state: any) => {
  return {
    language: state.LanguageReducer.language,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  makeEnglish: () => dispatch(setEnglish()),
  makeArabic: () => dispatch(setArabic()),
  makeEspanol: () => dispatch(setEspanol()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelector);

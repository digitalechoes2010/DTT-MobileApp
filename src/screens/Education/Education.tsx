/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, ScrollView, Image, Text, View, Dimensions, Animated, TouchableOpacity} from 'react-native';
import Unorderedlist from 'react-native-unordered-list';
import styles from './EducationStyle';
import {lightColors, darkColors} from '../../colormode/ColorMode';
import {connect} from 'react-redux';
import {setLight, setDark} from '../../store/Actions/themeActionCreator';
import {useTranslation} from 'react-i18next';
import axios from 'axios';

const Education = ({navigation, theme, reduxValues}: any) => {

  const {t} = useTranslation();

  const [imageCarousel, setImageCarousel] = React.useState([])

  const {width} = Dimensions.get('window');
  const scrollX = new Animated.Value(0);

  React.useEffect(() => {
    axios
    .get(
      'https://dtt-cms-egztq.ondigitalocean.app/api/news2s/1?populate=*',
      {
        headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + reduxValues.userData.jwt
        },
      }
    )
    .then(response => {
      setImageCarousel(response.data.data.attributes.sliders.data);
    })
    .catch(err => {
      console.log('Error:', err);
    });
  }, []);


  function renderDots() {
    const dotPosition = Animated.divide(scrollX, width);
    return (
      <View>
        <View style={styles.dotsLine}>
          {imageCarousel.map((image:any, index:any) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.25, 1, 0.25],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={`dot-${index}`}
                opacity={opacity}
                style={styles.dotStyle}
              />
            );
          })}
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.contentPage, {backgroundColor: theme === true ? lightColors.bgColor : darkColors.bgColor}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.bannerImage, {marginBottom: 20, width: width}]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          pagingEnabled
          style={styles.bannerImage}>
          {imageCarousel.map((image:any, index:any) => (
            <Image
              key={index}
              source={{uri: image.attributes.url}}
              style={[styles.bannerImage, {marginBottom: 20, width, resizeMode: 'cover'}]}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.dotsLine}>{renderDots()}</View>
        {/* <Text style={[styles.pageTxt, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>Whether you're a beginner or an advanced trader, the success of your trading journey is
          dependent on understanding everything about the financial markets. Before you dive in and start
          investing, it is imperative to be informed.</Text>
        <Text style={[styles.pageTxt, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>With free weekly live webinars, seminars and a vast library of video tutorials, Direct TT
          makes sure to provide you with all the necessary information to succeed.
          Some of the courses we cover include:</Text>
        <View style={styles.unorderedList}>
          <Unorderedlist color='#AE1614'>
            <Text style={[styles.bulletTxt, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>What is forex, commodities, indices, stocks, and cryptocurrency</Text>
          </Unorderedlist>
          <Unorderedlist color='#AE1614'>
            <Text style={[styles.bulletTxt, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>What is regulations and why they are crucial</Text>
          </Unorderedlist>
          <Unorderedlist color='#AE1614'>
            <Text style={[styles.bulletTxt, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>What are your accounts options</Text>
          </Unorderedlist>
          <Unorderedlist color='#AE1614'>
            <Text style={[styles.bulletTxt, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>How to use trading platforms</Text>
          </Unorderedlist>
          <Unorderedlist color='#AE1614'>
            <Text style={[styles.bulletTxt, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>How to form advanced strategies</Text>
          </Unorderedlist>
          <Unorderedlist color='#AE1614'>
            <Text style={[styles.bulletTxt, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>How to analyze trading signals</Text>
          </Unorderedlist>
          <Unorderedlist color='#AE1614'>
            <Text style={[styles.bulletTxt, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>Bespoke courses designed to your needs</Text>
          </Unorderedlist>
        </View>
        <Text style={[styles.pageTxt, {marginBottom: 0, color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>Our courses are 100% free and available in English, Arabic, and Spanish. Sign up today and our
          leading instructors will make sure you are fully informed so your trading experience can be triumphant.</Text> */}
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
    reduxValues: state.LoginReducer,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  setLight: () => dispatch(setLight()),
  setDark: () => dispatch(setDark()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Education);

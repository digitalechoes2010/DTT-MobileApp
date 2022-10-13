/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, ScrollView, Image, View, Text, Dimensions, Animated} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Education from '../Education/Education';
import DemoAccount from '../DemoAccount/DemoAccount';
import AccountTypes from '../AccountTypes/AccountTypes';
import styles from './HomeScreenStyle';
import {lightColors, darkColors} from '../../colormode/ColorMode';
import {connect} from 'react-redux';
import {setLight, setDark} from '../../store/Actions/themeActionCreator';
import axios from 'axios';

const Tab = createMaterialTopTabNavigator();

const HomeScreen = ({navigation, theme, reduxValues}: any) => {

  const [bannerUrl, setBannerUrl] = React.useState();
  const bannerScroll = [
    bannerUrl,
    bannerUrl,
    bannerUrl,
  ];

  const {width} = Dimensions.get('window');
  const scrollX = new Animated.Value(0);

  const userType = reduxValues.userData.user.type;
  const userPartnership = reduxValues.userData.user.partnership;

  const BeginnerData = [
    {
      id: 1,
      name: "Webinars",
      icon: "arrow-back",
    },
    {
      id: 2,
      name: "Webinars",
      icon: "arrow-back",
    },
    {
      id: 3,
      name: "Webinars",
      icon: "arrow-back",
    },
    {
      id: 4,
      name: "Webinars",
      icon: "arrow-back",
    },
  ];

  {console.log("Type", userType, "Partnership", userPartnership)}

  React.useEffect(() => {
    axios
    .get(
      'https://dtt-cms-egztq.ondigitalocean.app/api/newses/1?populate=*',
      {
        headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + reduxValues.userData.jwt
        },
      }
    )
    .then(response => {
      setBannerUrl(response.data.data.attributes.banner.data.attributes.formats.thumbnail.url);
    })
    .catch(err => {
      console.log('Error:', err);
    });
  }, []);


  function renderHeader() {
    return (
      <View style={[styles.bannerImage, {marginBottom: 20, width: width - 30}]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        pagingEnabled
        style={styles.bannerImage}>
        {bannerScroll.map((image:any, index:any) => (
          <Image
            key={index}
            source={{uri: bannerUrl}}
            style={[styles.bannerImage, {marginBottom: 20, width: width - 30, resizeMode: 'cover'}]}
          />
        ))}
      </ScrollView>
      <View style={styles.dotsLine}>{renderDots()}</View>
    </View>
    );
  }

  function renderDots() {
    const dotPosition = Animated.divide(scrollX, width);
    return (
      <View>
        <View style={styles.dotsLine}>
          {bannerScroll.map((image:any, index:any) => {
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

  function renderMenu() {
    if (userType == 'Beginner' && userPartnership == false)
      return (
        <>
          {/* <Tab.Navigator
            screenOptions={{
              tabBarScrollEnabled: true,
              tabBarIndicatorStyle: {backgroundColor: '#AE1614'},
              tabBarLabelStyle: {fontSize: 14, textTransform: 'capitalize'},
              tabBarActiveTintColor: "#AE1614",
              tabBarInactiveTintColor: theme === true ? lightColors.txtColor : darkColors.txtColor,
              tabBarStyle: {backgroundColor: theme === true ? lightColors.bgColor : darkColors.bgColor},
            }}
          >
            <Tab.Screen name="Education & Skill Development" component={Education} />
            <Tab.Screen name="Self Trading Accounts" component={DemoAccount} />
            <Tab.Screen name="Managed Trading Accounts" component={AccountTypes} />
          </Tab.Navigator> */}

          <View>
            <View style={styles.upperView}>
              <Text style={styles.upperTxt}>Education & Skills</Text>
            </View>
            <View style={styles.lowerView}>
              <View style={styles.lowerParent}>
                <View style={styles.lowerChild}>
                  <MaterialCommunityIcons name="television-play" color='#FFFFFF' size={32} />
                  <Text style={styles.lowerTxt}>Webinars</Text>
                </View>
                <View style={styles.lowerChild}>
                  <MaterialCommunityIcons name="family-tree" color='#FFFFFF' size={32} />
                  <Text style={styles.lowerTxt}>Seminars</Text>
                </View>
                <View style={styles.lowerChild}>
                  <Foundation name="play-video" color='#FFFFFF' size={32} />
                  <Text style={styles.lowerTxt}>Videos</Text>
                </View>
              </View>
              <View style={styles.lowerParent}>
                <View style={styles.lowerChild}>
                  <MaterialIcons name="person-outline" color='#FFFFFF' size={32} />
                  <Text style={styles.lowerTxt}>Demo Account</Text>
                </View>
              </View>
            </View>
            </View>

        </>
      );
    else if (userType == 'Beginner' && userPartnership == true)
      return (
        <>
          <Tab.Navigator
            screenOptions={{
              tabBarScrollEnabled: true,
              tabBarIndicatorStyle: {backgroundColor: '#AE1614'},
              tabBarLabelStyle: {fontSize: 14, textTransform: 'capitalize'},
              tabBarActiveTintColor: "#AE1614",
              tabBarInactiveTintColor: theme === true ? lightColors.txtColor : darkColors.txtColor,
              tabBarStyle: {backgroundColor: theme === true ? lightColors.bgColor : darkColors.bgColor},
            }}
          >
            <Tab.Screen name="Education & Skill Development" component={Education} />
            <Tab.Screen name="Self Trading Accounts" component={DemoAccount} />
            <Tab.Screen name="Managed Trading Accounts" component={AccountTypes} />
            <Tab.Screen name="Partnership Programs" component={Education} />
          </Tab.Navigator>
        </>
      );
    else if (userType == 'Experienced' && userPartnership == false)
      return (
        <>
          <Tab.Navigator
            screenOptions={{
              tabBarScrollEnabled: true,
              tabBarIndicatorStyle: {backgroundColor: '#AE1614'},
              tabBarLabelStyle: {fontSize: 14, textTransform: 'capitalize'},
              tabBarActiveTintColor: "#AE1614",
              tabBarInactiveTintColor: theme === true ? lightColors.txtColor : darkColors.txtColor,
              tabBarStyle: {backgroundColor: theme === true ? lightColors.bgColor : darkColors.bgColor},
            }}
          >
            <Tab.Screen name="Advanced Education" component={Education} />
            <Tab.Screen name="Self Trading Accounts" component={DemoAccount} />
            <Tab.Screen name="Managed Trading Accounts" component={AccountTypes} />
          </Tab.Navigator>
        </>
      );
    else if (userType == 'Experienced' && userPartnership == true)
      return (
        <>
          <Tab.Navigator
            screenOptions={{
              tabBarScrollEnabled: true,
              tabBarIndicatorStyle: {backgroundColor: '#AE1614'},
              tabBarLabelStyle: {fontSize: 14, textTransform: 'capitalize'},
              tabBarActiveTintColor: "#AE1614",
              tabBarInactiveTintColor: theme === true ? lightColors.txtColor : darkColors.txtColor,
              tabBarStyle: {backgroundColor: theme === true ? lightColors.bgColor : darkColors.bgColor},
            }}
          >
            <Tab.Screen name="Advanced Education" component={Education} />
            <Tab.Screen name="Self Trading Accounts" component={DemoAccount} />
            <Tab.Screen name="Managed Trading Accounts" component={AccountTypes} />
            <Tab.Screen name="Partnership Programs" component={Education} />
          </Tab.Navigator>
        </>
      );
  }

  return (
    <SafeAreaView>
      <View style={[styles.contentPage, {backgroundColor: theme === true ? lightColors.bgColor : darkColors.bgColor}]}>
      {renderHeader()}
      {renderMenu()}
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

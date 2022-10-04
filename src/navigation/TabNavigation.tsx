import * as React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {lightColors, darkColors} from '../colormode/ColorMode';
import {connect} from 'react-redux';
import {setLight, setDark} from '../store/Actions/themeActionCreator';
import HomeStack from './HomeStack';
import LinkStack from './LinkStack';
import NotificationStack from './NotificationStack';
import ProfileStack from './ProfileStack';
import SettingStack from './SettingStack';

const TabNavigation = (theme:any) => {

  const Tab = createBottomTabNavigator();
  
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        animationEnabled: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#AE1614',
        tabBarInactiveTintColor: '#AAA',
        tabBarStyle: {height: Platform.OS === 'ios' ? 80 : 60, borderTopLeftRadius: 25, borderTopRightRadius: 25,
        backgroundColor: theme.theme === true ? lightColors.tabBgColor : darkColors.tabBgColor,
        position:'absolute', bottom: 0},
        tabBarIcon: ({ focused }) => {
          if (route.name === 'Home') {
            return <Entypo name='home' size={26} color={focused ? '#AE1614' : '#AAA'} />
          } 
          else if (route.name === 'Link') {
            return <Entypo name='link' size={26} color={focused ? '#AE1614' : '#AAA'} />
          }
          else if (route.name === 'Notification') {
            return <Ionicons name='notifications' size={26} color={focused ? '#AE1614' : '#AAA'} />
          } 
          else if (route.name === 'Profile') {
            return <Ionicons name='person-sharp' size={26} color={focused ? '#AE1614' : '#AAA'} />
          } 
          else if (route.name === 'Settings') {
            return <Ionicons name='settings' size={26} color={focused ? '#AE1614' : '#AAA'} />
          }
        },
      })}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Link" component={LinkStack} />
      <Tab.Screen name="Notification" component={NotificationStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
      <Tab.Screen name="Settings" component={SettingStack} />
    </Tab.Navigator>
  );
  
}

const mapStateToProps = (state: any) => {
  return {
    theme: state.ThemeReducer.theme,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  setLight: () => dispatch(setLight()),
  setDark: () => dispatch(setDark()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabNavigation);

/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './SagaNavigation';
import {useSelector} from 'react-redux';
import SplashScreen from 'react-native-lottie-splash-screen';
import LanguageSelector from '../screens/LanguageSelector/LanguageSelector';
import RegistrationLogin from '../screens/RegistrationLogin/RegistrationLogin';
import Login from '../screens/Login/Login';
import RegisterStepOne from '../screens/RegisterStepOne/RegisterStepOne';
import RegisterStepTwo from '../screens/RegisterStepTwo/RegisterStepTwo';
import EmailConfirmation from '../screens/EmailConfirmation/EmailConfirmation';
import ResetPasswordStepOne from '../screens/ResetPasswordStepOne/ResetPasswordStepOne';
import ResetPasswordStepTwo from '../screens/ResetPasswordStepTwo/ResetPasswordStepTwo';
import ResetPasswordStepThree from '../screens/ResetPasswordStepThree/ResetPasswordStepThree';

import DrawerNavigator from './DrawerNavigation';

export default function MainNavigation() {

  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  const Stack = createStackNavigator();

  const logStatus = useSelector((state:any) => state.LoginReducer.isLoggedIn)

  return (
    <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{headerShown: false, animationEnabled: false}}>
          {logStatus === false ?
            <>
              <Stack.Screen name="Language" component={LanguageSelector} />
              <Stack.Screen name="RegistrationLogin" component={RegistrationLogin} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="RegisterStepOne" component={RegisterStepOne} />
              <Stack.Screen name="RegisterStepTwo" component={RegisterStepTwo} />
              <Stack.Screen name="EmailConfirmation" component={EmailConfirmation} />
              <Stack.Screen name="ResetPasswordStepOne" component={ResetPasswordStepOne} />
              <Stack.Screen name="ResetPasswordStepTwo" component={ResetPasswordStepTwo} />
            </> : 
            <>
              <Stack.Screen name="Drawer" component={DrawerNavigator} />
              <Stack.Screen name="ResetPasswordStepThree" component={ResetPasswordStepThree} />
            </>
          }
      </Stack.Navigator>
      {console.log("Log Status:", logStatus)}
    </NavigationContainer>
  );
  
}

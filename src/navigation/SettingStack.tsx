import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Setting from '../screens/SettingScreen/Setting';
import AccountDetails from '../screens/AccountDetails/AccountDetails';
import ChangePassword from '../screens/ChangePassword/ChangePassword';
import LanguageSetting from '../screens/LanguageSetting/LanguageSetting';

export default function SettingStack() {

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false
      }}>
      <Stack.Screen name="SettingStack" component={Setting} />
      <Stack.Screen name="AccountDetailStack" component={AccountDetails} />
      <Stack.Screen name="ChangePasswordStack" component={ChangePassword} />
      <Stack.Screen name="LanguageSettingStack" component={LanguageSetting} />
    </Stack.Navigator>
  );
  
}

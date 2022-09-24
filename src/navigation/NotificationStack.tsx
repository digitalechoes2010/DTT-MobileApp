import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NotificationScreen from '../screens/NotificationScreen';

export default function NotificationStack() {

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="NotificationStack" component={NotificationScreen} />
    </Stack.Navigator>
  );
  
}

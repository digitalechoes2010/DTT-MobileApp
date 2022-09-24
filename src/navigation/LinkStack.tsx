import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LinkScreen from '../screens/LinkScreen';

export default function LinkStack() {

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LinkStack" component={LinkScreen} />
    </Stack.Navigator>
  );
  
}

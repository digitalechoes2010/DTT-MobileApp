import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer/CustomDrawer';
import TabNavigation from './TabNavigation';

const Drawer = createDrawerNavigator();

export default function App() {

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="HomeNav" component={TabNavigation} />
    </Drawer.Navigator>
  );
  
}

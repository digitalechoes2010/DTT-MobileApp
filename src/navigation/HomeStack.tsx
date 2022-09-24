import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import About from '../screens/About/About';
import TradingAccount from '../screens/TradingAccount/TradingAccount';
import TraderType from '../screens/TraderType/TraderType';
import PartnershipInterested from '../screens/PartnershipInterested/PartnershipInterested';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

const HomeStack = ({reduxValues}:any) => {

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {reduxValues.userData.user.type === null ?
        <>
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="TradingAccount" component={TradingAccount} />
          <Stack.Screen name="TraderType" component={TraderType} />
          <Stack.Screen name="PartnershipInterested" component={PartnershipInterested} />
        </> : 
        <>
          <Stack.Screen name="HomeStack" component={HomeScreen} />
        </>
      }
      {console.log("Account Type:", reduxValues.userData.user.type)}
    </Stack.Navigator>
  );
  
}

const mapStateToProps = (state: any) => {
  return {
    reduxValues: state.LoginReducer,
  };
};

export default connect(mapStateToProps, null)(HomeStack);

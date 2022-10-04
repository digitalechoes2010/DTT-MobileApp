/* eslint-disable prettier/prettier */
import React from 'react';
import {SafeAreaView, ImageBackground, Image, Text, View, TouchableOpacity, Dimensions, Platform, PermissionsAndroid, ActivityIndicator, Alert} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {images} from '../../constants';
import styles from './RegistrationLoginStyle';
import {useTranslation} from 'react-i18next';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

const RegistrationLogin = ({navigation}: {navigation: any}) => {

  const {t} = useTranslation();
  
  const {width} = Dimensions.get('window');
  const {height} = Dimensions.get('window');
  
  interface ILocation {
    latitude: number;
    longitude: number;
  }
  
  const [latitude, setLatitude] = React.useState<ILocation | number>();
  const [longitude, setLongitude] = React.useState<ILocation | number>();
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  Geocoder.init('AIzaSyDVVSGAtwY4iOR87tRmWqvnSwvif8YC4o4');
  async function requestPermissions() {
    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization("whenInUse");
      if(auth === "granted") {
        Geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            console.log("Position:", position);
            Geocoder.from(position.coords.latitude, position.coords.longitude)
            .then(async json => { 
              var countryCode = json.results[0].address_components[4].short_name;
              var country = json.results[0].address_components[4].long_name;
              var city = json.results[0].address_components[1].long_name;
              console.log("Country", country, "City", city);
              navigation.navigate('RegisterStepOne', {country: country, city: city, countryCode: countryCode});
              setTimeout(() => {
                setIsLoading(false);
              }, 1000);
            })
            .catch(err => {
              console.log('Error:', err);
              Alert.alert(
                t('unidentifiedLocation'),
                t('countryCityManually'),
                [{text: t('closeTxt')}],
                {cancelable: false},
              );
              setTimeout(() => {
                setIsLoading(false);
              }, 1000);
            });
          },
          (error) => {
            setError(error.message)
            console.log("Location Access Denied");
            setIsLoading(false);
            navigation.navigate('RegisterStepOne', {country: '', city: '', countryCode: 'AE'});
          },
          {enableHighAccuracy: false, timeout: 10000, maximumAge: 100000}
        );
      }
    }
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (PermissionsAndroid.RESULTS.GRANTED === "granted") {
        Geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            console.log("Position:", position);
            Geocoder.from(position.coords.latitude, position.coords.longitude)
            .then(async json => { 
              var countryCode = json.results[0].address_components[4].short_name;
              var country = json.results[0].address_components[4].long_name;
              var city = json.results[0].address_components[1].long_name;
              console.log("Country", country, "City", city);
              navigation.navigate('RegisterStepOne', {country: country, city: city, countryCode: countryCode});
              setTimeout(() => {
                setIsLoading(false);
              }, 1000);
            })
            .catch(err => {
              console.log('Error:', err);
              Alert.alert(
                t('unidentifiedLocation'),
                t('countryCityManually'),
                [{text: t('closeTxt')}],
                {cancelable: false},
              );
              setTimeout(() => {
                setIsLoading(false);
              }, 1000);
            });
          },
          (error) => {
            setError(error.message)
            console.log("Location Access Denied");
            setIsLoading(false);
            navigation.navigate('RegisterStepOne', {country: '', city: '', countryCode: 'AE'});
          },
          {enableHighAccuracy: false, timeout: 10000, maximumAge: 100000}
        );
      }
    }
  }

  return (
    <SafeAreaView>
      <ImageBackground style={{width: width, height: height}} source={images.backgroundImage} resizeMode="cover">
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
                onPress={async () => {setIsLoading(true); await requestPermissions();}}>
                {isLoading == false ? (
                  <Text style={styles.actionTxtBtn}>{t('registerTitle')}{' '}</Text>
                ) : (
                  <ActivityIndicator
                    size="small"
                    color="#000000"
                    style={styles.activityIndicator}
                  />
                )}
              </TouchableOpacity>
            </Animatable.View>
            <Animatable.View
              animation="bounceInUp"
              iterationCount={1}
              iterationDelay={1000}
              direction="alternate">
              <TouchableOpacity
                style={styles.actionBtn}
                disabled={isLoading}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.actionTxtBtn}>{t('loginButton')}{' '}</Text>
              </TouchableOpacity>
            </Animatable.View>
          </View>
          <Animatable.View
            animation="fadeIn"
            iterationDelay={1500}>
            <TouchableOpacity
              style={styles.languageBtn}
              disabled={isLoading}
              onPress={() => navigation.navigate('Language')}>
              <Text style={styles.languageTxtBtn}>{t('changeLanguage')}{' '}</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );

};

export default RegistrationLogin;

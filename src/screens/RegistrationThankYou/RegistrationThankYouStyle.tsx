/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  contentPage: {
    width: '100%',
    height: '100%',
  },
  upperTab: {
    alignItems: 'center',
    backgroundColor: '#AE1614',
    padding: 15,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  upperTabTxt: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  formPage: {
    paddingHorizontal: 25,
  },
  thankYouRegistration: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 40,
  },
  thankYouMessageView: {
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  thankYouMessage: {
    fontWeight: '500',
    fontSize: 16,
    color: '#B2B2B2',
    textAlign: 'center',
    marginTop: 15,
  },
  inputView: {
    marginTop: 10,
  },
  inputStyle: {
    fontWeight: '500', 
    fontSize: 14, 
    color: '#AE1614',
    paddingHorizontal: 15,
    width: '100%',
    marginTop: 30, 
    borderRadius: 30,
  },
  countryPicker: {
    borderRadius: 30,
    marginTop: 30,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  actionBtn: {
    width: '100%',
    backgroundColor: '#AE1614',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 40,
  },
  actionTxtBtn: {
    fontWeight: '500',
    fontSize: 14,
    color: '#FFFFFF',
  },
});

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
  backIcon: {
    marginVertical: 20,
  },
  avatarImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  inputView: {
    marginTop: 10,
  },
  inputLabel: {
    fontWeight: '500',
  },
  inputStyle: {
    height: 50,
    fontSize: 14, 
    color: '#000000',
    paddingHorizontal: 15,
    width: '100%',
    marginTop: 30, 
    borderRadius: 30,
  },
  phoneNumber: {
    borderRadius: 30,
    marginTop: 10,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  phoneInputContainer: {
    width: '100%', 
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  phoneTextContainer: {
    height: 50, 
    borderRadius: 30,
  },
  phoneTextInput: {
    fontSize: 14, 
    color: '#000000',
    height: 46, 
  },
  phoneTextCode: {
    fontWeight: '500', 
    fontSize: 14,
  },
  selectFields: {
    borderColor: '#2A365D',
    borderRadius: 30,
    marginTop: 20,
    width: '100%',
  },
  txtName: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 20,
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  actionBtn: {
    width: '100%',
    backgroundColor: '#AE1614',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 50,
  },
  actionTxtBtn: {
    fontWeight: '500',
    fontSize: 14,
    color: '#FFFFFF',
  },
  activityIndicator: {
    alignSelf: 'center',
    width: 60,
  },
});

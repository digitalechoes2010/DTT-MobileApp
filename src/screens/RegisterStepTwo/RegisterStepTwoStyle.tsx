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
  pageTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  pageSubTitle: {
    fontWeight: '500',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 20,
    lineHeight: 18,
  },
  inputView: {
    marginBottom: 20,
  },
  inputPasswordView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 30,
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
    marginTop: 10, 
    borderRadius: 30,
  },
  inputPasswordStyle: {
    height: 50,
    fontSize: 14, 
    color: '#000000',
    paddingHorizontal: 15,
    width: '85%',
    borderRadius: 30,
  },
  passwordIcon: {
    marginRight: 15,
  },
  errorMsg: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#AE1614',
    marginTop: 10,
  },
  actionBtn: {
    width: '100%',
    backgroundColor: '#AE1614',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
  },
  actionTxtBtn: {
    fontWeight: '500',
    fontSize: 14,
    color: '#FFFFFF',
  },
  lastView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 30,
  },
  activityIndicator: {
    alignSelf: 'center',
    width: 60,
  },
  haveAccount: {
    fontSize: 14,
  },
  secondActionBtn: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#AE1614',
    marginLeft: 5,
  },
  secondArabicActionBtn: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#AE1614',
    marginRight: 5,
  },
});

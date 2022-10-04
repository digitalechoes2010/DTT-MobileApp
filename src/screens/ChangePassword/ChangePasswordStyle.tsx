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
  inputPasswordView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 30,
    marginTop: 30,
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

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
  avatarImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 30,
  },
  personName: {
    width: '75%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    padding: 10,
    marginTop: 20,
  },
  txtName: {
    fontWeight: '500',
    fontSize: 14,
  },
  actionView: {
    marginTop: 20,
  },
  actionBtn: {
    width: '100%',
    backgroundColor: '#AE1614',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 50,
  },
  actionBtnView: {
    width: '100%',
    backgroundColor: '#AE1614',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
  },
  actionBtnModalView: {
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
  },
  questionTxt: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000000',
    alignSelf: 'center',
    textAlign: 'center',
  },
});

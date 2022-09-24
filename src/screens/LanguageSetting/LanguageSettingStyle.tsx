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
  txtName: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 20,
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  languageButtons: {
    marginTop: 20,
  },
  actionBtn: {
    width: '100%',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
  },
  actionTxtBtn: {
    fontWeight: '500',
    fontSize: 14,
    color: '#000000',
  },
});

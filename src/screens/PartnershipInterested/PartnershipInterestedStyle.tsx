/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  content: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  appLogo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  questionTxt: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 40,
    alignSelf: 'center',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  actionBtn: {
    width: '75%',
    backgroundColor: '#AE1614',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 30,
  },
  actionTxtBtn: {
    fontWeight: '500',
    fontSize: 14,
    color: '#FFFFFF',
  },
});

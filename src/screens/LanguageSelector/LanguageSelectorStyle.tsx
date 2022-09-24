/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  appLogo: {
    width: 215,
    height: 232,
    alignSelf: 'center',
  },
  actionView: {
    marginTop: 50,
  },
  actionBtn: {
    width: '75%',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
  },
  actionTxtBtn: {
    fontWeight: '500',
    fontSize: 14,
    color: '#000000',
  },
});

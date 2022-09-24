/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  flexContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  avatarPart: {
    flexDirection:'row',
    alignItems: 'center',
    marginTop: 15,
  },
  avatarInfo: {
    marginLeft:15,
    flexDirection:'column',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  drawerSection: {
    marginTop: 15,
    marginHorizontal: 15,
  },
  bottomDrawerSection: {
    borderTopColor: '#CBCBCB',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  preferenceTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  preferenceTxt: {
    fontSize: 14,
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
});

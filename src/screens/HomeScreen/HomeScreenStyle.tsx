/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  contentPage: {
    padding: 15,
    width: '100%',
    height: '100%',
    paddingBottom: 60,
  },
  bannerImage: {
    height: 150,
    borderRadius: 15,
  },
  dotsLine: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 5,
    alignSelf: 'center',
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: '#FFFFFF',
  },
  cardMenu: {
    width: '100%',
    backgroundColor: '#AE1614',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTxtMenu: {
    fontWeight: '500',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  upperView: {
    backgroundColor: '#AE1614',
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  upperTxt: {
    fontWeight: '500',
    fontSize: 16,
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  lowerView: {
    backgroundColor: '#522E2E',
    padding: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  lowerParent: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  lowerChild: {
    width: '30%',
    alignItems: 'center',
  },
  lowerTxt: {
    fontSize: 12,
    color: '#FFFFFF',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: 5,
  },
});

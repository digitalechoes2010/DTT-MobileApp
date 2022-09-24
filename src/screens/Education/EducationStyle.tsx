/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  contentPage: {
    width: '100%',
    height: '100%',
    paddingTop: 20,
  },
  bannerImage: {
    height: 300,
  },
  dotsLine: {
    flexDirection: 'row',
    top: 3,
    alignSelf: 'center',
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: '#AE1614',
  },
  image: {
    width: '100%',
    height:'100%',
  },
  pageTitleDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  pageTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  pageTxt: {
    fontSize: 14,
    textAlign: 'justify',
    marginBottom: 10,
  },
  bulletTxt: {
    fontSize: 14,
    marginBottom: 2.5,
  },
  unorderedList: {
    marginVertical: 20,
  },
  actionBtn: {
    width: '100%',
    backgroundColor: '#AE1614',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 30,
  },
  actionTxtBtn: {
    fontWeight: '500',
    fontSize: 14,
    color: '#FFFFFF',
  },
});

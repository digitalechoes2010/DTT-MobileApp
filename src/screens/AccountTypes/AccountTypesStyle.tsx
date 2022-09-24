/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  contentPage: {
    padding: 15,
    width: '100%',
    height: '100%',
  },
  bannerImage: {
    width: '100%',
    height: 150,
  },
  pageTitleDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  pageTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  pageTxt: {
    fontSize: 14,
    textAlign: 'justify',

  },
  pageSubTitle: {
    fontWeight: '500',
    fontSize: 14,
    marginBottom: 10,
  },
  tableRow: {
    borderRadius: 10,
    padding: 10,
  },
  tableFlex: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginBottom: 5,
    borderRadius: 10,
    padding: 10,
  },
  tableFlexChild: {
    width: '48%',
  },
  tableTxt: {
    fontSize: 12,
    color: '#AE1614',
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
});

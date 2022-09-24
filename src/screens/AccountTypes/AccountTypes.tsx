/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, ScrollView, Text, View, TouchableOpacity} from 'react-native';
import styles from './AccountTypesStyle';
import {lightColors, darkColors} from '../../colormode/ColorMode';
import {connect} from 'react-redux';
import {setLight, setDark} from '../../store/Actions/themeActionCreator';
import {useTranslation} from 'react-i18next';
// @ts-ignore
import {Table, Row, Rows} from 'react-native-table-component';

const AccountTypes = ({navigation, theme}: any) => {

  const {t} = useTranslation();

  const realAccountsHeadTable = ['Acc', 'Min Deposit', 'Leverage', '1 Lot =', 'Comission'];
  const realAccountsDataTable = [
    ['Mini', '500$', '1:200', '100,000', '0$'],
    ['Standard', '2,000$', '1:200', '100,000', '0$'],
    ['VIP', '10,000$', '1:200', '100,000', '0$'],
    ['ECN', '15,000$', '1:200', '100,000', '10$ / LOT'],
  ];

  const singleStocksHeadTable = ['Acc', 'Min Deposit', '1 Lot =', 'Comission'];
  const singleStocksDataTable = [
    ['Standard', '2,000$', '100,000', '0.0199$'],
    ['VIP', '10,000$', '100,000', '0.0199$'],
    ['Platinum', '100,000$', '100,000', '0.0199$'],
  ];

  return (
    <SafeAreaView style={[styles.contentPage, {backgroundColor: theme === true ? lightColors.bgColor : darkColors.bgColor}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={[styles.pageSubTitle, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>FX/CFD REAL ACCOUNTS</Text>
          <Table>
            <Row data={realAccountsHeadTable} style={[styles.tableRow, {backgroundColor: theme === true ? lightColors.bgInput : darkColors.bgInput}]} textStyle={[styles.tableTxt, {fontWeight: '500'}]}/>
            <Rows data={realAccountsDataTable} style={[styles.tableRow, {marginTop: 5, backgroundColor: theme === true ? lightColors.bgInput : darkColors.bgInput}]} textStyle={styles.tableTxt}/>
          </Table>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={[styles.pageSubTitle, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>SINGLE STOCKS REAL ACCOUNTS</Text>
          <Table>
            <Row data={singleStocksHeadTable} style={[styles.tableRow, {backgroundColor: theme === true ? lightColors.bgInput : darkColors.bgInput}]} textStyle={[styles.tableTxt, {fontWeight: '500'}]}/>
            <Rows data={singleStocksDataTable} style={[styles.tableRow, {marginTop: 5, backgroundColor: theme === true ? lightColors.bgInput : darkColors.bgInput}]} textStyle={styles.tableTxt}/>
          </Table>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={[styles.pageSubTitle, {color: theme === true ? lightColors.txtColor : darkColors.txtColor}]}>CRYPTOCURRENCY</Text>
          <View style={[styles.tableFlex, {backgroundColor: theme === true ? lightColors.bgInput : darkColors.bgInput}]}>
            <Text style={[styles.tableTxt, {fontWeight: '500'}]}>Overnight Rollover</Text>
            <Text style={[styles.tableTxt, {fontWeight: '500'}]}>1% Values of Currency</Text>
          </View>
          <View style={[styles.tableFlex, {backgroundColor: theme === true ? lightColors.bgInput : darkColors.bgInput}]}>
            <Text style={[styles.tableTxt, {fontWeight: '500'}]}>Total Daily Volume Limit</Text>
            <Text style={[styles.tableTxt, {fontWeight: '500'}]}>10 Contracts</Text>
          </View>
          <View style={[styles.tableFlex, {backgroundColor: theme === true ? lightColors.bgInput : darkColors.bgInput}]}>
            <Text style={[styles.tableTxt, {fontWeight: '500'}]}>Min/Max Trade Size</Text>
            <Text style={[styles.tableTxt, {fontWeight: '500'}]}>0.01/10</Text>
          </View>
          <View style={[styles.tableFlex, {backgroundColor: theme === true ? lightColors.bgInput : darkColors.bgInput}]}>
            <Text style={[styles.tableTxt, {fontWeight: '500'}]}>Leverage</Text>
            <Text style={[styles.tableTxt, {fontWeight: '500'}]}>5:1</Text>
          </View>
          <View style={[styles.tableFlex, {marginBottom: 0, backgroundColor: theme === true ? lightColors.bgInput : darkColors.bgInput}]}>
            <Text style={[styles.tableTxt, {fontWeight: '500'}]}>Limit and Stop Levels</Text>
            <Text style={[styles.tableTxt, {fontWeight: '500'}]}>0.01</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.actionBtn}>
          <Text style={styles.actionTxtBtn}>{t('openAccountButton')}{' '}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );

};

const mapStateToProps = (state: any) => {
  return {
    theme: state.ThemeReducer.theme,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  setLight: () => dispatch(setLight()),
  setDark: () => dispatch(setDark()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountTypes);

import {Text, View, TouchableOpacity, StyleSheet,Image,} from 'react-native';
import React, { useEffect, useState } from 'react';
import HomeScreen from '../screens/HomeScreen';
import Introduction2 from '../screens/Introduction2';
import { useRoute } from '@react-navigation/native';
const Introduction = ({navigation}) => {
  const route = useRoute();
  const { status  } = route.params;
  
  return (
    <View style={styles.container}>
       
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Image style={styles.logo1} source={require('map/asset/intro1.jpg')} />
      <Text style={styles.text}>即食行樂是一個以輔仁大學食享冰箱發想的平台</Text>
      <Text style={styles.text}>用戶可使用手機查看可領取物資以及捐贈待用餐</Text>
      <Text></Text>
      <Text></Text>
      <TouchableOpacity onPress={() => navigation.navigate('Introduction2', {  status: status })}>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text style={styles.link}>下一頁</Text>
      </TouchableOpacity>
      
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FDFBF1',
  },
  headerText: {
    fontSize: 40,
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 30,
  },
  text: {
    fontSize: 17,
  },
  detail: {
    fontSize: 20,
    left: 20,
  },
  link: {
    color: '#DA7746',
    fontSize: 25,
  },

  buttonContainer: {
    backgroundColor: '#FCF3EC', // 自定义背景颜色
    padding: 60,
    borderRadius: 35, // 圆角效果
    marginVertical: 70, // 设置垂直间距
    width: '80%',
    elevation: 20,
  },
  buttonText: {
    color: 'gray', // 文本颜色
    fontWeight: 'bold',
    textAlign: 'center', // 文本居中
    fontSize: 30,
  },
  logo1: {
    width: 350,
    height: 200,
  },
});

export default Introduction;

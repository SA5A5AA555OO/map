import React, { useState } from 'react';
import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet,Image} from 'react-native';
import Take3 from '../screens/Donate3';


const Take2 = ({navigation}) =>{
   
    const handleButtonPress = () => {
      navigation.navigate('Take3');
    };
    return(
        <View style={styles.container}>
             <Text style={styles.headerText}>素食的店</Text>
            <Text ></Text>
            <Image
              style={styles.logo1}
               source={require('map/asset/step2.jpg')}/>
               <Text></Text>
               <Text ></Text>
               <Text ></Text>
        <View style={styles.wrapper}>
            <TextInput
            style={styles.input} 
           
            placeholder ="姓名"
            
            />
            <TextInput
            style={styles.input} 
            
            placeholder ="電話"
            
            />
            <TextInput
            style={styles.input} 
            
            placeholder ="信箱"
            
            />
            <Text ></Text>
            <Text ></Text>
        
        <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
                  <Text style={styles.buttonText}>取得領取編號</Text>
                </TouchableOpacity>
            <View style={{flexDirection:'row', marginTop:20}}></View>

            
         
              
            
        </View>
    </View>
    );
};
const styles =StyleSheet.create({
  container:{
  flex:1,
  alignItems:'center',
  backgroundColor:'#FDFBF1',
  },
  wrapper:{
      width:'80%',
      
  },
  leftText :{
    fontSize: 30,
    left:20,
    position: 'absolute',
    top: 0,
},
headerText: {
    fontSize: 40,
  },
detail:{
    fontSize: 20,
    left:20,
    
    
},
  button: {
    backgroundColor: '#E6A984', // 自定义按钮颜色
    paddingVertical: 20,        // 垂直方向的內邊距
    paddingHorizontal: 40,      // 水平方向的內邊距
    borderRadius: 30,
    },
    buttonText: {
      color: 'white', // 按钮文本颜色
      fontWeight: 'bold',
      textAlign: 'center',},

  input:{
      marginBottom:12,
      borderWidth:1,
      borderColor:'#bbb',
      borderRadius:5,
      paddingHorizontal:14,
      backgroundColor: 'white',
  },
  logo1:{
    width: 350,
    height: 60,
  },
  link:{
      color:'#DA7746',
  }
  
});

export default Take2;
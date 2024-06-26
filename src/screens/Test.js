import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet,Image} from 'react-native';
import HomeScreen from './HomeScreen';
import React, { useState,useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs, where,query, updateDoc } from 'firebase/firestore/lite';
import { useRoute } from '@react-navigation/native';
const firebaseConfig = {
  apiKey: "AIzaSyBARwrOhviGWEHN94EDPR0Ojy-YftRlljA",
authDomain: "sa5a5aa555oo.firebaseapp.com",
databaseURL: "https://sa5a5aa555oo-default-rtdb.asia-southeast1.firebasedatabase.app",
projectId: "sa5a5aa555oo",
storageBucket: "sa5a5aa555oo.appspot.com",
messagingSenderId: "602378113582",
appId: "1:602378113582:web:c6b308cc039586506ec5bf",
measurementId: "G-NS22NW5C8F"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const Test = ({ navigation }) => {
  const [store_name, setstore_name] = useState('');
  const [provide, setprovide] = useState('');
  const [store_address, setstore_address] = useState('');
  const [store_phone, setstore_phone] = useState('');
  const [closetime, setclosetime] = useState('');
  const [opentime, setopentime] = useState('');
  const route = useRoute();
  const { username,status } = route.params || { username: '用戶' };
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    fetchUserData();
}, []);
  const fetchUserData = async () => {
    try {
      const userQuery = query(collection(db, 'store'), where('store_name', '==', username));
      const querySnapshot = await getDocs(userQuery);
      if (!querySnapshot.empty) {
        const docRef = doc(db, 'user', querySnapshot.docs[0].id);
        const userData = querySnapshot.docs[0].data();
        setstore_name(userData.store_name); 
        setprovide(userData.provide); 
        setstore_address(userData.store_address); 
        setstore_phone(userData.store_phone); 
        setclosetime(userData.closetime); 
        setopentime(userData.opentime);
      } else {
        console.log('找不到符合條件的使用者');
      }
    } catch (error) {
      console.error('獲取使用者資料時發生錯誤：', error);
    }
  };
  const handleButtonPress = async () => {
    try {
      const userQuery = query(collection(db, 'store'), where('store_name', '==', username));
      const querySnapshot = await getDocs(userQuery);
      if (!querySnapshot.empty) {
        const docRef = doc(db, 'store', querySnapshot.docs[0].id);
        await updateDoc(docRef, {
          store_name: store_name,
          provide: provide,
          store_address: store_address,
          store_phone: store_phone,
          closetime: closetime,
          opentime: opentime,
        });
        console.log('Document updated successfully!');
        navigation.navigate('Home',{status:status});
      } else {
        console.log('找不到符合條件的使用者');
      }
    } catch (error) {
      console.error('更新文檔時發生錯誤：', error);
    }
  };
  const incrementProvide = () => {
    setprovide(prevValue => Number(parseInt(prevValue, 10) + 1));
  };
  
  const decrementProvide = () => {
    if (parseInt(provide, 10) > 0) {
      setprovide(prevValue => Number(parseInt(prevValue, 10) - 1));
    }
  };
  

  
  return(
      <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text>提供數量</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' ,}}>
          <TextInput
            style={[styles.input,{ width: 170 }]}
            value={provide.toString()}
            placeholder="提供數量"
            onChangeText={text => setprovide(text)}
          />
          <Text>      </Text>
          <TouchableOpacity onPress={decrementProvide} style={styles.button1}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text>       </Text>  
          <TouchableOpacity onPress={incrementProvide} style={styles.button1}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text></Text>
        <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
          <Text style={styles.buttonText}>上傳</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles =StyleSheet.create({
container:{
flex:1,
alignItems:'center',
backgroundColor:'#FDFBF1',
justifyContent:'center',},
wrapper:{
    width:'80%',
    
},
button: {
    backgroundColor: '#E6A984', // 自定义按钮颜色
    padding: 20,
    borderRadius: 100,
  },
  button1: {
    backgroundColor: '#E6A984', // 自定义按钮颜色
    padding: 20,
    borderRadius: 100,
    height:60
  },
  buttonText: {
    color: 'white', // 按钮文本颜色
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize:20,
  },

input:{
    marginBottom:20,
    borderWidth:1,
    borderColor:'#bbb',
    borderRadius:20,
    paddingHorizontal:14,
    backgroundColor: 'white',
    height:60,
},
link:{
    color:'#DA7746',
}

});
export default Test;
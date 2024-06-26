import { Text, TextInput, View, Button, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import HomeScreen from './HomeScreen';
import React, { useState, useEffect } from "react";
import { DataTable } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, query, where, getDocs, updateDoc } from 'firebase/firestore/lite';
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


const TakePeople = ({ navigation }) => {
  const route = useRoute();
  const { username } = route.params || { username: '用戶' };
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const pickupsCollection = collection(db, 'user');
      const q = query(pickupsCollection, where('status', '==', "1"));
      const querySnapshot = await getDocs(q);

      const data = [];
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });

      setUserData(data);
    } catch (error) {
      console.error('查詢資料時發生錯誤：', error);
    }
  };

  // const handlePickup = async (randomNumber) => {
  //   try {
  //     const pickupsCollection = collection(db, 'pickup');
  //     const q = query(pickupsCollection, where('randomNumber', '==', randomNumber));
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach(async (snapshot) => {
  //       const docRef = doc(db, 'pickup', snapshot.id);
  //       await updateDoc(docRef, { take: true });
  //       console.log('Updated taken to true');
  //       fetchUserData(); 
  //     });
  //   } catch (error) {
  //     console.error('Error updating document:', error);
  //   }
  // };







  return (
    <View style={styles.container}><ScrollView>
      <Text style={styles.headerText}>查看使用者</Text>
      <Text></Text>

      {userData.map((item, index) => (
        <View key={index}>
          
            <View style={styles.row}>
              <Image
                style={styles.logo}
                source={require("map/asset/food.jpg")}
              />
              <View>
                <Text style={styles.leftText}>姓名:{item.username}</Text>
                <Text style={styles.detail}>帳號:{item.email}</Text>
                <Text style={styles.detail}>電話:{item.phone}</Text>
                {/* <TouchableOpacity
                  style={styles.button}
                  onPress={() => handlePickup(item.randomNumber)}>
                  <Text style={styles.buttonText}>審核通過</Text>
                </TouchableOpacity> */}
              </View>
            </View>
            <Text></Text>
            <View style={styles.line} />
            <Text></Text>
          
        </View>
      ))}
    </ScrollView></View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFBF1',
    paddingTop: 20,

  },
  textContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',


  },
  headerText: {
    alignItems: 'center',
    fontSize: 40,
    textAlign: 'center',
  },

  logo: {
    width: 63,
    height: 63,
    borderRadius: 100,

  },
  row: {

    flexDirection: 'row',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    borderBottomStyle: 'solid',
    width: 350,
    alignSelf: 'center',
  },
  leftText: {
    fontSize: 25,
    paddingLeft: 15,
  },

  detail: {
    fontSize: 20,
    paddingLeft: 15,
  },
  text: {
    fontSize: 20,
  },
  selected: {
    backgroundColor: '#FBE8CD',
  },



  buttonContainer: {
    backgroundColor: '#E6A984',
    padding: 20,
    borderRadius: 30,
    marginVertical: 10,
    width: '18%',
    marginLeft: 'auto',
    marginRight: 10,
  },
  buttonText: {
    color: 'white', // 按钮文本颜色
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  button: {
    backgroundColor: '#E6A984', // 自定义按钮颜色
    padding: 17,
    borderRadius: 20,
  },
});

export default TakePeople;
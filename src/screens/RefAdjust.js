import { Text, TextInput, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getFirestore, doc, getDoc, updateDoc, writeBatch,deleteField } from 'firebase/firestore/lite';
import { initializeApp } from 'firebase/app';
import { Alert } from 'react-native';
import React, { useState, useEffect } from 'react';

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

const RefAdjust = ({ navigation }) => {
  const route = useRoute();
  const { status } = route.params || { status: 0 };
  const [fields, setFields] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [buttonText, setButtonText] = useState('結束領取');
  const [time, setTime] = useState('');

  const handleButtonPress = async () => {
    const updates = {};
    fields.forEach(({ field, value }) => {
      updates[field] = value;
    });
    
    const storeDocRef1 = doc(db, 'fridges', '9fPJgKl8FvEzphsriDvn');
    const storeDocRef2 = doc(db, 'fridges', 'jtJgYOmcTgBJAfbhR5WD');
  
    try {
      await updateDoc(storeDocRef1, updates);
  
      const now = new Date();
      const formattedTime = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      await updateDoc(storeDocRef2, { adjustTime: formattedTime });
  
      showAlert();
      navigation.navigate('Home', { status });
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const handleOpenClosePress = async () => {
    const storeDocRef = doc(db, 'fridges', 'jtJgYOmcTgBJAfbhR5WD');
    try {
      const newOpenStatus = !isOpen;
      await updateDoc(storeDocRef, { open: newOpenStatus });
      setIsOpen(newOpenStatus);
      setButtonText(newOpenStatus ? '結束領取' : '開放領取');
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const handleAddField = () => {
    setFields([...fields, { field: '', value: '' }]);
  };

  const handleRemoveField = async (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    const fieldToRemove = fields[index].field;
    setFields(newFields);
    
    const storeDocRef = doc(db, 'fridges', '9fPJgKl8FvEzphsriDvn');
    const batch = writeBatch(db);
    try {
      const docSnap = await getDoc(storeDocRef);
      if (docSnap.exists()) {
        const docData = docSnap.data();
        if (docData.hasOwnProperty(fieldToRemove)) {
          batch.update(storeDocRef, { [fieldToRemove]: deleteField() });
          await batch.commit();
        }
      }
    } catch (error) {
      console.error('Error removing field from document: ', error);
    }
  };

  const showAlert = () => {
    Alert.alert('修改成功');
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const fridge1DocRef = doc(db, 'fridges', '9fPJgKl8FvEzphsriDvn');
      const fridge2DocRef = doc(db, 'fridges', 'jtJgYOmcTgBJAfbhR5WD');

      const [fridge1DocSnap, fridge2DocSnap] = await Promise.all([getDoc(fridge1DocRef), getDoc(fridge2DocRef)]);

      if (fridge1DocSnap.exists() && fridge2DocSnap.exists()) {
        const fridge1Data = fridge1DocSnap.data();
        const fridge2Data = fridge2DocSnap.data();

        const initialFields = Object.keys(fridge1Data).map(key => ({
          field: key,
          value: fridge1Data[key]
        }));

        setFields(initialFields);
        setIsOpen(fridge2Data.open);
        setTime(fridge2Data.start_time);
        setButtonText(fridge2Data.open ? '結束領取' : '開放領取');
      } else {
        console.log('找不到符合條件的使用者');
      }
    } catch (error) {
      console.error('獲取使用者資料時發生錯誤：', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleOpenClosePress} style={styles.button1}>
        <Text style={styles.buttonText1}>{buttonText}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.wrapper}>
          <ScrollView>
          <Text>開放領取時間</Text>
            <TextInput
              style={styles.input}
              value={time}
              placeholder="開放領取時間"
              onChangeText={text => setTime(text)}
            />
            <Text></Text>
            {fields.map((field, index) => (
              <View key={index} style={styles.row}>
                <TextInput
                  style={[styles.input, styles.fieldInput]}
                  value={field.field}
                  placeholder="物資名稱"
                  onChangeText={text => {
                    const newFields = [...fields];
                    newFields[index].field = text;
                    setFields(newFields);
                  }}
                />
                <TextInput
                  style={[styles.input, styles.valueInput]}
                  value={field.value}
                  placeholder="數量"
                  onChangeText={text => {
                    const newFields = [...fields];
                    newFields[index].value = text;
                    setFields(newFields);
                  }}
                />
                <TouchableOpacity onPress={() => handleRemoveField(index)} style={styles.removeButton}>
                  <Text style={styles.removeButtonText}>-</Text>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity onPress={handleAddField} style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
              <Text style={styles.buttonText}>修改</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FDFBF1',
    justifyContent: 'center',
  },
  wrapper: {
    width: '80%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 20,
    paddingHorizontal: 14,
    backgroundColor: 'white',
    height: 55,
  },
  fieldInput: {
    flex: 1,
    marginRight: 10,
  },
  valueInput: {
    flex: 1,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#E6A984',
    padding: 15,
    borderRadius: 20,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  button1: {
    backgroundColor: '#E6A984',
    padding: 13,
    borderRadius: 15,
    marginVertical: 10,
    width: '40%',
    bottom: 5,
  },
  buttonText1: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  addButton: {
    backgroundColor: '#5599FF',
    padding: 10, // 调整这个值来控制按钮的大小
    borderRadius: 20, // 使按钮的半径足够大以形成圆形
    width: 40, // 设置宽度
    height: 40, // 设置高度与宽度相等
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5, // 确保按钮之间有间距
    left: 133,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 21, // 确保文本垂直居中
  },
  removeButton: {
    backgroundColor: '#FF2D2D',
    padding: 10, // 调整这个值来控制按钮的大小
    borderRadius: 20, // 使按钮的半径足够大以形成圆形
    width: 40, // 设置宽度
    height: 40, // 设置高度与宽度相等
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 21, // 确保文本垂直居中
  },
});

export default RefAdjust;

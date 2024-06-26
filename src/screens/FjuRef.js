import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet,Image} from 'react-native';
import Donate2 from '../screens/Donate2';
import RefTodayFood from '../screens/RefTodayFood';
import { Icon } from '@rneui/themed';




const FjuRef = ({navigation}) =>{
    const handleButtonPress = () => {
        navigation.navigate('RefTodayFood');
      };
      return (
        <View style={styles.container}>
          <Image
              style={styles.pic}
               source={require('map/asset/背景.jpg')}/> 
               <Text style={styles.imageText}>輔仁大學食享冰箱</Text>
               <View style={{ alignSelf: 'flex-start' }}>
            
            </View>
            
            <View style={{ alignSelf: 'flex-start' }}>
               <Text style={styles.detail}>今日開放領取時間:   1:30</Text>
               <Text style={styles.detail}>地址:新北市新莊區中正路510號</Text>
               <Text style={styles.detail}>電話:02-2905-2000</Text>
               <Text style={styles.red}>僅供輔大師生教職員領取</Text>
               <Text></Text>
               <Text></Text>
               <Text></Text>
               <Text></Text>
               <Text></Text>
               <Text></Text>
               <Text></Text>
               <Text></Text>
               <Text></Text>
               </View>
               
               <TouchableOpacity onPress={handleButtonPress}style={styles.buttonContainer}>
                 <Text style={styles.buttonText}>查看今日物資</Text>
               </TouchableOpacity>
                 
                
            
        </View>
     
      );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor:'#FDFBF1',
      
    },
    imageText: {
      position: 'absolute',
      top: 130, 
      left: 20, 
      fontSize: 35,
      color: 'white',
    },
    headerText: {
        fontSize: 35,
        paddingLeft:20,
        fontWeight: 'bold',
      },
    logo: {
        width: 350,
        height: 200,
        borderRadius: 30,
      },
      pic: {
        width: 400,
        height: 250,
        borderRadius: 50,
        top: -50
      },
      
    leftText :{
        fontSize: 30,
        left:20,
    },
    red:{
      fontSize: 20,
      left:20,
      padding:5,
      color:'red',
      top:-50
    },
    detail:{
        fontSize: 20,
        left:20,
        padding:5,
        top:-50
    },
    line: {
        borderBottomWidth: 1, // 线的宽度
        borderBottomColor: 'black', // 线的颜色
        borderBottomStyle: 'solid', // 线的样式，可以是 'solid'、'dotted' 或 'dashed'
        // 可选：设置线的长度和位置
        width: 350,
       alignSelf: 'center',
      },


    buttonContainer: {
      backgroundColor: '#E6A984', // 自定义背景颜色
      padding: 20,
      borderRadius: 25, // 圆角效果
      marginVertical: 10, // 设置垂直间距
      width:'65%'
    },
    buttonText: {
      color: 'white', // 文本颜色
      fontWeight: 'bold',
      textAlign: 'center', // 文本居中
      
    },
  });
  
export default FjuRef;
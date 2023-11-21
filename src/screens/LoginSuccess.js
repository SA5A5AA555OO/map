import {Text, TextInput, View,Button, TouchableOpacity, StyleSheet,Image} from 'react-native';
import Navigation from '../Components/Navigation';
import HomeScreen from '../screens/HomeScreen';




const Take3 = ({navigation}) =>{
   
      return (
        <View style={styles.container}>
            
            
            <TouchableOpacity  style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>登入成功</Text>
                </TouchableOpacity>
           <TouchableOpacity onPress={() =>navigation.navigate('Home')}>
                        <Text style={styles.link}>繼續</Text>
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
    headerText: {
        fontSize: 40,
      },
    logo: {
        width: 200,
        height: 200,
        borderRadius: 30,
      },
    leftText :{
        fontSize: 30,
        left:20,
    },
    detail:{
        fontSize: 20,
        left:20
    },
    link:{
        color:'#DA7746',
        fontSize:25
    },

    

    
    buttonContainer: {
      backgroundColor: '#FCF3EC', // 自定义背景颜色
      padding: 100,
      borderRadius: 35, // 圆角效果
      marginVertical: 100, // 设置垂直间距
      width:'70%',
      elevation: 20,
     
    },
    buttonText: {
      color: 'gray', // 文本颜色
      fontWeight: 'bold',
      textAlign: 'center', // 文本居中
      fontSize:30
      
    },
    logo1: {
      width: 350,
      height: 60,
    },
  });
  
export default Take3;
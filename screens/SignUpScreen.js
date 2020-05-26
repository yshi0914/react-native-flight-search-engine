import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("user.db");

const SignUpScreen = ({navigation}) => {
    const[data, setData] = React.useState({
        username: '',
        password: '',
        cPassword: '',
        check_textInputChange: false,
        secureTextEntry: true
    });

    const textInputChange = (val) => {
        if (val.length != 0){
            setData({
                ... data,
                username: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ... data,
                username: val,
                check_textInputChange: false
            });
        }
    }
    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }
    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            cPassword: val
        });        
    }    
    const signUpHandle = (userName, password) => {
        if (data.cPassword !== data.password){
            alert("The password entered should be same.");
        } else {
            //alert(userName + " " + password);
            db.transaction(
            tx => {
                tx.executeSql("insert into user (username, pwd) values (?, ?)", [userName, password]);
                tx.executeSql("select * from user", [], (_, { rows }) =>{
                    //console.log(JSON.stringify(rows));
                    alert("Congratulations! You have signed up!");}
                );
            },
            null,
            null
            );
            navigation.goBack();
        }
        //signIn(userName, password);
    }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.text_header}>Register now!</Text>
        </View>
        <View style={styles.footer}>
            <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput
                    placeholder="Your Email"
                    style={styles.textInput}
                    autoCapitalize="none"
                    returnKeyType="next"
                    onChangeText={(val) => textInputChange(val)}
                    keyboardType="email-address"
                    autoCorrect={false}
                />
                {data.check_textInputChange ?
                    <Feather
                        name="check-circle"
                        color="green"
                        size={2}
                    />
                    :
                    null}
            </View>
            <Text style={[styles.text_footer, {marginTop: 35}]}>Password</Text>            
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput
                    placeholder="Your Password"
                    secureTextEntry={true}
                    style={styles.textInput}
                    autoCapitalize="none"
                    returnKeyType="next"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <Feather
                    name="eye-off"
                    color="grey"
                    size={2}
                />
            </View>
            <Text style={[styles.text_footer, {marginTop: 35}]}>Confirm Password</Text>            
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput
                    placeholder="Confirm Your Password"
                    secureTextEntry={true}
                    style={styles.textInput}
                    autoCapitalize="none"
                    returnKeyType="go"
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                />
                <Feather
                    name="eye-off"
                    color="grey"
                    size={2}
                />
            </View>            
            <View style={styles.button}>
                <TouchableOpacity 
                style={styles.signIn}
                onPress={() => {signUpHandle(data.username, data.password)}}
                >
                    <Text style={[styles.textSign,{color:'#fff'}]}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    style={[styles.signUp,{
                        borderColor: '#009388',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {color: '#009388'}]}> Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 6,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#009387'
    },
    signUp: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#fff'
    },    
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });
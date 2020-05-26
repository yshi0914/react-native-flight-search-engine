import React from 'react';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("user.db");

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

import {AuthContext} from '../components/context';

const SignInScreen = ({navigation}) => {
    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true
    });

    const {signIn} = React.useContext(AuthContext);

/**
            tx.executeSql(
                "insert into user (username, pwd) values (?,?)", ['test','abcd']
            );
            tx.executeSql("delete from user where id > 1", [], (_,{rows}) => 
                alert(JSON.stringify(rows)));            
 */
    // By default, it runs both after the first render and after every update
    React.useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                "create table if not exists user (id integer primary key not null, username text, pwd text);"
            );
        });
    }, []);

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
    const loginHandle = (userName, password) => {
        signIn(userName, password);
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.text_header}>Welcome</Text>
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
                    onChangeText={(val) => handlePasswordChange(val)}
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
                    onPress={() => {loginHandle(data.username, data.password)}}
                >
                    <Text style={[styles.textSign,{color:'#fff'}]}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => navigation.navigate('SignUpScreen')}
                    style={[styles.signUp,{
                        borderColor: '#009388',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {color: '#009388'}]}> Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    );
};

export default SignInScreen;

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
        flex: 3,
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
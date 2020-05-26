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

const SignUpScreen = ({navigation}) => {
    const[data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true
    });

    const textInputChange = (val) => {
        if (val.length != 0){
            setData({
                ... data,
                email: val,
                check_textInputChange: true
            });
        }else{
            setData({
                ... data,
                email: val,
                check_textInputChange: false
            });
        }
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
                    onSubmitEditing={() => this.password.focus()}
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
                    ref={(input)=> this.password = input}
                    returnKeyType="next"
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
                />
                <Feather
                    name="eye-off"
                    color="grey"
                    size={2}
                />
            </View>            
            <View style={styles.button}>
                <TouchableOpacity style={styles.signIn}>
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
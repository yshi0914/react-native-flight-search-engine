import React, {useState} from 'react';
import { View, Text, Button, StyleSheet , TextInput, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {AuthContext} from '../components/context';

const HomeScreen = ({navigation}) => {
    const [data, setData] = React.useState({
            from:'',
            to:'',
            returnTrip: true,
            departureDate: '25-05-2020',
            returnDate: '26-05-2020',
            noOfPass:1,
            tripType: 'returnTrip',
            price:{
                min: 50,
                max: 10000
            },
            key:'returnTrip',
            hitSubmit:false
    });
    const {updateFlightInfo} = React.useContext(AuthContext);
    const fromTextInputChange = (val) => {
        if (val.length != 0){
            setData({
                ... data,
                from: val,
            });
        }
    }
    const toTextInputChange = (val) => {
        if (val.length != 0){
            setData({
                ... data,
                to: val,
            });
        }
    };
    const noOfPTextInputChange = (val) => {
        if (val.length != 0){
            setData({
                ... data,
                noOfPass: val,
            });
        }
    }; 
    const onDeptChange = (selectedDate) => {
          setData({
              ... data,
              departureDate: selectedDate,
          });
    };
    const onReturnChange = (selectedDate) => {
          setData({
              ... data,
              returnDate: selectedDate,
          });
    };
    
    const onSwitchOneWay = () =>{
          setData({
              ...data,
              returnTrip: false
          });
    };
    const onSwitchReturnWay = () =>{
          setData({
              ...data,
              returnTrip: true
          });
    };

    const searchHandle = (from, to, returnTrip, departureDate, returnDate, numOfPass) => {
        updateFlightInfo(from, to, returnTrip, departureDate, returnDate, numOfPass);
        navigation.navigate("Notifications");
    }    
    return (
      <View style={styles.container}>
        <View style={styles.footer}>
            <Text style={styles.text_footer}>Enter Origin City</Text>
            <View style={styles.action}>
                <TextInput
                    placeholder="Origin City"
                    style={styles.textInput}
                    autoCapitalize="none"
                    returnKeyType="next"
                    onChangeText={(val) => fromTextInputChange(val)}
                    autoCorrect={false}
                />
            </View>
            <Text style={[styles.text_footer, {marginTop: 3}]}>Enter Destination City</Text>            
            <View style={styles.action}>
                <TextInput
                    placeholder="Destination City"
                    style={styles.textInput}
                    autoCapitalize="none"
                    returnKeyType="next"                    
                    onChangeText={(val) => toTextInputChange(val)}
                    autoCorrect={false}
                />
            </View>
            <Text style={[styles.text_footer, {marginTop: 3}]}>Number of passengers</Text>            
            <View style={styles.action}>
                <TextInput
                    placeholder="Number of passengers"
                    style={styles.textInput}
                    autoCapitalize="none"
                    keyboardType="number-pad"
                    returnKeyType="next"                    
                    onChangeText={(val) => noOfPTextInputChange(val)}
                    autoCorrect={false}
                />
            </View>
            <Text style={[styles.text_footer, {marginTop: 3}]}>Departure Date</Text>            
            <View style={styles.action}>
                <DatePicker
                  style={{width: 200}}
                  date={data.departureDate} //initial date from state
                  mode="date" //The enum of date, datetime and time
                  placeholder="select date"
                  format="DD-MM-YYYY"
                  minDate="01-01-2016"
                  maxDate="01-01-2021"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      marginLeft: 36
                    }
                  }}
                  onDateChange={(date) => {onDeptChange(date)}}
                />
            </View>
               
            {data.returnTrip ?
            <View>
            <Text style={[styles.text_footer, {marginTop: 3}]}>Return Date</Text>
              <View style={styles.action}>
                  <DatePicker
                    style={{width: 200}}
                    date={data.returnDate} //initial date from state
                    mode="date" //The enum of date, datetime and time
                    placeholder="select date"
                    format="DD-MM-YYYY"
                    minDate="01-01-2016"
                    maxDate="01-01-2021"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {
                        marginLeft: 36
                      }
                    }}
                    onDateChange={(date) => {onReturnChange(date)}}
                  />
              </View>  
              </View>             
            :
              null
            }

            <View style={styles.button}>
              {data.returnTrip ? 
                <TouchableOpacity 
                    onPress={() => onSwitchOneWay()}
                    style={[styles.signUp,{
                        borderColor: '#009388',
                        borderWidth: 1
                    }]}
                >
                    <Text style={[styles.textSign, {color: '#009388', fontSize: 15}]}> Switch to One-Way Trip</Text>
                </TouchableOpacity>                
              :
                <TouchableOpacity 
                    onPress={() => onSwitchReturnWay()}
                    style={[styles.signUp,{
                        borderColor: '#009388',
                        borderWidth: 1
                    }]}
                >
                    <Text style={[styles.textSign, {color: '#009388', fontSize: 15}]}> Switch to Return Trip </Text>
                </TouchableOpacity>            
              }

                <TouchableOpacity 
                    style={styles.signIn}
                    onPress={() => {searchHandle(data.from, data.to, data.returnTrip, data.departureDate, data.returnDate, data.noOfPass)}}
                >
                    <Text style={[styles.textSign,{color:'#fff'}]}> Search </Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    );
};


export default HomeScreen;



const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'rgba(3, 227, 252,0.5)'
    },
    userInput: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 50,
        paddingBottom: 10
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 80,
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
        marginTop: 5,
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
        paddingLeft: 10,
        color: '#05375a',
        backgroundColor: '#fff'
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 6
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#009387',
        marginTop: 10
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
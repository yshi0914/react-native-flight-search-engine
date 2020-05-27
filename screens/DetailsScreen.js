import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
//import axios from 'axios';
import flightData from '../flight.json';
import {AuthContext} from '../components/context';

const DetailsScreen = ({route, navigation}) => {
    const {getFlightInfo} = React.useContext(AuthContext);

    // target flight data here
    const [data, setData] = React.useState(
        {
        flights: flightData,
        from:'',
        to:'',
        returnTrip: true,
        departureDate: '',
        returnDate: '',
        noOfPass:1
        }
    );    
    
    
    // perform some side effects
    /**
    React.useEffect(()=>{
      alert(JSON.stringify(data.flights));
    });
     */
    React.useEffect(()=>{
        // fetch target flight search info from App.js
        const temp = getFlightInfo();
        setData({
            ...data,
            from: temp.from,
            to: temp.to,
            returnTrip: temp.returnTrip,
            departureDate: temp.departureDate,
            returnDate: temp.returnDate,
            noOfPass: temp.noOfPass
        });     
    }
    ,[]);
    const flightResult = data.flights.map( (flight) => {
        // small bugs here with itemText undefined !
        //const { itemText } = route.params;
        //alert(itemText);

        let isSameOrigin = data.from.toLowerCase() === flight.origin.toLowerCase();
        let isSameDest = data.to.toLowerCase() === flight.destination.toLowerCase();
        if (isSameOrigin && isSameDest){
            return (
                            <View style={styles.targetField} key={flight.flightId}>
                                <View style={{flexDirection:'row'}}>
                                <Text style={styles.text_footer}>Flight No: {flight.flightId}</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                <Text style={styles.text_footer}>{flight.origCode} > {flight.destCode}</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                <Text style={styles.text_footer}>Depart: {flight.departure_time}</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                <Text style={styles.text_footer}>Arrive: {flight.arrival_time}</Text>
                                </View>                        
                                <View style={{flexDirection:'row'}}>
                                <Text style={[styles.text_footer, {marginTop: 3}]}>Flight provider: </Text>
                                <View style={styles.action}>
                                    <Text>Air NZ</Text>
                                </View>
                                </View>            
                                <Button
                                title="Book Flight"
                                onPress={() => alert('Button Clicked!')}
                                />
                            </View>
                )
        }
 
    });

    return (
      <View style={styles.container}>
        <ScrollView>
        <View style={styles.footer}>
            {
              flightResult
            }
        </View>  
        </ScrollView>                
      </View>
      
    );
};

export default DetailsScreen;


const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'rgba(3, 227, 252,0.5)'
    },
    targetField: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 50,
        backgroundColor: 'pink',
        borderRadius: 30,
        marginVertical: 10
    },
    footer: {
        flex: 1,
        borderRadius: 30,
        paddingHorizontal: 100,
        paddingVertical: 30,
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 16
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
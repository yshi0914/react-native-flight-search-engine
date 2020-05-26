import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
//import axios from 'axios';

const DetailsScreen = ({navigation}) => {
    const [data, setData] = React.useState({
            flights: [],
            fromFlight: null,
            toFlight:null,
            noOfPassenger: 0,
            hasReturn:false
    });


    return (
      <View style={styles.container}>
        <View style={styles.footer}>
         <View style={styles.targetField}>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.text_footer}>From:</Text>
              <View style={styles.action}>
                <Text> Auckland</Text>
              </View>
            </View>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.text_footer}>To:</Text>
              <View style={styles.action}>
                <Text> Sydney</Text>
              </View>
            </View>
            <View style={{flexDirection:'row'}}>
              <Text style={[styles.text_footer, {marginTop: 3}]}>Departure Date:</Text>            
              <View style={styles.action}>
                <Text>25-05-2020</Text>
              </View> 
            </View>
            <View style={{flexDirection:'row'}}>
              <Text style={[styles.text_footer, {marginTop: 3}]}>Return Date:</Text>            
              <View style={styles.action}>
                <Text>26-05-2020</Text>
              </View>
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

         <View style={styles.targetField}>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.text_footer}>From:</Text>
              <View style={styles.action}>
                <Text> Auckland</Text>
              </View>
            </View>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.text_footer}>To:</Text>
              <View style={styles.action}>
                <Text> Sydney</Text>
              </View>
            </View>
            <View style={{flexDirection:'row'}}>
              <Text style={[styles.text_footer, {marginTop: 3}]}>Departure Date:</Text>            
              <View style={styles.action}>
                <Text>25-05-2020</Text>
              </View> 
            </View>
            <View style={{flexDirection:'row'}}>
              <Text style={[styles.text_footer, {marginTop: 3}]}>Return Date:</Text>            
              <View style={styles.action}>
                <Text>26-05-2020</Text>
              </View>              
            </View> 
            <View style={{flexDirection:'row'}}>
              <Text style={[styles.text_footer, {marginTop: 3}]}>Flight provider: </Text>
              <View style={styles.action}>
                <Text>JetStar</Text>
              </View>
            </View>
            <Button
              title="Book Flight"
              onPress={() => alert('Button Clicked!')}
            />            
         </View>             
        </View>                  
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
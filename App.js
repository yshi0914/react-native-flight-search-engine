import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';


import * as React from 'react';
import {useEffect} from 'react';
import { Platform, StatusBar, StyleSheet, View, ActivityIndicator } from 'react-native';

import useCachedResources from './hooks/useCachedResources';

import MainTabScreen from './screens/MainTabScreen';
import { DrawerContent} from './screens/DrawerContent';


import {AuthContext} from './components/context';

import RootStackScreen from './screens/RootStackScreen';

// The following import is not suitable for Expo Managed App
//import AsyncStorage from '@react-native-community/async-storage';

//App is Expo Managed (created via expo-cli)
import { AsyncStorage } from 'react-native';

const Drawer = createDrawerNavigator();


export default function App(props) {
  // predefined
  const isLoadingComplete = useCachedResources();

  // check if user is authenticated or not
  //const [isLoading, setIsLoading] = React.useState(true);
  // used to validate user
  //const [userToken, setUserToken] = React.useState(null);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
    from:'',
    to:'',
    returnTrip: true,
    departureDate: '25-05-2020',
    returnDate: '26-05-2020',
    noOfPass:1
  }

  const loginReducer = (prevState, action) => {
    switch( action.type){
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false
        };
      case 'LOGIN':
        return {
          ...prevState,
          username: action.id,
          userToken: action.token,
          isLoading: false
        };
      case 'LOGOUT':
        return {
          ...prevState,
          username: null,
          userToken: null,
          isLoading: false
        };
      case 'REGISTER':
        return {
          ...prevState,
          username: action.id,
          userToken: action.token,
          isLoading: false
        };
      case 'UPDATE':
        return {
          ...prevState,
          from: action.from,
          to: action.to,
          returnTrip: action.returnTrip,
          departureDate: action.departureDate,
          returnDate: action.returnDate,
          noOfPass: action.noOfPass
        }
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(()=>({
    signIn: async(userName, password) => {
      //setUserToken('fgkj');
      //setIsLoading(false);
      let userToken;
      userToken = null;

      if (userName == 'admin' && password == 'pass'){
        try{
          userToken = 'dfsdsd';
          await AsyncStorage.setItem('userToken', userToken)
        }catch (e){
          console.log(e);
        }
      }
      dispatch({type: 'LOGIN', id: userName, token: userToken});
    },
    signOut: async() => {
      //setUserToken(null);
      //setIsLoading(false);
      try{
        await AsyncStorage.removeItem('userToken');
      }catch (e){
        console.log(e);
      }      
      dispatch({type: 'LOGOUT'});
    },
    signUp: () => {
      //setUserToken('fgkj');
      //setIsLoading(false);
      alert("You do not have admin right!");
    },
    updateFlightInfo: (from, to, returnTrip, departureDate, returnDate, numOfPass) => {
      //alert(from+" "+ returnDate + " " + numOfPass);
      dispatch({type: 'UPDATE', from: from, to: to, returnTrip: returnTrip, departureDate: departureDate, returnDate: returnDate, noOfPass:numOfPass});
  }
  }));

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    setTimeout(async() => {
      //setIsLoading(false);
      let userToken = null;
      try{
        userToken = await AsyncStorage.getItem('userToken');
      }catch (e){
        console.log(e);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
  },[]);

  if (loginState.isLoading){
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {loginState.userToken != null ? (
            <Drawer.Navigator drawerContent={props => <DrawerContent {... props}/>}>
              <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
            </Drawer.Navigator>
          )
          :
            <RootStackScreen />
          }
        </NavigationContainer>
      </AuthContext.Provider>
    );
  }
}



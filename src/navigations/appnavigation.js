import Reac,{useState,useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {enableScreens} from 'react-native-screens';

import Home from '../screens/Home';
import Login from '../screens/Login/Login'
import Welcome from '../screens/welcome'
import BottomTab from './bottomtab'
import Register from '../screens/Register'
import SuccessScreen from '../component/success'
import StartRegister from '../screens/Register/startregister'
import {InternetConnectivity} from '../redux/action/auth'
import {useSelector, useDispatch} from 'react-redux';
import NetInfo from "@react-native-community/netinfo";
const Stack = createStackNavigator();
enableScreens();

const StackNavigator = () => {
  const { loggedIn}=useSelector(state=>state.userData)
  const dispatch=useDispatch()
  useEffect(()=>{
    const unsubscribe = NetInfo.addEventListener(state => {
        dispatch(InternetConnectivity({isconnected:state.isConnected}))
    });
  },[])
  return (
    <>
      <Stack.Navigator screenOptions={{headerShown: false }}>
      {!loggedIn? (
              <>
                <Stack.Screen name="welcome" component={Welcome} />
                <Stack.Screen name="register" component={Register} />
                <Stack.Screen name="startregister" component={StartRegister} />
                <Stack.Screen name="login" component={Login} />
              </>
            ) : 
            
            <Stack.Screen name="Home" component={BottomTab} />            
            
          }
          <Stack.Screen name="done" component={SuccessScreen} />
        
      </Stack.Navigator>
    </>
  );

};

export default StackNavigator;

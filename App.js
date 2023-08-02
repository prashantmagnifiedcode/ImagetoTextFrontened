import React ,{useEffect, useState}from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigations/appnavigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store'


const App=()=>{
  
  return(
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
        </PersistGate>
        </Provider>
    </>
  )
}

export default App;

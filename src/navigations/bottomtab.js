import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import Editscn from '../screens/Edit'
import Icon from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import Scanner from '../screens/sanner'
const Tab = createBottomTabNavigator();

const BottomTab = () => {

    return (
        <Tab.Navigator screenOptions={{
            headerShown:false,
            tabBarStyle:{
                position:'absolute',
                marginBottom:'2%',
                marginTop:'2%',
                marginHorizontal:'2%',
                borderRadius:10,
                height:50,
                ...styles.shadow
            },
            tabBarShowLabel:false,

        }} >
            <Tab.Screen options={{
                tabBarIcon:({focused})=>(
                    <View style={{alignItems:'center'}} >
                         <Icon name={focused ? 'home' : 'home-outline'} size={20} color={focused ? '#526ee7' : 'grey'} />
                         <Text style={{color: focused ? '#526ee7':'grey',fontFamily:'Roboto-Bold', fontSize:10}} >Home</Text>       
                    </View>
                )
            }}  name="Home" component={Home} />
            {/* <Tab.Screen options={{
                tabBarIcon:({focused})=>(
                    <View style={{alignItems:'center'}}>
                        <Icon name={focused ? 'scan-circle':'scan-circle-outline'} size={20} color={focused ? '#526ee7' :'grey'} />
                        <Text style={{color:focused ? '#526ee7' : 'grey', fontSize:10, fontFamily:'Roboto-Bold'}} >Scanner</Text>
                    </View>
                )
            }} name="Scan" component={Scanner} /> */}

                 
<Tab.Screen
        name="Scanner"
        component={Scanner}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{alignItems:'center'}}>
            <Icon name={focused ? 'scan-circle':'scan-circle-outline'} size={20} color={focused ? '#526ee7' :'grey'} />
            <Text style={{color:focused ? '#526ee7' : 'grey', fontSize:10, fontFamily:'Roboto-Bold'}} >Scanner</Text>
        </View>
          ),
          tabBarButton: ({ children, onPress }) => (
            <TouchableOpacity
              style={{
                top: -30,
                justifyContent: "center",
                alignItems: "center",
                ...styles.shadow,
                backgroundColor: "white",
                borderRadius: 70,
                height:70,width:70,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={onPress}
            >
              <View
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                }}
              >
                {children}
              </View>
            </TouchableOpacity>
          ),
        }}
      />
            <Tab.Screen options={{
                tabBarIcon:({focused})=>(
                    <View style={{alignItems:'center'}}>
                        <Feather name={focused ? 'edit-3':'edit'} size={20} color={focused ? '#526ee7' :'grey'} />
                        <Text style={{color:focused ? '#526ee7' : 'grey', fontSize:10, fontFamily:'Roboto-Bold'}} >Edit List</Text>
                    </View>
                )
            }} name="Edit" component={Editscn} />
        </Tab.Navigator>
    )
}


const styles = StyleSheet.create({
    shadow:{
        elevation:5,
        shadowColor:'#000',
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'transparent',
    }
})

export default BottomTab
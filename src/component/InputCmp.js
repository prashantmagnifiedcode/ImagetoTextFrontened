import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
// import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const InputCmp = ({
  label,
  iconName,
  error,
  password,
  LogPage,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
  // const navigation = useNavigation();

  return (
    <View style={{marginBottom: 15}}>
      <Text style={[style.label,{marginLeft:10}]}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? "#ff0000"
              : isFocused
              ? "gray"
              : "#e7e7e7",
            alignItems: 'center',
          },
        ]}>
        <Icon
          name={iconName}
          style={{color: "#aacbff", fontSize: 22, marginRight: 10}}
        />
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={{color: "gray", flex: 1}}
          {...props}
        />
        {password && (
        
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={{color: "#aacbff", fontSize: 22}}
          />
        )}
      </View>
      <View>
      {error && (
        <Text style={{marginTop: 7, color: "#ff0000", fontSize: 12,marginHorizontal:15}}>
          {error}
        </Text>
      )}
      {
        LogPage?
        
        <Text 
        //  onPress={() => navigation.navigate('ForgotPassword')}
         
         style={{marginTop: 7 ,paddingHorizontal:4, color: "#047bfe", fontSize: 12,textAlign:"right"}}>
           forget Password
        </Text>
        :null
      }
      </View>
      {/* {error && (
        <Text style={{marginTop: 7, color: "red", fontSize: 12,marginHorizontal:15}}>
          {error}
        </Text>
      )} */}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: "gray",
  },
  inputContainer: {
    height: 50,
    backgroundColor: "light",
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius:25
  },
});

export default  InputCmp

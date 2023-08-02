import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Keyboard,
  Alert,
} from 'react-native';
import InputCmp from '../../component/InputCmp';
import {TouchableOpacity} from 'react-native';
import Loader from '../../component/Loader';
import {useNavigation} from '@react-navigation/native';
import {  useDispatch } from "react-redux";
import {LoginUser} from '../../redux/action/auth'
import {GetData} from '../../services/axios';
const Login = () => {

  
  const [inputs, setInputs] = useState({email: '', password: ''});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const Navigation = useNavigation();
  const dispatch=useDispatch()




  //  validate email
  const emailverify = () => {
    // Use a single regular expression to check all conditions

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //  const emailreg= emailRegex.test(inputs.email);
    return emailRegex.test(inputs.email);
  };



  //  validating the entered value
  const validate = async () => {
    Keyboard.dismiss();
    let isValidemail = false;
    let isValidpassword = false;
    if (!inputs.email) {
      handleError('Please input email', 'email');
    }
    if (!inputs.password) {
      handleError('Please input password', 'password');
    }
    if (inputs.password && inputs.email) {
      // Use a single regular expression to check all conditions
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[@#_])(?=.*\d).{8,}$/;
      const pout = passwordRegex.test(inputs.password);
      const emailreg = emailverify();

      if (!pout) {
        handleError('Password must have a minimum of 8 characters including alphabets, special characters (#, @, _) 	 ', 'password');
      } else {
        isValidpassword = true;
      }
      if (!emailreg) {
        handleError('email is incorrect', 'email');
      } else {
        isValidemail = true;
      }
    }

    if (isValidpassword && isValidemail) {
      login();
    }
  };


  //  login the user in app 
  const login = async () => {
    try {
      setLoading(true);
      const val = await GetData.loginUser(inputs);
      console.log("logn in ",val.data.status)
      setTimeout(async () => {
        setLoading(false);
        if (val.data.status == 200) {
          dispatch(LoginUser(val.data))
          Navigation.navigate('Home');
        }
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  };

  //  taking user inputs 
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };


  //  handling errors 
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };



  return (
    <SafeAreaView style={styles.Logcontainer}>
      <Loader visible={loading} />

      <View style={styles.midcontainer}>
        <Text style={styles.firsheader}>Welcom Back !</Text>
        <Text style={styles.secondheader}>Convert Image to text</Text>

        <View>
          {/* email field */}
          <InputCmp
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-fast-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />
          {/* password field */}
          <InputCmp
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
            LogPage={true}
          />

          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              color: '#fff',
              fontSize: 16,
              marginTop: 20,
              textAlign: 'center',
              backgroundColor: '#526ee7',
              marginHorizontal: 20,
              borderRadius: 25,
              padding: 7,
            }}
            onPress={validate}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 18,
                textAlign: 'center',
              }}>
              Log in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomtext}
      
      >
        <Text
          style={styles.dont}
          onPress={()=>Navigation.navigate("register")}
          >
          Don't have account ? Register
        </Text>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Logcontainer: {
    backgroundColor: 'white',
    flex: 1,
    alignContent: 'center',
    justifyContent: 'space-evenly',
  },
  midcontainer: {
    flex: 2,
    paddingHorizontal: 20,
    marginVertical: 'auto',
    justifyContent: 'center',
    alignContent: 'center',
  },
  firsheader: {
    color: 'black',
    fontSize: 23,
    fontWeight: 'bold',
  },
  secondheader: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 5,
  },
  bottomtext: {
    marginVertical: 10,
    display:"flex",
    justifyContent:"center",
    alignContent:'center'
  },
  dont:{
    color: 'gray',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 13,
            marginTop:10
  }
});
export default Login;

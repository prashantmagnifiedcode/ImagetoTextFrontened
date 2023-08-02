import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Keyboard,
  Animated,
  Alert,
} from 'react-native';
import InputCmp from '../../component/InputCmp';
import {TouchableOpacity} from 'react-native';
import Loader from '../../component/Loader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {GetData} from '../../services/axios';
const StartRegister = () => {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
  });
  const [Step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const Navigation = useNavigation();
  //  validate task
  // const validate = async () => {
  //   Keyboard.dismiss();
  //   let isValid = true;
  //   if (!inputs.email) {
  //     handleError('Please input email', 'email');
  //     isValid = false;
  //   }
  //   if (!inputs.password) {
  //     handleError('Please input password', 'password');
  //     isValid = false;
  //   }
  //   if (inputs.password) {
  //     // Use a single regular expression to check all conditions
  //     const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[@#_])(?=.*\d).{8,}$/;

  //     const pout = passwordRegex.test(inputs.password);
  //     if (pout) {
  //       isValid = true;
  //     } else {
  //       handleError('password minimum length 8', 'password');
  //       isValid = false;
  //     }
  //   }

  //   if (isValid) {
  //     StartRegister();
  //   }
  // };

  // const StartRegister = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);

  //     if (inputs.email !== '' && inputs.password !== '') {
  //       // const{email, password}=inputs
  //       // console.log("email",email)
  //       // return false
  //       Navigation.navigate('done');
  //     } else {
  //       Alert.alert('Error', 'Invalid Details');
  //     }
  //   }, 3000);
  // };



  //  handlechanging function 
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };




  // adding error of user through handlError function 

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };


  //  verify the password of user 
  const passwordverify = () => {
    if (
      inputs.password != inputs.confirmpassword ||
      !inputs.password ||
      !inputs.confirmpassword
    ) {
      handleError('password is incorrect', 'password');
      handleError('password is incorrect', 'confirmpassword');
      return true;
    }
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[@#_])(?=.*\d).{8,}$/;
    const pout = passwordRegex.test(inputs.password);
    console.log('put', pout);
    if (!pout) {
      handleError('password not satify the condition', 'password');
      handleError('password not satify the condition', 'confirmpassword');
      return true;
    }
    return false;
  };




  // Registering user in our app 
 // registering function
  const creatuser = async () => {
    try {
      const {username, email, password} = inputs;
      const res = await GetData.registerUser({username, email, password});
      console.log('res', res.data.status);
      if (res?.data.status == 200) {
        // setShowNextButton(false);
        setLoading(true);
        setStep(Step + 1);
        Animated.timing(progress, {
          toValue: Step + 1,
          duration: 1000,
          useNativeDriver: false,
        }).start();
        setTimeout(async () => {
          setLoading(false);

          Navigation.navigate('done');
        }, 2000);
        // Alert.alert(res.data.message)
      } else {
        Alert.alert(res.data.message);
      }
    } catch (e) {
      console.log("erro",e);
    }
  };

  const emailverify = () => {
    // Use a single regular expression to check all conditions

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

     const emailreg= emailRegex.test(inputs.email);
     console.log(emailreg)
    return emailreg;
  };
  // one clicking next button trigger this
  const handleNext = () => {
  


    let check = true;
    if (Step == 0 && !inputs.email) {
      handleError('email is required', 'email');
      check = false;
    }
    if (Step == 0 && inputs.email&&!emailverify()) {
      handleError('email is required', 'email');
      check = false;
    }

    if (Step == 1 && !inputs.username) {
      handleError('User name required', 'username');
      check = false;
    }
    if (Step == 2 && passwordverify()) {
      check = false;
    }

    if (check && Step == 2) {
      creatuser();
    } else {
      if(check){

        setStep(Step + 1);
  
        Animated.timing(progress, {
          toValue: Step + 1,
          duration: 1000,
          useNativeDriver: false,
        }).start();
      }
    }


  };


  //  render the next button 
  const renderNextButton = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.nextbtn}
        onPress={handleNext}>
        <Text
          style={styles.nextbtntext}>
          Next
        </Text>
      </TouchableOpacity>
    );
  };


  // progress bar usestate and logic 
  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, 3],
    outputRange: ['0%', '100%'],
  });

  //  progressbar btn 
  const renderProgressBar = () => {
    return (
      <View
        style={{
          width: '100%',
          height: 2,
          backgroundColor: '#00000020',
        }}>
        <Animated.View
          style={[
            {
              height: 2,
              backgroundColor: 'green',
            },
            {
              width: progressAnim,
            },
          ]}></Animated.View>
      </View>
    );
  };


  return (
    <SafeAreaView style={styles.Logcontainer}>
      <Loader visible={loading} />
       



       {/* header part ui  */}
        
      <View
        style={styles.header}>
        <View style={styles.innerheader}>
          <View style={styles.innerheader}>
            <View
              style={styles.maintainheader}>
              {/* Welcome message and name */}
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                <Icon
                onPress={()=> Navigation.goBack()}
                  name="backburger"
                  style={{color: 'black', fontSize: 22}}
                />
              </View>

              <View style={{flexDirection: 'column'}}>
                <Text
                  style={styles.headerText}>
                  Register
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                <Icon
                  name="alert-circle-outline"
                  style={{color: 'black', fontSize: 22}}
                />
              </View>
            </View>
          </View>
        </View>
      </View>



       {/* progress is rending from */}
      {renderProgressBar()}
       {/* progress is rending to  */}




      <View style={{marginTop: 20, marginHorizontal: 10}}>
        {/* email field */}

        {Step == 0 ? (
          <InputCmp
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-fast-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />
        ) : null}
        {/* user name  */}

        {Step == 1 ? (
          <InputCmp
            onChangeText={text => handleOnchange(text, 'username')}
            onFocus={() => handleError(null, 'username')}
            // iconName=""
            label="username"
            placeholder="Enter your username "
            error={errors.username}
          />
        ) : null}

        {/* password && confirmpassword  */}
        {Step == 2 ? (
          <>
            <InputCmp
              onChangeText={text => handleOnchange(text, 'password')}
              onFocus={() => handleError(null, 'password')}
              iconName="email-fast-outline"
              label="password"
              placeholder="Enter your password "
              error={errors.password}
            />
            <InputCmp
              onChangeText={text => handleOnchange(text, 'confirmpassword')}
              onFocus={() => handleError(null, 'confirmpassword')}
              iconName="email-fast-outline"
              label="confirm password"
              placeholder="Enter your confirm password "
              error={errors.confirmpassword}
            />
          </>
        ) : null}


         
        {Step <= 1 ? (
          renderNextButton()
        ) : Step == 2 ? (
          <>
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
              onPress={handleNext}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 18,
                  textAlign: 'center',
                }}>
                Create
              </Text>
            </TouchableOpacity>
          </>
        ) : null}





      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Logcontainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  midcontainer: {
    flex: 2,
    paddingHorizontal: 20,
    marginVertical: 'auto',
    justifyContent: 'center',
    alignContent: 'center',
  },
  header: {
    height:40,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginVertical: 10,
  },
  innerheader: {
    flexDirection: 'column',
     paddingHorizontal: '2%'
  },
  maintainheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText:{
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: 'black',
  },
  nextbtn:{
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    backgroundColor: '#526ee7',
    marginHorizontal: 20,
    borderRadius: 25,
    padding: 7,
  },
  nextbtntext:{
    color: 'white',
            fontWeight: 'bold',
            fontSize: 18,
            textAlign: 'center',
  }
});
export default StartRegister;

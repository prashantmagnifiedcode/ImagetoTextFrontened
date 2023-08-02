import React, {useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Keyboard} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Loader from '../../component/Loader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';


const Register = () => {
  const [loading, setLoading] = useState(false);
  const Navigation = useNavigation();

  return (
    <SafeAreaView style={styles.Logcontainer}>
      <Loader visible={loading} />

      <View style={styles.midcontainer}>
        <Text style={styles.firsheader}>Register Yourself !</Text>
        <Text style={styles.secondheader}>
          Create an account to start converting images to text
        </Text>

        <View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.regTouch}
            onPress={() => Navigation.navigate('startregister')}>
            <Text style={{color: 'white', fontSize: 14, textAlign: 'center'}}>
              Register with Email&nbsp;
              <Icon
                name="forwardburger"
                style={{color: '#fff', fontSize: 15}}
              />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomtext}>
        <Text
          style={{
            color: 'gray',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 13,
          }}
          onPress={() => Navigation.navigate('login')}>
          Already have account ?
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
    color: 'gray',
    fontSize: 12,
    //  fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 5,
  },
  bottomtext: {
    marginVertical: 5,
  },
  regTouch:{
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    backgroundColor: '#526ee7',
    marginHorizontal: 20,
    borderRadius: 25,
    padding: 7,
  }
});
export default Register;

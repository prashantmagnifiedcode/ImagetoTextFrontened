import {StatusBar} from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,ScrollView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';

const Welcome = () => {
  const Navigation = useNavigation();
  return (
    // <ScrollView showsVerticalScrollIndicator={false}>
    <View style={{flex: 1, backgroundColor: "#131824",}}>
      <ImageBackground
        source={require("../../assests/word.jpg")}
        imageStyle={{
          width: "100%",
          height: 400,
          opacity: 0.1,
          borderBottomRightRadius: 300,
        }}
      >

      <Animatable.Text style={styles.wel} animation="slideInDown">
        Welcome to Image to शब्द
      </Animatable.Text>
      <Animatable.Text style={styles.dis} animation="slideInUp">
      This App enables automated data extraction, simplifying tasks such as  extracting information from images
      </Animatable.Text>

      <Animatable.View animation={'fadeInUp'}>
        <TouchableOpacity onPress={() => Navigation.navigate('register')}>
          <Text style={styles.getstarted}>Get Started</Text>
        </TouchableOpacity>
      </Animatable.View>
      <Animatable.View animation={'fadeInUp'}>
        <TouchableOpacity onPress={() => Navigation.navigate('login')}>
          <Text style={styles.already}>Already Have An Account</Text>
        </TouchableOpacity>
      </Animatable.View>
      </ImageBackground>
    </View>
    // </ScrollView >
  );
};
const styles = StyleSheet.create({
  wel: {
    color: '#fff',
    fontSize: 22,
    marginTop: 350,
    textAlign: 'center',
  },
  dis: {
    color: 'grey',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    marginHorizontal:10
  },
  getstarted: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    backgroundColor: '#526ee7',
    marginHorizontal: 20,
    borderRadius: 25,
    padding: 7,
  },
  already: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    backgroundColor: '#171B29',
    marginHorizontal: 20,
    borderRadius: 25,
    padding: 7,
  },
});
export default Welcome;

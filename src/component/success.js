import React from "react";
import {
  View,
  Text,
  StyleSheet,TouchableOpacity
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {useNavigation} from '@react-navigation/native';

const SuccessScreen = () => {
  const Navigation = useNavigation();
  

  return (
    <>
      <View
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ marginBottom: "2%" }}>
          <FontAwesome5 name="thumbs-up" size={90} color="#526ee7" />
        </View>
        <View style={styles.container}>
        {/* <Animatable.Text animation="slideInDown" iterationCount={5} direction="alternate"> */}
          <Text style={{ color: "gray" ,fontSize:25}}>Welcome Rohit</Text>
        <Text style={{ color: "gray",fontSize:12,marginTop:20 }}>Now we can start converting image to text</Text>
            
        {/* </Animatable.Text> */}
        <TouchableOpacity
         onPress={() => Navigation.navigate("login")}
        style={{marginTop:1}}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              marginTop: 10,
              textAlign: "center",
              backgroundColor: "#526ee7",
              marginHorizontal: 20,
              borderRadius: 25,
              padding:7,
              width:280
            }}
          >
            Go to Home 
          </Text>
        </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default SuccessScreen;

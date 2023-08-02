import React, {useRef, useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity,PermissionsAndroid,Alert, Dimensions, SafeAreaView,Image,Text} from 'react-native';
import {RNCamera} from 'react-native-camera';
import DocumentScanner from 'react-native-document-scanner-plugin'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/Ionicons'


// import {blue} from '../utils/colors';/

const {width, height} = Dimensions.get('screen');

const DESIRED_RATIO = "16:9";

const Camera = ({navigation,setextract,extract,setExtractedText,setSavetext}) => {
  const cameraRef = useRef(null);
  
  const takePicture = async () => {
    try {
      if (cameraRef.current) {
        const options = {
          quality: 0.5,
          base64: false,
        };
        const {uri} = await cameraRef.current.takePictureAsync(options);
        console.log(uri)
        // callback({
        //   uri,
        //   type: 'image/jpeg',
        //   fileName: uri.split('/').pop(),
        // });
          
        setextract(uri)
      
        // navijgation.goBack();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const scanDocument = async () => {
    // start the document scanner
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission for image',
        // message:
        //   'Cool Photo App needs access to your camera ' +
        //   'so you can take pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const { scannedImages } = await DocumentScanner.scanDocument()
    
      // get back an array with scanned image file paths
      if (scannedImages.length > 0) {
        // set the img src, so we can view the first scanned image
        setextract(scannedImages[0])
      }
      // console.log('You can use the camera');
    } else {
      Alert.alert('Camera permission denied');
    }
  }

  return (
    <SafeAreaView>

      {
        extract?
        <View style={{height:520,marginVertical:0,backgroundColor:"black",display:"flex",justifyContent:"center",position:"relative"}}>
        <Image source={{ uri: extract }} resizeMode='contain' style={styles.preview}  />
        <View style={{backgroundColor:"#fff",position:"absolute",bottom:5,left:5,paddingHorizontal:10,paddingVertical:5,borderRadius:25}}>
        <TouchableOpacity  onPress={()=>{setextract(''),setSavetext(false),setExtractedText([])}}>
        <Text style={{color:"red"}}>Re-Take </Text>
      </TouchableOpacity>
      </View>
     
        </View>
        :
        <>
    <View style={{marginVertical:0,backgroundColor:"black",display:"flex",justifyContent:"center"}}>
      <View style={styles.cameraContainer}>
{/*       
        <RNCamera style={styles.camera} ref={cameraRef} 
 captureAudio={true}

        /> */}
     
      <TouchableOpacity style={styles.captureButton} onPress={scanDocument}>
      <Text style={{color:"gray",fontSize:12}}> Start Scan Your Image</Text>
      </TouchableOpacity>
    </View>
    </View>
        </>
     
    }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    height: 100, width:"100%",

  },
  camera: {
    
    flex: 1,
    width:400,
    // height:"100%",
  },
  captureButton: {
      position: 'absolute',
      width: 200,
      height: 40,
      borderRadius: 30,
      backgroundColor: "white",
      justifyContent: 'center',
      alignItems: 'center',
      bottom: 25,
      left: width / 2-100
  },
  preview: {
 
      height: "100%", width: "100%", borderRadius: 0     
      
  },
});

export default Camera;
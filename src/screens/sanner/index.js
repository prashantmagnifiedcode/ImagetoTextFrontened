import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Keyboard,
  Animated,Alert
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Loader from '../../component/Loader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import RadioButton from '../../component/radiobutton';
import {GetData} from '../../services/axios';
import {ScrollView} from 'react-native-gesture-handler';
import Camera from '../../component/camera';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import {useSelector,useDispatch} from 'react-redux';
import {insetdata} from '../../redux/action/auth'
const Scanner = () => {
  const { id,} =useSelector(state=>state.userData)
  const dispatch=useDispatch()
  const [loading, setLoading] = useState(false);
  const [issaved, setissaved] = useState(false);
  const [ExtractedText, setExtractedText] = useState([]);
  
  const [collecteddata, setcollecteddata] = useState({
    clickname:'',clickline:1
  });

  const [extract, setextract] = useState(null);
  const [Savetext, setSavetext] = useState(false);
  const [Generate, setGenerate] = useState(1);
  const [selection, setselection] = useState([
    {id: 1, name: '1st', value: '1', selected: true},
    {id: 2, name: '2nd', value: '2', selected: false},
    {id: 0, name: 'All', value: '0', selected: false},
  ]);
  console.log('selected', Generate);
  const Navigation = useNavigation();
 

  const onRadioBtnClick = item => {
    let updatedState = selection.map(isLikedItem =>
      isLikedItem.id === item.id
        ? {...isLikedItem, selected: true}
        : {...isLikedItem, selected: false},
    );
   
    setissaved(false)
    setselection(updatedState);
    setGenerate(item.id);

  };


  const processImage = async () => {
    try {
      setLoading(true);
      const result = await TextRecognition.recognize(extract);
      console.log('Recognized text:', result.text);

      const blocksArray = result.blocks.map(block => ({
        text: block.text,
        frame: block.frame,
        value: true,
        selected: false,
        lines: block.lines.map(line => ({
          text: line.text,
          frame: line.frame,
        })),
      }));
      setExtractedText(blocksArray);

      // console.log('extract text out', blocksArray);
      if (blocksArray.length) {
        setSavetext(true);
        setLoading(false);
      }else{
        Alert.alert("text not generated")
        

        setLoading(false);
      }
    } catch (err) {
      // console.warn(err);
      console.log('Error occurred during OCR processing');
    }
  };

  
  const save=async()=>{
    try{
      setLoading(true)
      // console.log(Generate)
      let selecteddata;
      if(Generate==0){
        const combinedClickname = ExtractedText.map(obj => obj.text).join('');
        // console.log("cmobie",combinedClickname)
        selecteddata={clickname:combinedClickname,clickline:Generate};
        
      }else{
        // console.log("md",ExtractedText[Generate-1].text);
        selecteddata={clickname:ExtractedText[Generate-1].text,clickline:Generate};
      }
      console.log({...selecteddata,_id:id})
      const res= await GetData.SaveClick({...selecteddata,_id:id});
       console.log("EDIT",res?.data.data)
       if(res.data.status==200){
          dispatch(insetdata([...res?.data?.data]))
          setLoading(false)
          setissaved(true)
         }else{
           // setLoading(false)
           Alert.alert("failed")
         }
       setTimeout(() => {
        setLoading(false)
      }, 3000);
        
      }catch(e){
      setLoading(false)
      Alert.alert("Network error")
    }
     }
  

  return (
    <SafeAreaView style={styles.Logcontainer}>
      <Loader visible={loading} />

      <View
        style={{
          height: 20,
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: '#fff',
          marginVertical: 15,
        }}>
        <View style={{flexDirection: 'column', paddingHorizontal: '2%'}}>
          <View style={{flexDirection: 'column', paddingHorizontal: '2%'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
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
                  style={{
                    fontFamily: 'Roboto-Regular',
                    fontSize: 16,
                    color: 'black',
                  }}>
                  Scan images to Generate texts
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}></View>
            </View>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Camera
          setExtractedText={setExtractedText}
          setextract={setextract}
          extract={extract}
          setSavetext={setSavetext}
        />

        <View>
          {/* scanner pic  */}

          {/* selection radio button  */}
        </View>

        <View style={{padding: 10, marginVertical: 10}}>
          <Text style={{marginBottom: 8, fontSize: 16, color: 'black'}}>
            Row(s) to extract
          </Text>

          {selection.map(item => (
            <RadioButton
              onPress={() => onRadioBtnClick(item)}
              selected={item.selected}
              key={item.id}>
              {item.name}
            </RadioButton>
          ))}
         
        </View>

        <Text
          style={{
            marginHorizontal: 12,
            fontSize: 15,
            color: 'black',
            marginBottom: 10,
          }}>
          Generate Text
        </Text>


        <View style={{marginHorizontal: 20}}>
          {!ExtractedText.length ? (
            <Text style={{color: 'gray', fontSize: 13, textAlign: 'center'}}>
              empty!{' '}
            </Text>
          ) : Generate ? (
            ExtractedText[Generate - 1]?.text ? (
              <Text
                style={{
                  color: 'gray',
                  fontSize: 13,
                  backgroundColor: '#F8F8F8',
                  borderRadius: 25,
                  margin: 2,
                  padding: 5,
                  textAlign: 'center',
                }}>
                {' '}
                {ExtractedText[Generate - 1]?.text}
              </Text>
            ) : (
              <Text
                style={{
                  color: 'gray',
                  fontSize: 13,
                  backgroundColor: '#F8F8F8',
                  borderRadius: 25,
                  margin: 2,
                  padding: 5,
                  textAlign: 'center',
                }}>
                nothing
              </Text>
            )
          ) : (
            ExtractedText.map((e, index) => {
              return (
                <Text
                  style={{
                    color: 'gray',
                    fontSize: 13,
                    backgroundColor: '#F8F8F8',
                    borderRadius: 25,
                    margin: 2,
                    padding: 5,
                    textAlign: 'center',
                  }}
                  key={index}>
                  {e.text}
                </Text>
              );
            })
          )}
        </View>



        <View style={{marginBottom: 100}}>
          {!Savetext ? (
            extract ? (
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
                  onPress={processImage}
                >
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 16,
                    textAlign: 'center',
                  }}>
                  Generate Text
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  fontSize: 16,
                  marginTop: 20,
                  textAlign: 'center',
                  backgroundColor: '#bec8ea',
                  marginHorizontal: 20,
                  borderRadius: 25,
                  padding: 7,
                  opacity: 1,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 16,
                    textAlign: 'center',
                  }}>
                  Generate Text
                </Text>
              </TouchableOpacity>
            )
          ) : null}

          {Savetext ? (
            issaved?
            <TouchableOpacity
            activeOpacity={0.7}
            style={{
              fontSize: 16,
              marginTop: 20,
              textAlign: 'center',
              backgroundColor: '#90EE90',
              marginHorizontal: 20,
              borderRadius: 25,
              padding: 7,
              opacity: 1,
            }}
            onPress={save}
            >
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 16,
                textAlign: 'center',
              }}>
              successfully saved !
            </Text>
          </TouchableOpacity>:
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                fontSize: 16,
                marginTop: 20,
                textAlign: 'center',
                backgroundColor: '#526ee7',
                marginHorizontal: 20,
                borderRadius: 25,
                padding: 7,
                opacity: 1,
              }}
              onPress={save}
              >
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 16,
                  textAlign: 'center',
                }}>
                save
              </Text>
            </TouchableOpacity>
            
            
          ) : null}
        </View>
      </ScrollView>
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
  firsheader: {
    color: 'black',
    fontSize: 23,
    fontWeight: 'bold',
  },
  secondheader: {
    // color: "gray",
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 5,
  },
  bottomtext: {
    marginVertical: 5,
  },
});
export default Scanner;

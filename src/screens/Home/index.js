import React, {useState,useEffect,useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
  ScrollView,
  Touchable,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GetData} from '../../services/axios';

import {useSelector, useDispatch} from 'react-redux';
import {UserLogout} from '../../redux/action/auth';

const Home = () => {
  const { loggedIn,id,username,RecordClick} =useSelector(state=>state.userData)
  const dispatch = useDispatch();

  const [HomeData, setHomeData] = useState([]);
 
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  
  useEffect(() => {
    
    (async () => {
      try {
        const res = await GetData.fetchSaveClick({id})
        if (res?.data.status == 200) {

          const UpdateHomeData = res.data.saveclick[0].RecordClick?.map(e => {
            return {...e, edit: false};
          });
          console.log("l")
          setHomeData([...UpdateHomeData]);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  },[refreshing]);
  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {/* header section  */}
        <LinearGradient
          start={{x: 0.0, y: 0.4}}
          end={{x: 0.5, y: 1.0}}
          location={[0, 1]}
          colors={['#171B29', '#526ee7']}
          style={{...styles.linerbox, ...styles.shadow}}>
          <View style={styles.innerheader}>
            <View style={styles.innerheader}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}>
                {/* Welcome message and name */}
                <View style={{flexDirection: 'column'}}>
                  <Text
                    style={{
                      fontFamily: 'Roboto-Regular',
                      fontSize: 16,
                      color: '#fff',
                    }}>
                    Welcome !
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Roboto-Medium',
                      color: '#fff',
                      fontSize: 14,
                      marginLeft: 8,
                    }}>
                    {username}
                  </Text>
                </View>

                {/* Bell icon and profile pic */}
                <View style={{display:"flex",justifyContent:"center", alignItems: 'center'}}>
                 
                  {loggedIn ? 
                    <Icon
                    onPress={() => dispatch(UserLogout())}
                      name="logout"
                      style={{color: '#fff', fontSize: 20}}
                      
                    />
                   :null}
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
        <View style={{marginVertical: 2}}>
          <Text style={{textAlign: 'center', color: 'gray', fontSize: 11}}>
            All recent scans !
          </Text>
        </View>
        <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>

       
        <View style={{marginHorizontal: 15, marginVertical: 2}}>
            
          <FlatList
            keyExtractor={item => item.id}
            data={RecordClick}
            renderItem={({item}) => (
              <View style={{...styles.listcontainer, ...styles.boxshadow}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Roboto-Medium',
                        color: '#333',
                        fontSize: 16,
                      }}>
                      {item.clickname}
                    </Text>
                    <Text style={{color: 'gray', fontSize: 10}}>Text of Image</Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Roboto-Medium',
                        color: '#333',
                        fontSize: 10,
                      }}>
                      Line Number
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Roboto-Medium',
                        color: '#333',
                        fontSize: 15,
                        textAlign: 'center',
                      }}>
                      {item.clickline}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
        </ScrollView>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  shadow: {
    elevation: 5,
    shadowColor: '#000',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  boxshadow: {
    elevation: 1,
    shadowColor: '#000',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  listcontainer: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 5,

    borderRadius: 10,
  },
  linerbox: {
    height: 80,
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 20,
    marginVertical: 5,
    marginHorizontal: 2,
  },
  innerheader: {
    flexDirection: 'column',
    marginTop: hp('1%'),
    paddingHorizontal: '2%',
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Home;

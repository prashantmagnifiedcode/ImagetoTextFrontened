import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Touchable,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GetData} from '../../services/axios';
import {Editdata, Deldata} from '../../redux/action/auth';
const Editscn = () => {
  const {id, RecordClick} = useSelector(state => state.userData);
  const {isConnected} = useSelector(state => state.NTW);
  const dispatch = useDispatch();
  const UpdateRecordlist = RecordClick?.map(e => {
    return {...e, edit: false};
  });
  const [recordlist, setrecordlist] = useState(UpdateRecordlist);

  const [editClickname, seteditClickname] = useState('');
  const [refresh, setrefresh] = useState(false);

  const Reloadapp = () => {
    setrefresh(prev => !prev);
  };
  const EditData = (edit_id, name) => {
    const data = recordlist.map(e =>
      e._id === edit_id ? {...e, edit: !e.edit} : {...e},
    );
    seteditClickname(name);
    setrecordlist(data);
  };
  const Del = async ID => {
    try {
      const res = await GetData.DelSaveClick({userid: id, recordid: ID});
      console.log('deting ..');
      if (res.data.status == 200) {
        dispatch(Deldata({_id: ID}));
        Alert.alert('Delele successfully');
      } else {
        Alert.alert('Not Delele');
      }
    } catch (e) {
      Alert.alert('Server error');
    }
  };

  const save = async item => {
    try {
      console.log("save")
      const collected_data = {
        _id: item._id,
        clickline: item.clickline,
        clickname: editClickname,
      };
      const res = await GetData.editSaveClick({
        _id: item._id,
        clickline: item.clickline,
        clickname: editClickname,
        id,
      });
      // console.log('EDIT');
      if (res?.data.status == 200) {
        EditData(item._id, '');
        dispatch(Editdata(collected_data));
        Alert.alert(' saved');

        Reloadapp();
      } else {
        Alert.alert('not saved');
      }
    } catch (e) {
      Alert.alert('Server error');
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const res = await GetData.fetchSaveClick({id});
        if (res?.data.status == 200) {
          const UpdateRecordlist = res.data.saveclick[0].RecordClick?.map(e => {
            return {...e, edit: false};
          });
          setrecordlist([...UpdateRecordlist]);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [RecordClick]);

  return (
    <>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        {/* header section  */}
        <View style={{marginVertical: 20, marginHorizontal: 10}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View>
              <Text style={{fontSize: 20, color: 'black'}}>Edit Texts</Text>
            </View>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <Icon
                onPress={Reloadapp}
                name="refresh"
                style={{color: 'gray', fontSize: 20, marginRight: 15}}
              />
            </View>
          </View>

          <View style={{marginVertical: 2}}>
            <Text style={{color: 'gray', marginHorizontal: 10, fontSize: 10}}>
              Your recent scans !
            </Text>
          </View>
        </View>
        {isConnected ? (
          <View style={{marginHorizontal: 15, marginVertical: 2}}>
            <FlatList
              keyExtractor={item => item._id}
              data={recordlist}
              renderItem={({item}) => (
                <>
                  <View
                    style={{
                      ...styles.shadow,
                      ...styles.record,
                      ...(item.edit ? {borderColor: '#bec8ea'} : null),
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View
                        style={{
                          flexDirection: 'column',
                          justifyContent: 'flex-start',
                        }}>
                        {item.edit ? (
                          <TextInput
                            value={editClickname}
                            onChangeText={e => seteditClickname(e)}
                            style={{
                              border: 1,
                              borderWidth: 1,
                              borderColor: 'gray',
                              color: 'black',
                              paddingHorizontal: 15,
                              width: 150,
                              paddingVertical: 0,
                              borderRadius: 25,
                            }}
                          />
                        ) : (
                          <Text
                            style={{
                              fontFamily: 'Roboto-Medium',
                              color: '#333',
                              fontSize: 16,
                            }}>
                            {item.clickname.length<18? item.clickname: item.clickname.slice(0,15)+"....."}
                          </Text>
                        )}
                        <Text style={{color: 'gray', fontSize: 10}}>
                          Text of Image
                        </Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                        }}>
                        <Icon
                          onPress={() => Del(item._id)}
                          name="delete"
                          style={{color: '#FFCCCB', fontSize: 20}}
                        />
                        {item.edit ? null : (
                          <Icon
                            onPress={() => EditData(item._id, item.clickname)}
                            name="circle-edit-outline"
                            style={{color: 'gray', fontSize: 20, marginLeft: 5}}
                          />
                        )}
                      </View>
                    </View>
                  </View>
                  {item.edit ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginBottom: 10,
                      }}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.touch}
                      
                        >
                        <Text   onPress={() => save(item)} style={styles.touchtext}>Save</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={{
                          ...styles.touch,
                          backgroundColor: 'white',
                          borderColor: 'gray',
                          color: 'black',
                          borderWidth: 1.5,
                        }}
                        onPress={() => EditData(item._id)}>
                        <Text style={{...styles.touchtext, color: 'black'}}>
                          Discard
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </>
              )}
            />
          </View>
        ) : (
          <View>
            <Text>not connected</Text>
          </View>
        )}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  shadow: {
    elevation: 2,
    shadowColor: '#000',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  record: {
    flexDirection: 'row',
    borderWidth: 0.5,
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 4,
    borderRadius: 10,
  },
  touch: {
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
    backgroundColor: '#526ee7',
    //   marginHorizontal: 20,
    borderRadius: 25,
    padding: 3,
    height: 25,
    width: '30%',
  },
  touchtext: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
});
export default Editscn;

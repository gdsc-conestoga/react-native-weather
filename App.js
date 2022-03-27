import React, {useEffect,useState} from 'react';
import { StyleSheet, Text, View,FlatList,Image,TouchableOpacity} from 'react-native';


export default function App() {

  const [data,setData] = useState([]);
  const [selectedDay, setSelectedDay]=useState([]);

  useEffect(()=>{
    fetchData();
  },[])

  const fetchData =()=>{
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely&units=metric&appid=a38ffa49f20f2efde19d911fd4f470a2')
    .then(response=>response.json())
    .then(json=>setData(json.daily))
  }

  const handleWeatherItemPress =(item)=>{
    setSelectedDay(item)
  }

  const renderItem=({item})=>{
    return(
      <TouchableOpacity key={item.dt} style={styles.weatherItem} onPress={()=>handleWeatherItemPress(item)}>
        <Image style={styles.weatherImage}
        source={{uri:'http://openweathermap.org/img/wn/'+item.weather[0].icon+'@2x.png'}} />
        <Text>
          {item.temp.day}
        </Text>
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.title}>
          Weather Forecast
        </Text>
      </View>
      <View style={styles.weatherView}>
        <FlatList 
          data={data}
          renderItem={renderItem}
          keyExtractor={item=>item.dt}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{justifyContent:'center',alignItems:'center'}}
        />
      </View>
      <View style={styles.descriptionView}>
        <View style={styles.row}>
          <Text style={styles.rowTitle}>{selectedDay.weather[0].description}</Text>
        </View>
        <View style={styles.row}>
          <View>
            <Text style={styles.rowTitle}>Highest</Text>
            <Text style={styles.rowValue}>
              {selectedDay?.temp?.max || ''}
            </Text>
          </View>
          <View>
            <Text style={styles.rowTitle}>Lowest</Text>
            <Text style={styles.rowValue}>
              {selectedDay?.temp?.min || ''}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View>
            <Text style={styles.rowTitle}>Humidity</Text>
            <Text style={styles.rowValue}>
              {selectedDay?.humidity || ''}
            </Text>
          </View>
          <View>
            <Text style={styles.rowTitle}>Pressure</Text>
            <Text style={styles.rowValue}>
              {selectedDay?.pressure || ''}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  weatherView:{
    flex:3,
    justifyContent:'center',
    alignItems:'center'
  },
  descriptionView:{
    flex:2,
    justifyContent:'center',
    alignItems:'center'
  },
  title:{
    fontSize:20,
    textAlign:'center'
  },
  weatherItem:{
    height:120,
    width:120,
    borderWidth:1,
    borderColor:'grey',
    marginHorizontal:10,
    borderRadius:5,
    justifyContent:'center',
    alignItems:'center'
  },
  weatherImage:{
    height:70,
    width:70,
  },
  row:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-around',
    marginVertical:15
  },
  rowTitle:{
    fontWeight:'bold',
    fontSize:16,
    textAlign:'center'
  },
  rowValue:{
    fontSize:14,
    marginTop:5,
    textAlign:'center'
  }
});

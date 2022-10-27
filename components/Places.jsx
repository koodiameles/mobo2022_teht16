import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Text, FlatList} from 'react-native';
import { initializeApp } from'firebase/app';
import { getDatabase, push, ref, onValue, remove } from'firebase/database';
import { Header, Input, Button, ListItem, Icon } from'react-native-elements';

export function Places({ navigation }) {

  // < FIREBASE
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyA2gTFm-DFO_xn1MiO-7-XKCLmBs59q3Tk",
    authDomain: "mobo2022-teht12.firebaseapp.com",
    projectId: "mobo2022-teht12",
    storageBucket: "mobo2022-teht12.appspot.com",
    messagingSenderId: "810096012613",
    appId: "1:810096012613:web:a4ec2d46cf97460e10222c"
  };
  const app = initializeApp(firebaseConfig); // Initialize Firebase
  const database = getDatabase(app);
  // FIREBASE >

  const [favorites, setFavorites] = useState([]);
  const [addressToLocate, setAddressToLocate] = useState();

  //delete item
  const deleteItem = (item) => {
    console.log("delete ", item)
    remove(ref(database, "/favorites/"+item.key))
  }

  //add item
  const addAddressToFavorites = () => {
    let newAddress = addressToLocate;
    push(ref(database, 'favorites/'),{ 'address': newAddress });
    setAddressToLocate("")
  }

  //update view
  useEffect(() => {
    const productsRef = ref(database, 'favorites/');  
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      const locations = data ? Object.keys(data).map(key=> ({key, ...data[key]})) : [];
      // console.log("locations",locations)
      setFavorites(locations);
    })
  }, []);

  console.log("favorites", favorites)

  return (
    <>
      <Header
        // statusBarProps={{ barStyle: 'dark-content' }}
        leftComponent={{ text: '(TEHT16)', style: {color: 'grey', fontWeight: "bold", fontSize:9}}}  
        containerStyle={{backgroundColor: 'black', border: "none"}}
      />
      <View style={styles.container}>
        <Input 
          style={styles.input} onChangeText={setAddressToLocate} value={addressToLocate}
          placeholder='Esimerkkikatu 12 Oulu' label='Enter Address (+City) (+Postal Code)'
          labelStyle={{color: "white"}}
          inputContainerStyle={{}}
        />
        <View style={{marginHorizontal: 25, marginVertical: 5, width: '95%'}}>
            <Button 
              title="Locate"   
              icon={<Icon name="place" size={15} color="white" type='material-icons'/>}
              titleStyle={{color: "white"}}
              buttonStyle={{backgroundColor: "#1E90FF", border:"none"}}
              onPress={() => navigation.navigate('Map', {addressToLocate: addressToLocate})}
            />
          </View>
          <View style={{marginHorizontal: 25, width: '95%'}}>
            <Button 
              title="Add to Favorites"   
              icon={<Icon name="favorite" size={15} color="white" type='material-icons'/>}
              titleStyle={{color: "white"}}
              buttonStyle={{backgroundColor: "#32cd32", border:"none"}}
              onPress={() => addAddressToFavorites()} 
            />
          </View>
      </View>
      <View style={styles.container2}>
        <Text style={{color:"white", fontSize:26, fontWeight: "bold"}}>Favorite Locations</Text>
        <Text style={{color:"white", fontSize:12 }}>Click to locate</Text>
        {favorites.map((item, i) => (
           <ListItem 
            key={i}
            bottomDivider
            onPress={() => navigation.navigate('Map', {addressToLocate: item.address})}
            onLongPress={() => deleteItem(item)}
            containerStyle={{backgroundColor: 'black', width: '95%'}}
          >
           <ListItem.Content style={{ flex: 4}}>
             <ListItem.Title style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
               {item.address} 
             </ListItem.Title>
           </ListItem.Content>
           <ListItem.Content >
              <Icon name="double-arrow" size={20} color="#1E90FF" type='material-icons'/>
            </ListItem.Content>
         </ListItem>
        ))}
       </View>
    </>
  );
}

const styles = StyleSheet.create({
  containerHeader: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  container2: {
    flex:2,
    backgroundColor: 'black',
  },
  input : {
    color:"azure",
  }
});

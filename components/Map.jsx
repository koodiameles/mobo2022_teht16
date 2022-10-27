
import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View, TextInput, Button, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {API_KEY} from '@env';


export function Map({ route, navigation }) {

  let KEY = "your key here";

  if (API_KEY !== undefined) {
    console.log("You have API_KEY from local config")
    KEY = API_KEY;
  } else {
    console.log("API_KEY is undefined. Set it in .env file or hardcode KEY variable")
  }

  const {addressToLocate} = route.params;
  console.log(addressToLocate)

  const [latitude, setLatitude] = useState(60.201373);
  const [longitude, setLongitude] = useState(24.934041);
  const [latitudeDelta, setLatitudeDelta] = useState(0.0322)
  const [longitudeDelta, setLongitudeDelta] = useState(0.0322)
  const [searchedLocation, setSearchedLocation] = useState("")

  useEffect(() => {
    const fetchAddressLocation = async () => {
      let address = addressToLocate;
      let key = KEY;
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`)
      const json = await response.json();
      setLatitude(json.results[0].geometry.location.lat)
      setLongitude(json.results[0].geometry.location.lng)
    }

    fetchAddressLocation()
  }, [addressToLocate])


  return (
    <>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{latitude : latitude , longitude : longitude, latitudeDelta: latitudeDelta, longitudeDelta: longitudeDelta}}
        >
          <Marker
            coordinate={{ latitude : latitude , longitude : longitude }}
            title={addressToLocate}
          />
        </MapView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%"
  }
});

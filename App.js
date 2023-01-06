import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

import CurrentWeather from "./components/CurrentWeather";
import Forecasts from "./components/Forecasts";

const API_URL = (lat, lon) => `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=fc38b9bd73f7b44453852196009a87ae&lang=fr&units=metric`

export default function App() {
  // 1 - Récupérer les coordonnées de l'utilisateur
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(null);

  useEffect(() => {
    const getCoordinate = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status != 'granted') {
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync();
      getWeather(userLocation);
    };

    getCoordinate();
  }, []);

  // 2 - Réaliser une requète vers notre serveur
  // city
  // météo
  // prévision

  const getWeather = async (location) => {
    try {
      const response = await axios.get(API_URL(location.coords.latitude, location.coords.longitude))

    setData(response.data)
    setLoading(false)

    }catch(e){
      console.log("Erreur dans getWeather")
    }
    
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

// data? = si c'est null l'application ne va pas cracher
  return (
    <View style={styles.container}>
      <CurrentWeather data={data} />
      <Forecasts data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2E6E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

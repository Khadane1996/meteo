import React, { useEffect, useState } from "react"
import { View, Text, Image, StyleSheet } from "react-native"
import { isSameDay } from "date-fns";

const getIcon = (icon) => `http://openweathermap.org/img/wn/${icon}@4x.png`

export default function CurrentWeather({ data }) {

  const [currentWeather, setCurrentWeather] = useState(null)

  useEffect(() => {
    // filter() permet de filtrer des éléments selon une condition
    
    // si c'est true alors l'élément sera ajouté à ce nouveau tableau
    const currentW = data.list.filter(forcast => {

      //valeur absolue du fuseau horaire de la ville dans laquelle on se ////trouve Math.abs(data.city.timezone * 1000)

      const today = new Date().getTime() + Math.abs(data.city.timezone * 1000)
      const forecastDate = new Date(forcast.dt * 1000)
      return isSameDay(today, forecastDate)
    })

  //maintenant dans notre arret ici currentW on a un tableau des  prévisions du jours, celles ci sont rangées par ordre croissant

  // récupérons la première prévision currentW[0]
  // grace à ce state on va pouvoir garder en mémoire la prévision météo qu'on veut afficher dans ce composant setCurrentWeather()
  
  setCurrentWeather(currentW[0])

  }, [data])

  return (
    <View style={ styles.container } >
      <Text style={styles.city}> { data?.city?.name } </Text>
      <Text style={styles.today}> Ajourd'hui </Text>

      <Image source={{ uri: getIcon(currentWeather?.weather[0].icon) }} style={ styles.image } />

      <Text style={ styles.temp }> { Math.round(currentWeather?.main.temp) }°C</Text>
      <Text style={ styles.description }> { currentWeather?.weather[0].description }°C</Text>
    </View>
  )
}

const COLOR = "#54565B"

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    alignItems: "center",
    height: "65%"
  },
  city: {
    fontSize: 36,
    fontWeight: "500",
    color: COLOR
  },
  today: {
    fontSize: 24,
    fontWeight: "300",
    color: COLOR
  },
  image: {
    width:150,
    height:150,
    marginVertical: 20
  },
  temp: {
    fontSize: 80,
    fontWeight: "bold",
    color: COLOR
  },
  description: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLOR
  }
})
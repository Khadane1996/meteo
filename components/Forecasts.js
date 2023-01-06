import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { format, fr } from "date-fns";
// import { fr } from "date-fns/locale";

import Weather from "./Weather";

export default function Forecasts({ data }) {
  const [forecasts, setForecasts] = useState([])
  // Le hoot useEffet, à chaque fois que data changera on voudra appeler useEffet
  useEffect(() => {
    // On va itérer sur nos prévisions et grace à map() on va returner un nouvel arret (arret = tableau)
    const forecastsData = data.list.map(f => {
      // Pour prévision on va retourner un objet
      const dt = new Date(f.dt * 1000)
      return ({
        date: dt,
        hour: dt.getHours(),
        temp: Math.round(f.main.temp),
        icon: f.weather[0].icon,
        name: format(dt, "EEEE", { locale: fr })
      })
    })

    // Logique pour grouper les éléments par journée - name
    // 1 - créer un tableau [""] en récupérant seulement le nom des jours des prévisions
    // 2 - Enlever les doublons, exemple garder 1 seul vendredi, 1 seul samedi etc


    let newForecastsData = forecastsData.map(forecast => {  
      return forecast.name
      // self c'est notre tableau brute, indexOf() c'est une fonction qui va nous renvoyer l'index de notre élément et prend en paramètre un élément, day c'est l'élément courant
    }).filter((day, index, self) => {
      // return tous les éléments pour lesquels on va renvoyer true, si on renvoie false alors l'élément ne sera pas garder

      // ici on veut l'index de notre élément courant et on va le comparer avec l'index qui est passé en paramètre
      return self.indexOf(day) === index
    }).map((day) => {
      // { day: name, data: [ forecast, forecast] }  
      // Ici on garde toutes les prévisions qui correspondent à cette journée   
      return {
        day, 
        data: forecastsData.filter((forecast) => forecast.name === day)
      }
    })
 
    // console.log(newForecastsData)   
    setForecasts(newForecastsData) 
  }, [data])
  // <> </> c'est un fragma, il permet d'ajouter des éléments childrens sans créer un nouveau node

  // { day: name, data: [ forecast, forecast] }  
  
  return ( 
    <ScrollView 
    horizontal 
    showsHorizontalScrollIndicator={false}
    style={ styles.scroll }
     >

       {forecasts.map(f => (
         <View> 
            <Text style={ styles.day }> {f.day.toUpperCase()} </Text>
            <View style={ styles.container }>
              { f.data.map(w => <Weather forcast={w} /> ) }
            </View> 
        </View>
       ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scroll: {
    width: "100%",
    height: "35%"
  },
  day: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 5
  },
  container: {
    flexDirection: "row",
    marginLeft: 5,
    marginRight: 15
  }
})
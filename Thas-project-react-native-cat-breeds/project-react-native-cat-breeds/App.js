import React from "react";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-elements";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Card } from "react-native-elements";
import { useEffect, useState } from "react";
const axios = require("axios");

import { Text } from "react-native-elements";
// import * as breeds from "./breeds.json";

const Stack = createStackNavigator();
function HomeScreen({ navigation }) {
  const [breeds, setBreeds] = useState([]);
  useEffect(() => {
    axios.get("https://api.thecatapi.com/v1/breeds").then((response) => {
      console.log("response", response);
      setBreeds(response.data);
    });
  }, []);

  return (
    <SafeAreaView>
      {breeds.map((breed) => {
        if (breed.image) {
          return (
            <Card key={breed.id}>
              <Card.Title>Cat</Card.Title>
              <Card.Divider />
              <Card.Image
                source={{
                  uri: breed.image.url,
                }}
                style={{
                  height: 500,
                }}
              ></Card.Image>
              <Card.Divider />
              <Button
                title="Details"
                onPress={() =>
                  navigation.navigate("Profile", {
                    breed: breed.name,
                    image: breed.image.url,
                    description: breed.description,
                    origin: breed.origin,
                    id: breed.id,
                  })
                }
              />
            </Card>
          );
        }
      })}
    </SafeAreaView>
  );
}

function ProfileScreen({ navigation, route }) {
  const breed = route.params.breed;
  const id = route.params.id;
  const image = route.params.image;
  const description = route.params.description;
  const origin = route.params.origin;
  const [images, setImages] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://api.thecatapi.com/v1/images/search?breed_id=${id}&limit=5 `
      )
      .then((response) => {
        console.log("response", response);
        setImages(response.data);
      });
  }, []);

 

  return (
    <SafeAreaView>
     
            <Card >
              <Card.Title>{breed}</Card.Title>
              <Card.Divider />
              <Card.Image
                source={image}
                style={{ width: 400, height: 300 }}
              ></Card.Image>
              <Text style={{ marginBottom: 10 }}>{description}</Text>
              <Card.Divider />
              <Text>Origin: {origin}</Text>
            </Card>
            {images.map((newImage) => {
        // if(id){
          return (
           <Card>
             <Card.Image
               source={newImage.url}
             ></Card.Image>
           </Card>
          );
          // }
        
      })}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

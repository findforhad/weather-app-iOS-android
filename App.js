import React from "react";
import SearchBox from "./components/SearchBox";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  ActivityIndicator,
  StatusBar
} from "react-native";

import getImageForWeather from "./utils/getImageForWeather";
import { fetchLocationId, fetchWeather } from "./utils/api";

class App extends React.Component {
  state = {
    loading: false,
    error: false,
    location: "",
    temperature: 0,
    weather: ""
  };

  handleUpdateLocation = async newLocation => {
    if (!newLocation) return;
    this.setState({ loading: true }, async () => {
      try {
        const locationID = await fetchLocationId(newLocation);
        const { weather, temperature, location } = await fetchWeather(
          locationID
        );
        console.log(locationID);
        this.setState({
          weather,
          temperature,
          location,
          loading: false,
          error: false
        });
      } catch (e) {
        this.setState({ loading: false, error: true });
      }
    });
  };

  render() {
    const { weather, temperature, location, loading, error } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={getImageForWeather(weather)}
          style={styles.imageContainer}
          imageStyle={styles.image}
          style
        >
          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} color="red" size="large" />
            {!loading && (
              <View>
                {error && (
                  <Text style={[styles.smallText, styles.textStyle]}>
                    City not recognized, Try a different city.
                  </Text>
                )}
                {!error && (
                  <View>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {location}
                    </Text>
                    <Text style={[styles.textStyle, styles.smallText]}>
                      {weather}
                    </Text>
                    <Text style={[styles.textStyle, styles.largeText]}>
                      {`${Math.round(temperature)}°`}
                    </Text>
                  </View>
                )}
              </View>
            )}

            <SearchBox
              placeholder="Search Any City"
              onSubmit={newLocation => this.handleUpdateLocation(newLocation)}
            />
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#303952",
    alignItems: "center",
    justifyContent: "center"
  },
  imageContainer: {
    flex: 1
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 20
  },
  textStyle: {
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "AvenirNext-Regular" : "Roboto",
    color: "white"
  },
  largeText: {
    fontSize: 44
  },
  smallText: {
    fontSize: 18
  },

  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover"
  }
});

export default App;

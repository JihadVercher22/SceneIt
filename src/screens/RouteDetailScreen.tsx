import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { RouteStats } from '../components/RouteStats';
import { fetchWeatherAlerts } from '../services/weatherService';

const RouteDetailsScreen = ({ route }) => {
  const { route } = route.params;
  const [weatherAlerts, setWeatherAlerts] = React.useState([]);

  React.useEffect(() => {
    fetchWeatherAlerts(route.latitude, route.longitude)
      .then(setWeatherAlerts)
      .catch(console.error);
  }, []);

  return (
    <ScrollView>
      <MapView
        style={{ height: 200 }}
        initialRegion={{
          latitude: route.latitude,
          longitude: route.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: route.latitude, longitude: route.longitude }} />
      </MapView>

      <routeStats 
        length={route.length}
        elevation={route.elevation}
        difficulty={route.difficulty}
      />

      {weatherAlerts.map(alert => (
        <WeatherAlert key={alert.id} alert={alert} />
      ))}
    </ScrollView>
  );
};
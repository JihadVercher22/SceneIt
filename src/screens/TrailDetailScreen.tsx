import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { TrailStats } from '../components/TrailStats';
import { fetchWeatherAlerts } from '../services/weatherService';

const TrailDetailsScreen = ({ route }) => {
  const { trail } = route.params;
  const [weatherAlerts, setWeatherAlerts] = React.useState([]);

  React.useEffect(() => {
    fetchWeatherAlerts(trail.latitude, trail.longitude)
      .then(setWeatherAlerts)
      .catch(console.error);
  }, []);

  return (
    <ScrollView>
      <MapView
        style={{ height: 200 }}
        initialRegion={{
          latitude: trail.latitude,
          longitude: trail.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: trail.latitude, longitude: trail.longitude }} />
      </MapView>

      <TrailStats 
        length={trail.length}
        elevation={trail.elevation}
        difficulty={trail.difficulty}
      />

      {weatherAlerts.map(alert => (
        <WeatherAlert key={alert.id} alert={alert} />
      ))}
    </ScrollView>
  );
};
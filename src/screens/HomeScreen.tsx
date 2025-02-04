// Main map interface with bottom sheet

import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import TrailBottomSheet from '../components/TrailBottomSheet';
import { fetchNearbyTrails } from '../services/trailService';

MapboxGL.setAccessToken('YOUR_MAPBOX_ACCESS_TOKEN');

const HomeScreen = () => {
  const [userLocation, setUserLocation] = useState<number[] | null>(null);
  const [trails, setTrails] = useState<any[]>([]);

  useEffect(() => {
    if (userLocation) {
      fetchNearbyTrails(userLocation[1], userLocation[0])
        .then(data => setTrails(data))
        .catch(console.error);
    }
  }, [userLocation]);

  return (
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera
          zoomLevel={12}
          centerCoordinate={userLocation}
          animationMode={'flyTo'}
        />
        
        {trails.map(trail => (
          <MapboxGL.MarkerView
            key={trail.id}
            coordinate={[trail.longitude, trail.latitude]}
          >
            <TrailMarker trail={trail} />
          </MapboxGL.MarkerView>
        ))}
      </MapboxGL.MapView>

      <TrailBottomSheet trails={trails} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 }
});

export default HomeScreen;
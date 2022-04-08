import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';

import Geolocation from 'react-native-geolocation-service';

const Map = () => {
    const { width, height } = Dimensions.get('window');

    const ASPECT_RATIO = width / height;
    const LATITUDE = 37.78825;
    const LONGITUDE = -122.4324;
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const SPACE = 0.01;

    const [currentPosition, setCurrentPosition] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    useEffect(() => {
        Geolocation.getCurrentPosition(position => {
            // alert(JSON.stringify(position))
            const { longitude, latitude } = position.coords
            setCurrentPosition({
                ...currentPosition,
                latitude,
                longitude
            })
        }, error => alert(error.message),
            { timeout: 20000, maximumAge: 1000 }
        )
    })

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region= {currentPosition}
                showsUserLocation
            >
                <Marker
                    onPress={() => alert('marker Hit')}
                    coordinate={{
                        latitude: LATITUDE + SPACE,
                        longitude: LONGITUDE + SPACE,
                    }}
                    title='Test Title'
                    description='This is the test description'
                >
                    <Callout tooltip>
                        <View>
                            <View style={styles.bubble}>
                                <Text style={styles.name}>Favourite Restaurant</Text>
                            </View>
                            <View style={styles.arrowBorder} />
                            <View style={styles.arrow} />
                        </View>
                    </Callout>
                </Marker>
                {/* <Text style={styles.marker}>Marker</Text> */}


            </MapView>
        </View>

    )
}

export default Map
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    marker: {
        marginLeft: 46,
        marginTop: 33,
        fontWeight: 'bold',
    },
    bubble: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 150,
    },
    // Arrow below the bubble
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
        // marginBottom: -15
    },
    // Character name
    name: {
        fontSize: 16,
        marginBottom: 5,
    },
    // Character image
    image: {
        width: "100%",
        height: 80,
    },
});
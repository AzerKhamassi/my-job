import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { Feather } from '@expo/vector-icons';
import profileImage from '../../assets/azer.jpg'
import { AntDesign } from '@expo/vector-icons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import GlobalContext from '../../context/GlobalContext'
const Profile = (props) => {

    const context = React.useContext(GlobalContext)
    const [longitude, setLongitude] = React.useState(10.618040611648018)
    const [latitude, setLatitude] = React.useState(36.843400794030224)
    React.useEffect(() => {
    }, [])

    const getCurrentPositionHandler = () => {
        try {
            (async () => {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    return;

                }
                let location = await Location.getCurrentPositionAsync({});
                if (location) {
                    setLatitude(location.coords.latitude)
                    setLongitude(location.coords.longitude)
                }
            })();
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Settings')}>
                <View style={styles.settings}>
                    <Feather name="settings" size={24} color="black" />
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.imageContainer}>
                <Image source={{ uri: context.user.profileImage }} style={styles.profileImage}></Image>

                <View style={styles.editIcon}>
                    <AntDesign name="camera" size={14} color="white" />
                </View>
            </View>
            <View style={styles.title}>
                <Text style={styles.fullName}>{context.user.name}</Text>
                <Text style={styles.role}>Full Stack Developer</Text>
            </View>
            <View style={styles.section}>
                <Text style={{ fontWeight: 'bold' }}>
                    Description
                </Text>
            </View>
            <View style={styles.description}>
                <Text style={{ color: '#909090' }}>
                    {context.user.description}
                </Text>
            </View>
            <View style={styles.navigationHeader}>
                <View style={{ flex: 1, display: 'flex', justifyContent: 'center', flexDirection: 'row', paddingVertical: 15 }}>
                    <Text>Info</Text>
                </View>
                <View style={{ flex: 1, display: 'flex', justifyContent: 'center', flexDirection: 'row', paddingVertical: 15 }}>
                    <Text>Applied jobs </Text>
                </View>
                <View style={{ flex: 1, display: 'flex', justifyContent: 'center', flexDirection: 'row', paddingVertical: 15 }}>
                    <Text>Skills</Text>
                </View>
            </View>
            <View style={styles.section}>
                <Text style={{ fontWeight: 'bold' }}>
                    Current Location
                </Text>
                <TouchableWithoutFeedback onPress={() => getCurrentPositionHandler()}>
                    <MaterialIcons style={styles.myLocation} name="my-location" size={24} color="black" />
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.section}>
                <View style={styles.mapContainer}>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        region={{
                            latitude: 35.843400794030224,
                            longitude: 10.618040611648018,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                    >
                        <Marker
                            coordinate={{ latitude, longitude }}
                            title={'Current Location'}
                            description={'Hey'}
                        >
                        </Marker>
                    </MapView>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8FA',
        paddingTop: 10,
    },
    settings: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 15,
        justifyContent: 'flex-end'
    },
    profileImage: {
        height: 120,
        width: 120,
        borderRadius: 60
    },
    navigationHeader: {
        backgroundColor: 'white',
        marginHorizontal: 15,
        borderRadius: 15,
        // padding: 10,
        display: 'flex',
        flexDirection: 'row'
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    description: {
        paddingHorizontal: 25,
        marginVertical: 10
    },
    section: {
        paddingHorizontal: 25,
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    fullName: {
        fontSize: 18,
        fontWeight: '700'
    },
    role: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    title: {
        display: 'flex',
        alignItems: 'center'
    },
    editIcon: {
        backgroundColor: '#7CCCF8',
        height: 30,
        width: 30,
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 125,
        bottom: 5,
    },
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    myLocation: {
        marginHorizontal: 10
    }
})

export default Profile

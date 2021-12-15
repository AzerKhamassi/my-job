import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableWithoutFeedback, Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import axios from '../../utlis/axios'
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import OfferCard from '../../components/OfferCard/OfferCard';
import GlobalContext from '../../context/GlobalContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location';
import imgMarker from '../../assets/map-marker.png'
const CompanyProfile = (props) => {
    const context = React.useContext(GlobalContext)

    const updateProfileImageHandler = async () => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.uri)
            const _image = {
                uri: image,
                type: 'image/jpeg',
                name: 'photo.jpg',
            };
            const formData = new FormData();
            formData.append('files', _image);
            axios.post('/upload', formData).then(res => {
                console.log(res.data)
                axios.patch('/user', [{ propName: 'profileImage', value: res.data[0] }]).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            }).catch(err => console.log(err))
        }
    }

    const getCurrentPositionHandler = () => {
        try {
            (async () => {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    return;

                }
                let location = await Location.getCurrentPositionAsync({});
                if (location) {
                    context.updateUserLocation({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
                    })
                }
            })();
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <Pressable>
                    <View style={styles.settings}>
                        <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Business')}>
                            <FontAwesome name="building-o" size={24} color="black" />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => props.navigation.navigate('SettingsCompany')}>
                            <Feather name="settings" size={24} color="black" />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: context.user.profileImage }} style={styles.profileImage}></Image>

                        <View style={styles.editIcon}>
                            <TouchableWithoutFeedback>
                                <AntDesign name="camera" size={14} color="white" onPress={() => updateProfileImageHandler()} />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <View style={styles.title}>
                        <Text style={styles.fullName}>{context.user.name}</Text>
                        <TouchableOpacity>

                        </TouchableOpacity>
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
                    <View style={styles.section}>
                        <Text style={{ fontWeight: 'bold' }}>
                            Categories
                        </Text>
                    </View>
                    <View style={styles.categoriesSection}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                            <Pressable style={{ display: 'flex', flexDirection: 'row' }}>
                                {/* {
                                        categories.map((category, i) => (
                                            <CategoryCard key={i} category={category} />
                                        ))
                                    } */}
                            </Pressable>
                        </ScrollView>
                    </View>
                    <View style={{
                        marginHorizontal: 25, borderTopColor: '#ddd',
                        borderTopWidth: 2, paddingVertical: 5
                    }}>
                        <Text style={{ fontWeight: 'bold' }}>
                            Offers
                        </Text>
                    </View>
                    <View style={styles.offersContainer}>
                        {/* {
                                selectedCategory?.offers?.map(offer => (
                                    <View key={offer?._id} >
                                        <OfferCard
                                            offer={offer}
                                            name={offer?.name}
                                            city={offer?.city}
                                            jobDescription={offer?.jobDescription}
                                            date={offer?.date}
                                            tags={offer?.tags}
                                            offerId={offer?._id}
                                            isSavedOfferFunction={() => context.isSavedOfferHandler(offer._id)}
                                            deleteSavedOfferFunction={() => context.deleteSavedOfferHandler(offer._id)}
                                            saveOfferFunction={() => context.saveOfferHandler(offer._id)}
                                            type={offer.type}
                                            connectedUserId={context.user?._id}
                                            navigation={props.navigation}
                                        />
                                    </View>
                                ))
                            } */}
                    </View>

                    <View style={styles.section}>
                        <Text style={{ fontWeight: 'bold' }}>
                            Current Location
                        </Text>
                        <TouchableWithoutFeedback onPress={() => getCurrentPositionHandler()}>
                            <MaterialIcons style={styles.myLocation} name="my-location" size={24} color="black" />
                        </TouchableWithoutFeedback>
                    </View>
                    <View >
                        <View style={styles.mapContainer}>
                            <MapView
                                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                style={styles.map}
                                region={{
                                    latitude: context.user.position?.latitude || 35.843400794030224,
                                    longitude: context.user.position?.longitude || 10.618040611648018,
                                    latitudeDelta: 0.015,
                                    longitudeDelta: 0.0121,
                                    // latitude: 35.843400794030224,
                                    // longitude: 10.618040611648018,
                                }}

                            >
                                {
                                    context.user.position &&
                                    <Marker
                                        // image={imgMarker}
                                        coordinate={{ latitude: context.user.position?.latitude, longitude: context.user.position?.longitude }}
                                        title={'My position'}
                                        description={'The company location'}
                                    >
                                        <Image
                                            source={imgMarker}
                                            style={{ width: 26, height: 28 }}
                                            resizeMode="contain"
                                        />
                                    </Marker>
                                }
                            </MapView>
                        </View>
                    </View>
                </Pressable>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8FA',
        paddingTop: 5,
        flexDirection: 'row'
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
    },
    section: {
        paddingHorizontal: 25,
        marginVertical: 10,
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
        // ...StyleSheet.absoluteFillObject,
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
    },
    categoriesSection: {
        marginHorizontal: 25,
        marginVertical: 10
    },
    offersContainer: {
        marginHorizontal: 25,

    },
    settings: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 15,
        justifyContent: 'space-between'
    },
})



export default CompanyProfile

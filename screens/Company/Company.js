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
import { SimpleLineIcons } from '@expo/vector-icons';


const Company = (props) => {
    const [longitude, setLongitude] = React.useState(10.618040611648018)
    const [latitude, setLatitude] = React.useState(36.843400794030224)
    const [company, setCompany] = React.useState(null)
    const [categories, setCategories] = React.useState(null)
    const [selectedCategory, setSelectedCategory] = React.useState(null)
    const context = React.useContext(GlobalContext)

    React.useEffect(() => {
        axios.get(`/user/client/${props.route.params.companyId}`)
            .then(res => {
                let _categories = []
                res.data.offers.forEach(offer => {
                    const categoryIndex = _categories.findIndex(category => category._id === offer.category._id)
                    if (categoryIndex === -1) {
                        _categories.push({ ...offer.category, offers: [offer] })
                    } else {
                        _categories[categoryIndex].offers.push(offer)
                    }
                })
                setSelectedCategory(_categories[0])
                setCategories(_categories)
                setCompany(res.data.client)
            }).catch(err => {
                context.errorOccured(err)
            })
    }, [])
    if (company)
        return (
            <View style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <Pressable>

                        <View style={styles.imageContainer}>
                            <Image source={{ uri: company?.profileImage }} style={styles.profileImage}></Image>

                        </View>
                        <View style={styles.title}>
                            <Text style={styles.fullName}>{company?.name}</Text>
                            {
                                context.user._id !== company._id &&
                                <TouchableOpacity
                                    underlayColor='#52BCF6'
                                    style={styles.subscribeButton}

                                >
                                    {
                                        console.log(company.followers.map(follower => follower._id).includes(context.user._id))
                                    }
                                    {
                                        company.followers.map(follower => follower._id).includes(context.user._id)
                                            ?
                                            <TouchableWithoutFeedback onPress={() => context.followClientHandler(company._id)}>
                                                <React.Fragment>
                                                    <SimpleLineIcons name="user-following" size={22} color="white" />
                                                    <Text style={styles.subscribeText}>
                                                        Unsubscribe
                                                    </Text>
                                                </React.Fragment>
                                            </TouchableWithoutFeedback>
                                            :
                                            <TouchableWithoutFeedback onPress={() => context.unfollowClientHandler(company._id)}>
                                                <React.Fragment>
                                                    <SimpleLineIcons name="user-follow" size={22} color="white" />
                                                    <Text style={styles.subscribeText}>
                                                        Subscribe
                                                    </Text>
                                                </React.Fragment>
                                            </TouchableWithoutFeedback>
                                    }
                                </TouchableOpacity>
                            }
                        </View>
                        <View style={styles.section}>
                            <Text style={{ fontWeight: 'bold' }}>
                                Description
                            </Text>
                        </View>

                        <View style={styles.description}>
                            <Text style={{ color: '#909090' }}>
                                {company?.description}
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
                                    {
                                        categories.map((category, i) => (
                                            <CategoryCard key={i} category={category} />
                                        ))
                                    }
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
                            {
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
                            }
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
                    </Pressable>
                </ScrollView>
            </View>
        )
    return null
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8FA',
        paddingTop: 20,
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
        fontWeight: '700',
        marginVertical: 5
    },
    role: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    title: {
        display: 'flex',
        alignItems: 'center'
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
    subscribeButton: {
        backgroundColor: '#52BCF6',
        width: 150,
        display: 'flex',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 30,
        color: 'white',
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    subscribeText: {
        color: 'white',
        marginHorizontal: 5
    }
})



export default Company

import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight, ScrollView } from 'react-native'
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons'
import OfferCard from '../../components/OfferCard/OfferCard';
import axios from '../../utlis/axios'
import GlobalContext from '../../context/GlobalContext'
import { FontAwesome } from '@expo/vector-icons';
const OfferDetails = (props) => {

    const [offer, setOffer] = React.useState(null)
    const [relatedOffers, setRelatedOffers] = React.useState([])
    const context = React.useContext(GlobalContext)
    React.useEffect(() => {
        axios.get(`/offer/${props.route.params.offerId}`)
            .then(res => {
                setOffer(res.data.offer)
                setRelatedOffers(res.data.relatedOffers)
            })
    }, [])

    const addOfferHandler = () => {
        axios.post('/user/saved', { offerId: offer._id })
            .then((res) => {
                context.addUserSavedOffer(offer)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const removeOfferHandler = () => {
        axios.delete(`/user/saved/${offer._id}`, { offerId: offer._id })
            .then((res) => {
                context.removeUserSavedOffer(offer._id)
            })
            .catch(err => {
                console.log(err)
            })
    }
    if (offer)
        return (
            <View style={styles.container}>
                <ScrollView contentInsetAdjustmentBehavior="never" showsVerticalScrollIndicator={false}>
                    <View style={styles.titleSection}>
                        <Text style={styles.offerTitle}>{offer.name}</Text>

                        {context.user && <React.Fragment>
                            {
                                !context.user.savedOffers.map(o => o._id).includes(offer._id) ?
                                    <FontAwesome name="bookmark-o" size={30} color="#52BCF6" onPress={addOfferHandler} />
                                    :
                                    <FontAwesome name="bookmark" size={30} color="#52BCF6" onPress={removeOfferHandler} />
                            }
                        </React.Fragment>}
                    </View>
                    <View>
                        <Text style={styles.companyName}>{offer.owner.name}</Text>
                    </View>
                    <View style={styles.offerHighlights}>
                        <Feather name="map-pin" size={18} color="black" />
                        <Text style={{ color: '#A7A7A7', marginHorizontal: 5 }}>{`${offer.city.country.name} ,${offer.city.name}`}</Text>
                    </View>
                    <View style={styles.navigationHeader}>
                        <View style={{ flex: 1, display: 'flex', justifyContent: 'center', flexDirection: 'row', paddingVertical: 15 }}>
                            <Text>Description</Text>
                        </View>
                        <View style={{ flex: 1, display: 'flex', justifyContent: 'center', flexDirection: 'row', paddingVertical: 15 }}>
                            <Text>About Company</Text>
                        </View>
                        <View style={{ flex: 1, display: 'flex', justifyContent: 'center', flexDirection: 'row', paddingVertical: 15 }}>
                            <Text>Map</Text>
                        </View>
                    </View>
                    <View style={styles.description}>
                        <Text style={{ color: '#909090' }}>
                            {offer.jobDescription}
                        </Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={{ fontWeight: 'bold' }}>
                            Requirements
                        </Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={{ color: '#909090' }}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableHighlight
                            underlayColor='#52BCF6'
                            style={styles.applyButton}
                            onPress={() => { console.log('apply now!') }}>
                            <Text style={styles.buttonText}>Apply now</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.section}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                            Related Offers
                        </Text>
                    </View>
                    {/* <ScrollView contentInsetAdjustmentBehavior="never" style={{ marginTop: 5 }} showsVerticalScrollIndicator={false}> */}
                    <View style={styles.section}>
                        {
                            relatedOffers.map((relatedOffer, i) => (
                                <OfferCard key={i} offer={relatedOffer} navigation={props.navigation} />
                            ))
                        }
                    </View>
                    {/* </ScrollView> */}
                </ScrollView>
            </View>
        )
    return null
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8FA',
        paddingTop: 10,
        paddingHorizontal: 15,
        backgroundColor: '#F8F8FA',

    },
    titleSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    offerTitle: {
        fontSize: 20,
        fontWeight: '700'
    },
    companyName: {
        fontSize: 18,
        fontWeight: '600'
    },
    offerHighlights: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'flex-end'
    },
    navigationHeader: {
        backgroundColor: 'white',
        marginHorizontal: 15,
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row'
    },
    description: {
        paddingHorizontal: 25,
        marginVertical: 10
    },
    section: {
        paddingHorizontal: 20
    },

    applyButton: {
        backgroundColor: '#52BCF6',
        width: 280,
        display: 'flex',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 30,
        color: 'white',
        marginVertical: 10,
    },
    buttonText: {
        color: 'white'
    },
})

export default OfferDetails

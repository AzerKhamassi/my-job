import React from 'react'
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import FormatDate from '../../utlis/FormatDate';
import GlobalContext from '../../context/GlobalContext';
import axios from '../../utlis/axios'
const OfferCard = (props) => {
    const context = React.useContext(GlobalContext)

    const addOfferHandler = () => {
        axios.post('/user/saved', { offerId: props.offer._id })
            .then((res) => {
                context.addUserSavedOffer(props.offer)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const removeOfferHandler = () => {
        console.log('no')
        axios.delete(`/user/saved/${props.offer._id}`, { offerId: props.offer._id })
            .then((res) => {
                context.removeUserSavedOffer(props.offer._id)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <TouchableWithoutFeedback onPress={() => props.navigation.navigate('OfferDetails', { offerId: props.offer?._id })}>
            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <Text style={styles.offerTitle}>{props.offer?.name}</Text>

                    {
                        !context.user.savedOffers.map(o => o._id).includes(props.offer._id) ?
                            <FontAwesome name="bookmark-o" size={20} color="#52BCF6" onPress={addOfferHandler} />
                            :
                            <FontAwesome name="bookmark" size={20} color="#52BCF6" onPress={removeOfferHandler} />

                    }
                </View>
                <View>
                    {props.offer && <Text style={styles.date}>
                        <FormatDate>
                            {props.offer.date}
                        </FormatDate>
                    </Text>}
                </View>
                <View>
                    <Text>{props.offer?.jobDescription}</Text>
                </View>
                <View style={styles.tagsContainer}>
                    {
                        props.tags?.map((tag, index) => (
                            <Text key={index} style={styles.tag}>{tag.name}</Text>
                        ))
                    }
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        shadowColor: 'black',
        marginVertical: 10,
        padding: 20,
        borderRadius: 6,
        elevation: 1
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    offerTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    tagsContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 5,
        justifyContent: 'flex-end'
    },
    tag: {
        backgroundColor: '#E5EAF6',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        marginRight: 10
    },
    date: {
        fontSize: 10
    }
})

export default OfferCard

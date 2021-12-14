import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import OfferCard from './OfferCard/OfferCard'
import axios from '../../../utlis/axios'
import { ScrollView } from 'react-native-gesture-handler'
const Offers = (props) => {

    const [offers, setOffers] = React.useState([])

    React.useEffect(() => {
        axios.get('/user/client/60ff4f144561e30c9c9a7246').then(res => {
            setOffers(res.data.offers)
        })
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior="never"
                showsVerticalScrollIndicator={false}
            >
                <Pressable>

                    {
                        offers.map(offer => (
                            <OfferCard key={offer._id} name={offer.name} description={offer.jobDescription} />
                        ))
                    }
                </Pressable>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8FA',
        paddingVertical: 5,
        // alignItems: 'center',
        paddingHorizontal: 25,
    },
})

export default Offers

import React from 'react'
import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native'
import OfferCard from '../../components/OfferCard/OfferCard';
import GlobalContext from '../../context/GlobalContext'
const SavedOffers = (props) => {
    const context = React.useContext(GlobalContext)
    return (
        <View style={styles.container}>
            <ScrollView contentInsetAdjustmentBehavior="never" showsVerticalScrollIndicator={false}>
                <Pressable>
                    {
                        context.user.savedOffers.map((offer, i) => (
                            <OfferCard key={i} offer={offer} navigation={props.navigation} />
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
        paddingTop: 5,
        paddingHorizontal: 15,
        backgroundColor: '#F8F8FA',
    }
})

export default SavedOffers

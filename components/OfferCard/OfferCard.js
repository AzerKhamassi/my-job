import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const OfferCard = (props) => {
    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <Text>Card Title</Text>
            </View>
        </View>
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
    cardContent: {}
})

export default OfferCard

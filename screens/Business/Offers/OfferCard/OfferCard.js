import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Feather } from '@expo/vector-icons';

const OfferCard = (props) => {
    return (
        <View style={styles.card}>
            <View style={styles.cardTitle} >
                <Text style={styles.offerName}>{props.name}</Text>
                <Feather name="edit" size={24} color="#52BCF6" />
            </View>
            <View>
                <Text>{props.description}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 6,
        marginVertical: 10,
        padding: 10
    },
    cardTitle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    offerName: {
        fontWeight: '500',
        color: '#52BCF6',
        fontSize: 22
    }
})

export default OfferCard

import React from 'react'
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import { Feather } from '@expo/vector-icons';

const OfferCard = (props) => {
    return (
        <TouchableWithoutFeedback onPress={() => props.navigation.navigate('OfferDetails')}>
            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <Text style={styles.offerTitle}>Offer Title</Text>
                    <Feather name="bookmark" size={20} color="#52BCF6" />
                </View>
                <View>
                    <Text style={styles.date}>
                        2 days ago
                    </Text>
                </View>
                <View>
                    <Text>Description</Text>
                </View>
                <View style={styles.tagsContainer}>
                    {
                        [1, 2, 3].map(i => (

                            <Text key={i} style={styles.tag}>React</Text>
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

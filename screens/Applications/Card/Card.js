import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';

const Card = (props) => {
    return (
        <View style={styles.card}>
            <View style={styles.cardTitle}>
                <View style={{ flex: 2 }}>
                    <Text>Someone has applied in your offer</Text>
                    <Text style={styles.date}>2hs</Text>
                </View>
                <View>
                    <FontAwesome5 name="check-circle" size={24} color="green" />
                    <FontAwesome5 name="times-circle" size={24} color="red" />
                </View>
            </View>
            <View style={styles.cardFooter}>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 5,
        marginVertical: 7
    },
    cardTitle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardFooter: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    date: {
        fontSize: 10
    }
})

export default Card

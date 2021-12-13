import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';

const Card = (props) => {
    return (
        <View style={styles.card}>
            <View style={styles.cardTitle}>
                <Text>Someone has applied in your offer {props.name}</Text>
                <Text>2hs</Text>
            </View>

            <View style={styles.cardFooter}>
                <View style={{ marginHorizontal: 5 }}>
                    <FontAwesome5 name="check-circle" size={24} color="green" />
                </View>
                <View>
                    <FontAwesome5 name="times-circle" size={24} color="red" />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginVertical: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cardTitle: {
        flex: 2
    },
    cardFooter: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default Card

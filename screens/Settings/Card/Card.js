import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

const Card = (props) => {
    return (
        <View style={styles.card}>
            <View style={{ marginHorizontal: 10 }}>
                {props.icon}
            </View>
            <View style={{ flex: 5 }}>
                <Text>{props.name}</Text>
            </View>
            <View  >
                <MaterialIcons name="arrow-forward-ios" size={24} color="black" />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center',
        paddingVertical: 10,
        // backgroundColor: 'red'
    }
})

export default Card

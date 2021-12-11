import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'

const AddOffer = (props) => {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder='Name' />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8FA',
        paddingVertical: 5,
        alignItems: 'center'
    },
    input: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginVertical: 10,
        width: 270,
        borderRadius: 25,
        backgroundColor: '#F3F5F9',
        ...Platform.select({
            ios: {
                paddingVertical: 15
            },
            android: {
                paddingVertical: 10

            },
            default: {

            }
        })
    },
})

export default AddOffer

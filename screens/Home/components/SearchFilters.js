import React from 'react'
import { View, StyleSheet, TextInput, Text, TouchableHighlight } from 'react-native'

const SearchFilters = (props) => {
    return (
        <View>
            <View>
                <Text>Keyword</Text>
                <TextInput style={styles.input} placeholder='Keyword' />
            </View>
            <View>
                <Text>Location</Text>
                <TextInput style={styles.input} placeholder='Location' />
            </View>
            <View>
                <TouchableHighlight
                    underlayColor='#52BCF6'
                    style={styles.applyButton}
                    onPress={() => { console.log('apply now!') }}>
                    <Text style={styles.buttonText}>Apply now</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 40,
        paddingVertical: 15,
        marginVertical: 10,
        width: 300,
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
    applyButton: {
        backgroundColor: '#52BCF6',
        width: 280,
        display: 'flex',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 30,
        color: 'white',
        marginVertical: 15,
    },
    buttonText: {
        color: 'white'
    },
})

export default SearchFilters

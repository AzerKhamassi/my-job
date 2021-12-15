import React from 'react'
import { View, StyleSheet, TextInput, Text, TouchableHighlight } from 'react-native'

const SearchFilters = (props) => {
    return (
        <View>
            <View>
                <Text>Keyword</Text>
                <TextInput
                    style={styles.input}
                    value={props.keyword}
                    onChangeText={(text) => props.setKeyword(text)}
                    placeholder='Keyword' />
            </View>
            <View>
                <Text>Location</Text>
                <TextInput
                    style={styles.input}
                    value={props.location}
                    onChangeText={(text) => props.setLocation(text)}
                    placeholder='Location' />
            </View>
            <View>
                <TouchableHighlight
                    underlayColor='#52BCF6'
                    style={styles.applyButton}
                    onPress={() => {
                        props.navigation.navigate(`${props.userRole === 'consultant' ? 'Search' : 'SearchConsultant'}`, { searchLocation: props.location, searchKeyword: props.keyword })
                    }}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 20,
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

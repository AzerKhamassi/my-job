import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Card from './Card/Card'


const Applications = (props) => {
    return (
        <View style={styles.container}>
            <Text>HEYYYY</Text>
            {
                [1, 2, 3, 4, 5, 6].map(i => (
                    <Card key={i} />

                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8FA',
        paddingHorizontal: 15
    }
})


export default Applications

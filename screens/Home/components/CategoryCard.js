import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

const CategoryCard = (props) => {
    return (
        <View style={styles.card}>
            <View style={styles.categoryIcon}>
                <MaterialIcons name="card-giftcard" size={50} color="black" />
            </View>
            <Text style={styles.cardTitle}>Category Name</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    card: {
        height: 100,
        width: 100,
        backgroundColor: 'white',
        borderRadius: 6,
        elevation: 1,
        shadowColor: 'black',
        marginRight: 15,
        borderColor: '#eee',
        borderWidth: 1,
    },
    cardTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    categoryIcon: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 10
    }
})

export default CategoryCard

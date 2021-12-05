import React from 'react'
import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native'
import Constants from 'expo-constants';
import OfferCard from '../../components/OfferCard/OfferCard';

const SavedOffers = (props) => {
    return (
        <View style={styles.container}>
            <ScrollView contentInsetAdjustmentBehavior="never" showsVerticalScrollIndicator={false}>
                <Pressable>
                    {
                        [1, 2, 3, 4, 5, 6].map(i => (
                            <OfferCard key={i} navigation={props.navigation} />
                        ))
                    }
                </Pressable>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8FA',
        paddingTop: 5,
        paddingHorizontal: 15,
        backgroundColor: '#F8F8FA',
    }
})

export default SavedOffers

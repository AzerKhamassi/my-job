import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight, ScrollView } from 'react-native'
import Constants from 'expo-constants';
import { Foundation } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import OfferCard from '../../components/OfferCard/OfferCard';

const OfferDetails = (props) => {

    React.useEffect(() => {

    }, [])
    return (
        <View style={styles.container}>
            <ScrollView contentInsetAdjustmentBehavior="never" showsVerticalScrollIndicator={false}>
                <View style={styles.titleSection}>
                    <Text style={styles.offerTitle}>Full Stack Developer - Javascript</Text>
                    <Foundation name="bookmark" size={30} color="#52BCF6" />
                </View>
                <View>
                    <Text style={styles.companyName}>Next-IT Solutions</Text>
                </View>
                <View style={styles.offerHighlights}>
                    <Feather name="map-pin" size={18} color="black" />
                    <Text style={{ color: '#A7A7A7', marginHorizontal: 5 }}>New York, NY 100003</Text>
                </View>
                <View style={styles.navigationHeader}>
                    <View style={{ flex: 1, display: 'flex', justifyContent: 'center', flexDirection: 'row', paddingVertical: 15 }}>
                        <Text>Description</Text>
                    </View>
                    <View style={{ flex: 1, display: 'flex', justifyContent: 'center', flexDirection: 'row', paddingVertical: 15 }}>
                        <Text>About Company</Text>
                    </View>
                    <View style={{ flex: 1, display: 'flex', justifyContent: 'center', flexDirection: 'row', paddingVertical: 15 }}>
                        <Text>Map</Text>
                    </View>
                </View>
                <View style={styles.description}>
                    <Text style={{ color: '#909090' }}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={{ fontWeight: 'bold' }}>
                        Requirements
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={{ color: '#909090' }}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableHighlight
                        underlayColor='#52BCF6'
                        style={styles.applyButton}
                        onPress={() => { console.log('apply now!') }}>
                        <Text style={styles.buttonText}>Apply now</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.section}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                        Related Offers
                    </Text>
                </View>
                {/* <ScrollView contentInsetAdjustmentBehavior="never" style={{ marginTop: 5 }} showsVerticalScrollIndicator={false}> */}
                <View style={styles.section}>
                    {
                        [1, 2, 3, 4, 5, 6].map(i => (
                            <OfferCard key={i} navigation={props.navigation} />
                        ))
                    }
                </View>
                {/* </ScrollView> */}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8FA',
        paddingTop: 10,
        paddingHorizontal: 15,
        backgroundColor: '#F8F8FA',

    },
    titleSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    offerTitle: {
        fontSize: 20,
        fontWeight: '700'
    },
    companyName: {
        fontSize: 18,
        fontWeight: '600'
    },
    offerHighlights: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'flex-end'
    },
    navigationHeader: {
        backgroundColor: 'white',
        marginHorizontal: 15,
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row'
    },
    description: {
        paddingHorizontal: 25,
        marginVertical: 10
    },
    section: {
        paddingHorizontal: 20
    },

    applyButton: {
        backgroundColor: '#52BCF6',
        width: 280,
        display: 'flex',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 30,
        color: 'white',
        marginVertical: 10,
    },
    buttonText: {
        color: 'white'
    },
})

export default OfferDetails

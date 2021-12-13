import React from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import Card from './Card/Card'
import axios from '../../utlis/axios'
import { ScrollView } from 'react-native-gesture-handler'

const Applications = (props) => {

    const [offers, setOffers] = React.useState([])


    React.useState(() => {
        axios.get('/offer/client').then(res => {
            setOffers(res.data.offers)
            console.log(res.data.offers.length)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior="never"
            // showsVerticalScrollIndicator={false}
            >
                <Pressable>
                    <View>

                        {
                            offers.map(offer => (
                                <Card name={offer.name} key={offer._id} />

                            ))
                        }
                    </View>
                </Pressable>
            </ScrollView>
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

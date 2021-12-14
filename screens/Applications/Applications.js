import React from 'react'
import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native'
import Card from './Card/Card'
import axios from '../../utlis/axios'


const Applications = (props) => {

    const [offers, setOffers] = React.useState([])


    React.useState(() => {
        axios.get('/offer/client').then(res => {
            setOffers(res.data.offers)
            res.data.offers.map(offer => offer.applicants.map(app => console.log(app)))
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const acceptApplicationHandler = (offer, applicant) => {
        console.log(offer._id, applicant.user._id)
        axios.patch(`/offer/${offer._id}/applicant/${applicant.user._id}`, {
            status: 'accepted'
        })
            .then(res => console.log(res))
            .catch(err => console.log(err.response.data.message))
    }

    return (
        <View style={styles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior="never"
                showsVerticalScrollIndicator={false}
            >
                <Pressable>
                    <View>
                        {
                            offers.map(offer => offer.applicants.map(applicant => (
                                <Card
                                    offerName={offer.name}
                                    key={applicant._id}
                                    applicant={`${applicant.user.firstName} ${applicant.user.lastName}`}
                                    date={applicant.date}
                                    showControls={offer.status === 'pending'}
                                    acceptApplicationFunction={() => acceptApplicationHandler(offer, applicant)}
                                />
                            )))
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

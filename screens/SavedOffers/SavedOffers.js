import React from 'react'
import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native'
import OfferCard from '../../components/OfferCard/OfferCard';
import GlobalContext from '../../context/GlobalContext'
const SavedOffers = (props) => {
    const context = React.useContext(GlobalContext)
    return (
        <React.Fragment>
            {
                context.user.savedOffers.length ?
                    <View style={styles.container}>
                        <ScrollView contentInsetAdjustmentBehavior="never" showsVerticalScrollIndicator={false}>
                            <Pressable>
                                {

                                    context.user.savedOffers.map((offer, i) => (
                                        <OfferCard key={i} offer={offer} navigation={props.navigation} />
                                    ))
                                }

                            </Pressable>
                        </ScrollView>
                    </View>
                    :
                    <View style={styles.emptyContainer}>
                        <Text>You don't have any saved offer</Text>
                    </View>
            }
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,
        paddingHorizontal: 15,
        backgroundColor: '#F8F8FA',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    emptyContainer: {
        backgroundColor: 'red',
        flex: 1,
        backgroundColor: '#F8F8FA',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default SavedOffers

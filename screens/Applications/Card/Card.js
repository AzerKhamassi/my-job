import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import FormateDate from '../../../utlis/FormatDate';

const Card = (props) => {
    return (
        <View style={styles.card}>
            <View style={styles.cardTitle}>
                <Text>{props.applicant} has applied in your offer {props.offerName}</Text>
                <Text>
                    <FormateDate>
                        {props.date}
                    </FormateDate>
                </Text>
            </View>
            {
                props.showControls &&
                <View style={styles.cardFooter}>
                    <View style={{ marginHorizontal: 5 }}>
                        <TouchableWithoutFeedback onPress={() => props.acceptApplicationFunction()}>
                            <FontAwesome5 name="check-circle" size={24} color="green" />
                        </TouchableWithoutFeedback>
                    </View>
                    <View>
                        <TouchableWithoutFeedback onPress={() => props.rejectApplicationFunction()}>
                            <FontAwesome5 name="times-circle" size={24} color="red" />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginVertical: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cardTitle: {
        flex: 2
    },
    cardFooter: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default Card

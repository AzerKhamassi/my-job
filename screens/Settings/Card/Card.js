import React from 'react'
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

const Card = (props) => {
    return (
        <React.Fragment>
            {
                props.route ?
                    <TouchableWithoutFeedback onPress={() => props.navigation.navigate(props.route)}>
                        <View style={styles.card}>
                            <View style={{ marginHorizontal: 10 }}>
                                {props.icon}
                            </View>
                            <View style={{ flex: 5 }}>
                                <Text>{props.name}</Text>
                            </View>
                            <View  >
                                <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    :
                    <View style={styles.card}>
                        <View style={{ marginHorizontal: 10 }}>
                            {props.icon}
                        </View>
                        <View style={{ flex: 5 }}>
                            <Text>{props.name}</Text>
                        </View>
                        <View  >
                            <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
                        </View>
                    </View>

            }
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center',
        paddingVertical: 10,
        // backgroundColor: 'red'
    },

})

export default Card

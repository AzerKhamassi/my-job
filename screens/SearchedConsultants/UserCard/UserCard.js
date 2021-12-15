import React from 'react'
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'

const UserCard = (props) => {
    return (
        <TouchableWithoutFeedback onPress={() => props.navigation.navigate('ProfileConsultant', { consultantId: props.user._id })}>

            <View style={styles.card}>
                <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: 5 }}>
                    <View>
                        <Image style={styles.profileImage} source={{ uri: props.user.profileImage }}></Image>
                    </View>
                    <View style={{ marginHorizontal: 10 }}>
                        <Text>{`${props.user.firstName} ${props.user.lastName}`}</Text>
                    </View>
                </View>
                <View style={styles.tagsContainer}>
                    {
                        props.user.skills.map((skill) => (
                            <Text key={skill._id} style={styles.tag}>{skill.name}</Text>
                        ))
                    }
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 15,
        borderRadius: 15,

    },
    profileImage: {
        height: 40,
        width: 40,
        borderRadius: 20
    },
    tagsContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 5,
    },
    tag: {
        backgroundColor: '#E5EAF6',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        marginRight: 10
    },
})

export default UserCard

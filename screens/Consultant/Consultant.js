import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableWithoutFeedback, useWindowDimensions, Pressable } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import GlobalContext from '../../context/GlobalContext'
import axios from '../../utlis/axios';
import * as ImagePicker from 'expo-image-picker'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';






const Consultant = (props) => {

    const context = React.useContext(GlobalContext)
    const [consultant, setConsultant] = React.useState(null)



    React.useEffect(() => {
        console.log(props.route.params.consultantId)
        axios.get(`/user/consultant/${props.route.params.consultantId}`)
            .then(res => {
                setConsultant(res.data.user)
            })
    }, [])


    if (consultant)
        return (
            <View style={styles.container}>

                <View style={styles.imageContainer}>
                    <Image source={{ uri: consultant?.profileImage }} style={styles.profileImage}></Image>

                </View>
                <View style={styles.title}>
                    <Text style={styles.fullName}>{`${consultant.firstName} ${consultant.lastName}`}</Text>
                    <Text style={styles.role}>Full Stack Developer</Text>
                </View>
                <React.Fragment>
                    <View style={styles.section}>
                        <Text style={{ fontWeight: 'bold' }}>
                            Description
                        </Text>
                    </View>
                    <View style={styles.description}>
                        <Text style={{ color: '#909090' }}>
                            {context.user.description}
                        </Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={{ fontWeight: 'bold' }}>
                            Address
                        </Text>

                    </View>
                    <View style={styles.description}>
                        <Text>
                            {consultant.address}
                        </Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={{ fontWeight: 'bold' }}>
                            Phone
                        </Text>

                    </View>
                    <View style={styles.description}>
                        <Text>
                            {consultant.phone}
                        </Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={{ fontWeight: 'bold' }}>
                            Skills
                        </Text>

                    </View>
                    <View style={styles.description}>
                        <View>
                            {
                                consultant.skills.map(skill => (
                                    <Text key={skill._id} style={styles.tag}>{skill.name}</Text>
                                ))
                            }
                        </View>
                    </View>
                </React.Fragment>


            </View>
        )
    return null
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8FA',
        paddingTop: 10,
    },
    settings: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 15,
        justifyContent: 'flex-end'
    },
    profileImage: {
        height: 120,
        width: 120,
        borderRadius: 60
    },
    navigationHeader: {
        backgroundColor: 'white',
        marginHorizontal: 15,
        borderRadius: 15,
        // padding: 10,
        display: 'flex',
        flexDirection: 'row'
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    description: {
        paddingHorizontal: 25,
        marginVertical: 10
    },
    section: {
        paddingHorizontal: 25,
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    fullName: {
        fontSize: 18,
        fontWeight: '700'
    },
    role: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        marginVertical: 10
    },
    editIcon: {
        backgroundColor: '#7CCCF8',
        height: 30,
        width: 30,
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 125,
        bottom: 5,
    },
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    myLocation: {
        marginHorizontal: 10
    },
    tagsContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 5,
        justifyContent: 'flex-end'
    },
    tag: {
        backgroundColor: '#E5EAF6',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        marginRight: 10
    },
})

export default Consultant

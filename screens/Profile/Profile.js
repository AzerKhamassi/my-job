import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableWithoutFeedback, useWindowDimensions, Pressable } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import GlobalContext from '../../context/GlobalContext'
import * as ImagePicker from 'expo-image-picker'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';


const FirstRoute = () => {
    const context = React.useContext(GlobalContext)
    return (
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
                    {context.user.address}
                </Text>
            </View>
            <View style={styles.section}>
                <Text style={{ fontWeight: 'bold' }}>
                    Phone
                </Text>

            </View>
            <View style={styles.description}>
                <Text>
                    {context.user.phone}
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
                        context.user.skills.map(skill => (
                            <Text key={skill._id} style={styles.tag}>{skill.name}</Text>
                        ))
                    }
                </View>
            </View>
        </React.Fragment>
    )
}
const SecondRoute = () => {
    const context = React.useContext(GlobalContext)

    return (
        <View style={{ padding: 10 }}>
            <ScrollView
                contentInsetAdjustmentBehavior="never"
                showsVerticalScrollIndicator={false}
            >
                <Pressable>

                    {
                        context.user.appliedOffers.map((offer, i) => (
                            <View key={offer._id} style={{ backgroundColor: 'white', marginVertical: 5, padding: 10, borderRadius: 5 }}>
                                <Text>{offer.name}</Text>
                            </View>
                        ))
                    }
                </Pressable>
            </ScrollView>
        </View>
    )
}

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});


const Profile = (props) => {

    const context = React.useContext(GlobalContext)
    const [image, setImage] = React.useState(null);
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Info' },
        { key: 'second', title: 'Applied Offers' },
    ]);


    React.useEffect(() => {
        // console.log(context.user.appliedJobs)
    }, [])


    const updateProfileImageHandler = async () => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.uri)
            const _image = {
                uri: image,
                type: 'image/jpeg',
                name: 'photo.jpg',
            };
            const formData = new FormData();
            formData.append('files', _image);
            axios.post('/upload', formData).then(res => {
                console.log(res.data)
                axios.patch('/user', [{ propName: 'profileImage', value: res.data[0] }]).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            }).catch(err => console.log(err))
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.settings}>
                <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Settings')}>
                    <Feather name="settings" size={24} color="black" />
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.imageContainer}>
                <Image source={{ uri: context.user.profileImage }} style={styles.profileImage}></Image>

                <View style={styles.editIcon}>
                    <TouchableWithoutFeedback onPress={() => updateProfileImageHandler()}>
                        <AntDesign name="camera" size={14} color="white" />
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <View style={styles.title}>
                <Text style={styles.fullName}>{`${context.user.firstName} ${context.user.lastName}`}</Text>
                <Text style={styles.role}>Full Stack Developer</Text>
            </View>

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}

                initialLayout={{ width: layout.width }}
                renderTabBar={(props) => (
                    <TabBar
                        {...props}
                        style={{ backgroundColor: 'white' }}
                        indicatorStyle={{ backgroundColor: 'black' }}
                        renderLabel={({ route, focused, color }) => (
                            <Text style={{ color: 'black', margin: 8 }}>
                                {route.title}
                            </Text>
                        )}
                    />
                )}


            />


        </View>
    )
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

export default Profile

import React from 'react'
import {
    Image,
    View,
    SafeAreaView,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableHighlight,
    Text,
    ScrollView,
    Platform,
    Pressable,

} from 'react-native'
import { EvilIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import profileImage from '../../assets/azer.jpg'
import { Feather } from '@expo/vector-icons';
import OfferCard from '../../components/OfferCard/OfferCard'
import Constants from 'expo-constants';
import CategoryCard from './components/CategoryCard';


const Home = (props) => {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <ScrollView contentInsetAdjustmentBehavior="never">
                    <Pressable>
                        <View style={styles.headerSection}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                                <Feather name="home" size={24} color="black" />
                                <Text style={{ fontWeight: 'bold', fontSize: 18, marginHorizontal: 10 }}>Home</Text>
                            </View>
                            <TouchableWithoutFeedback onPress={() => props.navigation.navigate('profile')}>
                                <Image source={profileImage} style={styles.profileImage}></Image>
                            </TouchableWithoutFeedback>
                        </View >
                        <View style={styles.searchSection}>
                            <View>
                                <EvilIcons style={styles.searchIcon} name="search" size={24} color="black" />
                                <TextInput style={styles.input} placeholder='Search...' />

                            </View>
                            <View>
                                <TouchableHighlight
                                    underlayColor='#52BCF6'
                                    style={styles.searchButton}>
                                    <Octicons name="settings" size={24} color="white" />
                                </TouchableHighlight>
                            </View>
                        </View>
                        <View style={styles.sectionTitle}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Recommended</Text>
                            <Text style={{ fontSize: 10 }}>View All</Text>
                        </View>
                        <View style={styles.offersSection}>
                            {
                                [1, 2].map(i => (
                                    <OfferCard key={i} navigation={props.navigation} />
                                ))
                            }
                        </View>
                        <View style={styles.sectionTitle}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Recently posted</Text>
                            <Text style={{ fontSize: 10 }}>View All</Text>
                        </View>
                        {/* <View style={styles.offersSection}>
                            {
                                [1, 2, 3].map(i => (
                                    <OfferCard key={i} />

                                ))
                            }
                        </View> */}
                        <View style={styles.sectionTitle}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Browse categories</Text>
                            <Text style={{ fontSize: 10 }}>View All</Text>
                        </View>
                        <View style={styles.categoriesSection}>
                            <ScrollView horizontal={true} >
                                <Pressable style={{ display: 'flex', flexDirection: 'row' }}>

                                    {
                                        [1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                                            <CategoryCard key={i} />

                                        ))
                                    }
                                </Pressable>
                            </ScrollView>
                        </View>
                    </Pressable>
                </ScrollView >
            </View>
        </TouchableWithoutFeedback >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8FA',
        paddingTop: Constants.statusBarHeight,
    },

    headerSection: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 30
    },

    searchSection: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    input: {
        paddingHorizontal: 40,
        paddingVertical: 15,
        marginVertical: 10,
        width: 270,
        borderRadius: 25,
        backgroundColor: '#F3F5F9',
        ...Platform.select({
            ios: {
                paddingVertical: 15
            },
            android: {
                paddingVertical: 10

            },
            default: {

            }
        })
    },
    searchIcon: {
        position: 'absolute',
        left: 10,
        top: 25,
        zIndex: 999
    },
    searchButton: {
        backgroundColor: '#52BCF6',
        width: 50,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 12,
        color: 'white',
        marginHorizontal: 10,
        justifyContent: 'center'
    },
    profileImage: {
        height: 50,
        width: 50,
        borderRadius: 50,
        ...Platform.select({
            ios: {
                marginLeft: 175
            },
            android: {

            },
            default: {

            }
        })
    },
    sectionTitle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 30,
        alignItems: 'flex-end'
    },
    offersSection: {
        marginHorizontal: 30,
    },
    categoriesSection: {
        marginHorizontal: 30,
    }
});
export default Home

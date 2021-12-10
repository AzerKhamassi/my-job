import React from 'react'
import {
    View,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableHighlight,
    Text,
    ScrollView,
    Platform,
    Pressable,
    Dimensions,

} from 'react-native'
import { EvilIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import OfferCard from '../../components/OfferCard/OfferCard'
import CategoryCard from './components/CategoryCard';
import { CommonActions } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
import SearchFilters from './components/SearchFilters';
import GlobalContext from '../../context/GlobalContext'
import axios from '../../utlis/axios';

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const Home = (props) => {
    const refRBSheet = React.useRef();

    var offset = 0;
    const onScrollHandler = (e) => {
        const currentOffset = e.nativeEvent.contentOffset.y;
        var direction = currentOffset > offset ? "down" : "up";
        offset = currentOffset;
        if (direction === "down") {
            props.navigation.dispatch(
                CommonActions.setParams({
                    tabBarVisible: false,
                })
            );
        } else {
            props.navigation.dispatch(
                CommonActions.setParams({
                    tabBarVisible: true,
                })
            );
        }
    }

    const [offers, setOffers] = React.useState(null)
    const context = React.useContext(GlobalContext)
    React.useEffect(() => {
        axios.get('/offer')
            .then(res => {
                setOffers(res.data.offers)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <ScrollView
                    contentInsetAdjustmentBehavior="never"
                    showsVerticalScrollIndicator={false}
                    onScroll={(e) => onScrollHandler(e)}
                    scrollEventThrottle={10}
                >
                    <Pressable>
                        <View style={styles.searchSection}>
                            <View>
                                <EvilIcons style={styles.searchIcon} name="search" size={24} color="black" />
                                <TextInput style={styles.input} placeholder='Search...' />

                            </View>
                            <View>
                                <TouchableHighlight
                                    onPress={() => refRBSheet.current.open()}
                                    underlayColor='#52BCF6'
                                    style={styles.searchButton}>
                                    <Octicons name="settings" size={24} color="white" />
                                </TouchableHighlight>
                                <RBSheet
                                    ref={refRBSheet}
                                    closeOnDragDown={true}
                                    closeOnPressMask={true}
                                    customStyles={{
                                        wrapper: {
                                            backgroundColor: "rgba(0, 0, 0, 0.5)"
                                        },
                                        draggableIcon: {
                                            backgroundColor: "#000"
                                        },
                                        container: {
                                            borderTopRightRadius: 20,
                                            borderTopLeftRadius: 20,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            paddingBottom: 8
                                        }
                                    }}
                                >
                                    <SearchFilters />
                                </RBSheet>
                            </View>
                        </View>
                        <View style={styles.sectionTitle}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Recommended</Text>
                            <Text style={{ fontSize: 10 }}>View All</Text>
                        </View>
                        <View style={styles.offersSection}>
                            {
                                [].map(i => (
                                    <OfferCard key={i} navigation={props.navigation} />
                                ))
                            }
                        </View>
                        <View style={styles.sectionTitle}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Recently posted</Text>
                            <Text style={{ fontSize: 10 }}>View All</Text>
                        </View>
                        <View style={styles.offersSection}>
                            {
                                offers?.map((offer, i) => (
                                    <OfferCard key={i} offer={offer} navigation={props.navigation} />

                                ))
                            }
                        </View>
                        <View style={styles.sectionTitle}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Browse categories</Text>
                            <Text style={{ fontSize: 10 }}>View All</Text>
                        </View>
                        <View style={styles.categoriesSection}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <Pressable style={{ display: 'flex', flexDirection: 'row' }}>

                                    {
                                        context.user?.domain?.categories.map((category, i) => (
                                            <CategoryCard key={i} category={category} />

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
        paddingVertical: 5,
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
                marginLeft: 180
            },
            default: {

            }
        })
    },
    sectionTitle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingVertical: 5,
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

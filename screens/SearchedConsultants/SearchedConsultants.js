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
import OfferCard from '../../components/OfferCard/OfferCard'
import GlobalContext from '../../context/GlobalContext'
import axios from '../../utlis/axios'
import UserCard from './UserCard/UserCard'

const SearchedConsultant = (props) => {
    const context = React.useContext(GlobalContext)
    const [users, setUsers] = React.useState([])
    const time = React.useRef(null)
    const [searchTerm, setSearchTerm] = React.useState('')
    const [location, setLocation] = React.useState('')
    React.useEffect(() => {
        console.log(props.route.params)
    }, [])
    React.useEffect(() => {
        if (time.current) {
            clearInterval(time.current)
        }
        if (props.route.params.searchKeyword && props.route.params.searchLocation) {
            setSearchTerm(props.route.params.searchKeyword)
            setLocation(props.route.params.searchLocation)
            time.current = setTimeout(() => {
                axios.get(`/user/search?searchTerm=${props.route.params.searchKeyword}&location=${props.route.params.searchLocation}`)
                    .then(res => {
                        setUsers(res.data.users)
                        console.log(res)
                    }).catch(err => {
                        console.log(err)
                    })

            }, 500);
        }
        else {
            if (props.route.params.searchLocation) {
                setLocation(props.route.params.searchLocation)
                time.current = setTimeout(() => {
                    axios.get(`/user/search?location=${props.route.params.searchLocation}`).then(res => {
                        setUsers(res.data.users)
                        console.log(res)
                    }).catch(err => {
                        console.log(err)
                    })

                }, 500);
            }
            else {
                setLocation('')
            }
            if (props.route.params.searchKeyword) {
                setSearchTerm(props.route.params.searchKeyword)
                time.current = setTimeout(() => {
                    axios.get(`/user/search?searchTerm=${props.route.params.searchKeyword}`).then(res => {
                        setUsers(res.data.users)
                        console.log(res)
                    }).catch(err => {
                        console.log(err)
                    })
                }, 500);
            }
            else {
                setSearchTerm('')
            }
        }

    }, [props.route.params])

    return (
        <View style={styles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior="never"
                showsVerticalScrollIndicator={false}
            >
                <Pressable>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input} value={searchTerm}
                            onChangeText={(text) => setSearchTerm(text)} placeholder='Keyword'></TextInput>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input}
                            placeholder='Location'
                            value={location}
                            onChangeText={(text) => setLocation(text)}
                        ></TextInput>
                    </View>
                    {users.map((user, index) => (
                        <UserCard key={user._id} user={user} navigation={props.navigation} />
                    ))}
                </Pressable>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8FA',
        paddingHorizontal: 15,

    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    input: {
        padding: 12,
        marginVertical: 10,
        width: 280,
        borderRadius: 25,
        backgroundColor: 'white'
    },
})

export default SearchedConsultant

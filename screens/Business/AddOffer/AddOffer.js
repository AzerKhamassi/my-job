import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    Pressable,
    TouchableHighlight,
    ToastAndroid,
    Platform,
    AlertIOS,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import axios from '../../../utlis/axios';
import GlobalContext from '../../../context/GlobalContext';
import AwesomeAlert from 'react-native-awesome-alerts';


const AddOffer = (props) => {

    const context = React.useContext(GlobalContext)
    const [tags, setTags] = React.useState([])
    const [tag, setTag] = React.useState('')
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [type, setType] = React.useState('')
    const [duration, setDuration] = React.useState({ from: '', to: '', unity: 'month' })
    const [showAlert, setShowAlert] = React.useState(false)

    const addOfferHandler = () => {
        axios.post('/offer', {
            offer: {
                name,
                city: "60fb58630065601907b50e3a",
                type,
                duration,
                jobDescription: description,
                tags,
                category: "60ff3caad6811028348896e1",
                owner: context.user._id
            }
        }).then(res => {
            setShowAlert(true)
            setTags([])
            setName('')
            setDuration({ from: '', to: '', unity: 'month' })
            setType('')
            setDescription('')
            console.log(res.data)
        }).catch(err => console.log(err))
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <ScrollView
                    contentInsetAdjustmentBehavior="never"
                    showsVerticalScrollIndicator={false}>
                    <Pressable>
                        <View style={{ display: 'flex', }}>
                            <TextInput
                                style={styles.input}
                                placeholder='Name'
                                value={name}
                                onChangeText={(text) => setName(text)} />
                            <TextInput
                                style={styles.inputDescription}
                                multiline={true}
                                numberOfLines={5}
                                value={description}
                                onChangeText={(text) => setDescription(text)}
                                placeholder='Description' />
                            <TextInput
                                style={styles.input}
                                value={type}
                                onChangeText={(text) => setType(text)}
                                placeholder='Type Internship-CDI...' />
                        </View>
                        <View style={{ paddingHorizontal: 10 }}>
                            <Text>Duration</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TextInput
                                    style={styles.inputDuration}
                                    keyboardType='numeric'
                                    placeholder='From'
                                    onChangeText={(text) => setDuration({ ...duration, from: text })}
                                    value={duration.from} />
                                <TextInput
                                    style={styles.inputDuration}
                                    keyboardType='numeric'
                                    placeholder='To'
                                    onChangeText={(text) => setDuration({ ...duration, to: text })}
                                    value={duration.to} />
                            </View>
                            <View >
                                <Text style={{ marginVertical: 10 }}>City</Text>
                                <RNPickerSelect
                                    style={{ viewContainer: { backgroundColor: '#F3F5F9', borderRadius: 20 } }}
                                    onValueChange={(value) => console.log(value)}
                                    items={[
                                        { label: 'Football', value: 'football' },
                                        { label: 'Baseball', value: 'baseball' },
                                        { label: 'Hockey', value: 'hockey' },
                                    ]}
                                />
                            </View>
                            <View>
                                <Text style={{ marginVertical: 10 }}>Category</Text>
                                <RNPickerSelect
                                    style={{ viewContainer: { backgroundColor: '#F3F5F9', borderRadius: 20 } }}
                                    onValueChange={(value) => console.log(value)}
                                    items={[
                                        { label: 'Football', value: 'football' },
                                        { label: 'Baseball', value: 'baseball' },
                                        { label: 'Hockey', value: 'hockey' },
                                    ]}
                                />
                            </View>
                            <View style={{ marginVertical: 5, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput style={styles.inputTag} placeholder='Tag' value={tag} onChangeText={(text) => setTag(text)} />
                                <TouchableHighlight
                                    onPress={() => {
                                        setTags([...tags, { name: tag }])
                                        setTag('')
                                    }}
                                    underlayColor='#52BCF6'
                                    style={styles.addButton}>
                                    <Ionicons name="add-circle-outline" size={24} color="white" />
                                </TouchableHighlight>
                            </View>
                            <View style={styles.tagsContainer}>

                                {
                                    tags.map((tag, i) => (
                                        <Text style={styles.tag} key={i}>{tag.name}</Text>
                                    ))
                                }
                            </View>
                        </View>
                        <View style={{ display: 'flex', alignItems: 'center' }}>

                            <TouchableHighlight
                                underlayColor='#52BCF6'
                                style={styles.applyButton}
                                onPress={() => { addOfferHandler() }}>
                                <Text style={styles.buttonText}>Add Offer</Text>
                            </TouchableHighlight>
                            <AwesomeAlert
                                show={showAlert}
                                showProgress={false}
                                title="Done"
                                message="Offer added successfully!"
                                closeOnTouchOutside={true}
                                closeOnHardwareBackPress={false}
                                cancelText="No, cancel"
                                confirmButtonColor="#DD6B55"
                                onDismiss={() => setShowAlert(false)}
                                onCancelPressed={() => {
                                    setShowAlert(false);
                                }}
                                onConfirmPressed={() => {
                                    setShowAlert(false);
                                }}
                            />
                        </View>
                    </Pressable>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#F8F8FA',
        backgroundColor: 'red',
        paddingVertical: 5,
        alignItems: 'center',
        // paddingHorizontal: 25
    },
    input: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginVertical: 10,
        width: 300,
        borderRadius: 25,
        backgroundColor: '#F3F5F9',

    },
    inputDescription: {
        paddingHorizontal: 20,
        marginVertical: 10,
        width: 300,
        borderRadius: 25,
        backgroundColor: '#F3F5F9',
        ...Platform.select({
            ios: {
                paddingVertical: 15
            },
            android: {

            },
            default: {

            }
        })

    },
    inputDuration: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginVertical: 10,
        width: 80,
        borderRadius: 25,
        backgroundColor: '#F3F5F9',

    },
    inputTag: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginVertical: 10,
        width: 240,
        borderRadius: 25,
        backgroundColor: '#F3F5F9',
    },
    addButton: {
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
    applyButton: {
        backgroundColor: '#52BCF6',
        width: 280,
        display: 'flex',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 30,
        color: 'white',
        marginVertical: 10,
    },
    buttonText: {
        color: 'white'
    },
    tagsContainer: {
        display: 'flex',
        // flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'flex-start'
    },
    tag: {
        backgroundColor: '#E5EAF6',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        marginBottom: 5
    },
})

export default AddOffer

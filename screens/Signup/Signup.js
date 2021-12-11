import React from 'react'
import {
    View,
    StyleSheet,
    Image,
    TextInput,
    Text,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Keyboard,
    Pressable,
    SafeAreaView,
    Platform,
    StatusBar
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
const logo = require("../../assets/my-job.png");
import ToggleSwitch from 'toggle-switch-react-native'
import { Ionicons } from '@expo/vector-icons';
import axios from '../../utlis/axios';
import profileImage from '../../assets/azer.jpg'
import { AntDesign } from '@expo/vector-icons';


const Signup = () => {
    const [toggle, setToggle] = React.useState(false)
    const [tags, setTags] = React.useState([])
    const [tag, setTag] = React.useState('')
    const [fullName, setFullName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [repassword, setRepassword] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [address, setAddress] = React.useState('')
    const [errMessage, setErrMessage] = React.useState(false)


    const registerHandler = () => {
        if (password.trim() === repassword.trim()) {
            axios.post('/user', {
                name: fullName,
                description,
                role: toggle ? 'consultant' : 'client',
                password,
                phone,
                email,
                address,
                city: '60fb58640065601907b5110c',
                domain: '60ff4e88c295452d940be7cd',
                profileImage: 'https://smart-interact-bucket.s3.ca-central-1.amazonaws.com/1627165861830'
            }).then(res => {
                setAddress('')
                setDescription('')
                setEmail('')
                setFullName('')
                setPassword('')
                setRepassword('')
                setPhone('')
                setTags([])
            }).catch(err => console.log(err))
        }
        else
            setErrMessage(true)
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
            <SafeAreaView style={styles.container} >
                <ScrollView
                    contentInsetAdjustmentBehavior="never"
                    showsVerticalScrollIndicator={false}
                >
                    <Pressable>
                        <View style={styles.logoContainer}>
                            <Image source={logo} style={styles.imageBackground}></Image>
                        </View>
                        <View>
                            <View style={styles.imageContainer}>
                                <Image source={profileImage} style={styles.profileImage}></Image>

                                <View style={styles.editIcon}>
                                    <AntDesign name="camera" size={14} color="white" />
                                </View>
                            </View>
                            <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                <Text>Company</Text>
                                <ToggleSwitch
                                    isOn={toggle}
                                    onColor="#52BCF6"
                                    offColor="#F6931E"
                                    labelStyle={{ color: "black", fontWeight: "900" }}
                                    size="large"
                                    onToggle={isOn => setToggle(isOn)}
                                />
                                <Text>Consultant</Text>
                            </View>
                            <TextInput
                                placeholder='Full Name' value={fullName}
                                onChangeText={(text) => setFullName(text)} style={styles.input} />
                            <TextInput placeholder='Email' value={email}
                                onChangeText={(text) => setEmail(text)} style={styles.input} />
                            <TextInput placeholder='Phone' value={phone}
                                keyboardType='numeric' onChangeText={(text) => setPhone(text)}
                                style={styles.input} />
                            <TextInput placeholder='Password' value={password}
                                onChangeText={(text) => setPassword(text)}
                                secureTextEntry={true} style={styles.input} />
                            <TextInput placeholder='Retype password' value={repassword}
                                onChangeText={(text) => setRepassword(text)} secureTextEntry={true} style={styles.input} />
                            <TextInput placeholder='Address' value={address}
                                onChangeText={(text) => setAddress(text)} style={styles.input} />
                            <TextInput placeholder='Description' value={description}
                                multiline={true} onChangeText={(text) => setDescription(text)}
                                numberOfLines={5} style={styles.inputDescription} />
                        </View>
                        {
                            toggle &&
                            <View>
                                <View style={{ marginVertical: 5, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <TextInput style={styles.inputTag} placeholder='Skill' value={tag} onChangeText={(text) => setTag(text)} />
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
                        }
                        <View>
                            <TouchableHighlight
                                underlayColor='#52BCF6'
                                style={{ ...styles.signupButton, backgroundColor: toggle ? '#52BCF6' : '#F6931E', }}
                                onPress={() => registerHandler()}>
                                <Text style={styles.buttonText}>Sign up</Text>
                            </TouchableHighlight>
                        </View>
                    </Pressable>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8FA',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0

    },
    logoContainer: {
        height: 150,
        width: 280,
        marginVertical: 10
    },
    imageBackground: {
        flex: 1,
        resizeMode: "cover",
        width: 280,
        alignItems: "center",
        justifyContent: 'center',
    },
    input: {
        padding: 12,
        marginVertical: 10,
        width: 280,
        borderRadius: 25,
        backgroundColor: 'white'
    },
    inputDescription: {
        paddingHorizontal: 12,
        marginVertical: 10,
        width: 280,
        borderRadius: 25,
        backgroundColor: 'white'
    },
    forgotPaswword: {
        width: 280,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    signupButton: {
        width: 280,
        display: 'flex',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 30,
        color: 'white',
        marginVertical: 25
    },
    buttonText: {
        color: 'white'
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
    inputTag: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginVertical: 10,
        width: 210,
        borderRadius: 25,
        backgroundColor: '#F3F5F9',
    },
    profileImage: {
        height: 120,
        width: 120,
        borderRadius: 60
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 25
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
        right: 80,
        bottom: 5,
    },
});

export default Signup

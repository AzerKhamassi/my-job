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
    StatusBar,
    KeyboardAvoidingView,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
const logo = require("../../assets/my-job.png");
import ToggleSwitch from 'toggle-switch-react-native'
import { Ionicons } from '@expo/vector-icons';
import axios from '../../utlis/axios';
import profileImage from '../../assets/user.png'
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'


const Signup = (props) => {
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
    const [image, setImage] = React.useState(null);
    const [countries, setCountries] = React.useState([])
    const [selectedCountry, setSelectedCountry] = React.useState(null)
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')

    React.useEffect(() => {
        axios
            .get('/location/country')
            .then((res) => {
                // console.log(res.data.countries)
                setCountries(res.data.countries);
            })
            .catch((err) => {
                console.log(err);
            });
        // axios
        //     .get('/domain')
        //     .then((res) => {
        //         console.log(res)
        //         // setDomainsData(res.data.domains);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    }, []);
    React.useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const registerHandler = () => {
        console.log(image)
        const _image = {
            uri: image,
            type: 'image/jpeg',
            name: 'photo.jpg',
        };
        const formData = new FormData();
        formData.append('files', _image);
        // console.log(formData)
        axios.post('/upload', formData).then(res => {
            console.log(res.data)
            // if (password.trim() === repassword.trim()) {
            //     axios.post('/user', {
            //         name: fullName,
            //         description,
            //         role: toggle ? 'consultant' : 'client',
            //         password,
            //         phone,
            //         email,
            //         address,
            //         city: '60fb58640065601907b5110c',
            //         domain: '60ff4e88c295452d940be7cd',
            //         profileImage: res.data[0]
            //     }).then(res => {
            //         setAddress('')
            //         setDescription('')
            //         setEmail('')
            //         setFullName('')
            //         setPassword('')
            //         setRepassword('')
            //         setPhone('')
            //         setTags([])
            //     }).catch(err => console.log(err))
            // }
            // else
            //     setErrMessage(true)
        }).catch(err => console.log(err))

    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'position' : ''}>
                <SafeAreaView  >
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
                                    <Image source={image ? { uri: image } : profileImage} style={styles.profileImage}></Image>

                                    <View style={{ ...styles.editIcon, backgroundColor: toggle ? '#F6931E' : '#52BCF6' }}>
                                        <TouchableWithoutFeedback onPress={pickImage}>
                                            <AntDesign name="camera" size={14} color="white" />
                                        </TouchableWithoutFeedback>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                    <Text>Company</Text>
                                    <ToggleSwitch
                                        isOn={toggle}
                                        offColor="#52BCF6"
                                        onColor="#F6931E"
                                        labelStyle={{ color: "black", fontWeight: "900" }}
                                        size="large"
                                        onToggle={isOn => setToggle(isOn)}
                                    />
                                    <Text>Consultant</Text>
                                </View>
                                {
                                    !toggle ?
                                        <React.Fragment>
                                            <TextInput
                                                placeholder='Full Name' value={fullName}
                                                onChangeText={(text) => setFullName(text)} style={styles.input} />
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <TextInput
                                                placeholder='First Name' value={firstName}
                                                onChangeText={(text) => setFirstName(text)} style={styles.input} />
                                            <TextInput
                                                placeholder='Last Name' value={lastName}
                                                onChangeText={(text) => setLastName(text)} style={styles.input} />
                                        </React.Fragment>
                                }

                                <TextInput placeholder='Email' value={email}
                                    keyboardType='email-address'
                                    onChangeText={(text) => setEmail(text)} style={styles.input} />
                                <TextInput placeholder='Phone' value={phone}
                                    keyboardType='numeric' onChangeText={(text) => setPhone(text)}
                                    style={styles.input} />
                                <TextInput placeholder='Password' value={password}
                                    onChangeText={(text) => setPassword(text)}
                                    secureTextEntry={true} style={styles.input} />
                                <TextInput placeholder='Retype password' value={repassword}
                                    onChangeText={(text) => setRepassword(text)} secureTextEntry={true} style={styles.input} />
                                <View >
                                    <Text style={{ marginVertical: 10 }}>Country</Text>

                                    <Text style={{ marginVertical: 10 }}>City</Text>

                                </View>
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
                                            disabled={tag === ''}
                                            onPress={() => {
                                                setTags([...tags, { name: tag }])
                                                setTag('')
                                            }}
                                            underlayColor='#F6931E'
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
                                    style={{ ...styles.signupButton, backgroundColor: toggle ? '#F6931E' : '#52BCF6', }}
                                    onPress={() => registerHandler()}>
                                    <Text style={styles.buttonText}>Sign up</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                <Text
                                    style={{
                                        color: toggle ? '#F6931E' : '#52BCF6'
                                    }}
                                    onPress={() => props.navigation.navigate('Login')}
                                >Already have an account?</Text>
                            </View>
                        </Pressable>
                    </ScrollView>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8FA',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        paddingBottom: 10

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
        backgroundColor: 'white',
        ...Platform.select({
            ios: {
                paddingBottom: 45,
                paddingTop: 15
            },
            android: {

            },
            default: {

            }
        })
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
        backgroundColor: '#F6931E',
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
        backgroundColor: 'white',
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

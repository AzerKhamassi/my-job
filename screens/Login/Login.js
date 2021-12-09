import React from 'react'
import {
    View,
    StyleSheet,
    Image,
    TextInput,
    Text,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'
import logo from '../../assets/my-job.png'
import Constants from 'expo-constants'
import axios from '../../utlis/axios'
import asyncStorageService from '../../utlis/asyncStorageService'

import GlobalContext from '../../context/GlobalContext'

const Login = (props) => {
    const context = React.useContext(GlobalContext);
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [errMessage, setErrMessage] = React.useState(false)


    React.useEffect(() => {
        if (!context.loadingUser && context.user) {
            props.navigation.replace('Tabs')
        }
    }, [context.loadingUser, context.user, props.navigation]);

    const loginHandler = () => {
        axios.post('/user/login', {
            identifier: email,
            password
        }).then(response => {
            asyncStorageService.setAccessToken(response.data.accessToken)
            props.navigation.replace('Tabs')

        }).catch(err => {
            if (err.response.status === 400)
                setErrMessage(true)
        })

    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo}></Image>
                </View>
                <View>
                    <TextInput placeholder='Email'
                        style={styles.input}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        onFocus={() => setErrMessage(false)}
                    />
                    <TextInput placeholder='Password'
                        style={styles.input}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        onFocus={() => setErrMessage(false)}
                    />
                </View>
                <View style={styles.forgotPaswword}>
                    <Text>Forgot password?</Text>
                </View>
                {
                    errMessage &&
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorMessage}>
                            Incorrect email or password!
                        </Text>
                    </View>
                }
                <View >
                    <TouchableHighlight
                        underlayColor='#52BCF6'
                        style={styles.loginButton}
                        onPress={() => { loginHandler() }}>
                        <Text style={styles.buttonText}>Sign in</Text>
                    </TouchableHighlight>
                </View>
                <View>
                    <Text>
                        Don't have an account?
                        <Text
                            onPress={() => props.navigation.navigate('Signup')}
                            style={styles.signupLink}> Sign up</Text>
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8FA',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: Constants.statusBarHeight + 20
    },
    logoContainer: {
        height: 150,
        width: 280,
        marginVertical: 30
    },
    logo: {
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
    forgotPaswword: {
        width: 280,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    loginButton: {
        backgroundColor: '#52BCF6',
        width: 280,
        display: 'flex',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 30,
        color: 'white',
        marginVertical: 20
    },
    buttonText: {
        color: 'white'
    },
    signupLink: {
        color: '#52BCF6',
    },
    errorContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    errorMessage: {
        color: 'red',
        fontWeight: 'bold'
    }
});

export default Login

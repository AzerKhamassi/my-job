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
const staticImage = require("../../assets/my-job.png");

const Signup = () => {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={staticImage} style={styles.imageBackground}></Image>
                </View>
                <View>
                    <TextInput placeholder='Full Name' style={styles.input} />
                    <TextInput placeholder='Email' style={styles.input} />
                    <TextInput placeholder='Password' secureTextEntry={true} style={styles.input} />
                    <TextInput placeholder='Retype password' secureTextEntry={true} style={styles.input} />
                </View>
                <View>
                    <TouchableHighlight underlayColor='#52BCF6' style={styles.signupButton} onPress={() => console.log('hey')}>
                        <Text style={styles.buttonText}>Sign up</Text>
                    </TouchableHighlight>
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
    },
    imageContainer: {
        height: 150,
        width: 280,
        marginVertical: 30
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
    forgotPaswword: {
        width: 280,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    signupButton: {
        backgroundColor: '#52BCF6',
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
    }
});

export default Signup

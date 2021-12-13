import React from 'react'
import { View, StyleSheet, Text, TextInput, TouchableHighlight, TouchableWithoutFeedback, Keyboard } from 'react-native'
import axios from '../../utlis/axios'


const Security = (props) => {

    const [password, setPassword] = React.useState('')
    const [newPaswword, setNewpassword] = React.useState('')
    const [renewPassword, setreNewpassword] = React.useState('')


    const applyHandler = () => {
        axios.patch('/user/update-password', {
            password,
            newPaswword
        }).then(res => {
            console.log(res)
        }).catch(err => console.log(err))
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View>
                    <Text style={{ marginHorizontal: 15 }}>Current Password</Text>
                    <TextInput
                        placeholder='Current Password' value={password}
                        onChangeText={(text) => setPassword(text)} style={styles.input} />
                </View>
                <View>
                    <Text style={{ marginHorizontal: 15 }}>New Password</Text>
                    <TextInput
                        placeholder='New Password' value={newPaswword}
                        onChangeText={(text) => setNewpassword(text)} style={styles.input} />
                </View>
                <View >
                    <Text style={{ marginHorizontal: 15 }}>Retype New Password</Text>
                    <TextInput
                        placeholder='Retype New Password' value={renewPassword}
                        onChangeText={(text) => setreNewpassword(text)} style={styles.input} />
                </View>
                <TouchableHighlight
                    underlayColor='#52BCF6'
                    style={styles.applyButton}
                >
                    <Text style={styles.buttonText}>Apply</Text>
                </TouchableHighlight>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8FA',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        padding: 12,
        marginVertical: 10,
        width: 280,
        borderRadius: 25,
        backgroundColor: 'white'
    },
    applyButton: {
        width: 280,
        display: 'flex',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 30,
        color: 'white',
        marginVertical: 25,
        backgroundColor: '#52BCF6'
    },
    buttonText: {
        color: 'white'
    },
})

export default Security

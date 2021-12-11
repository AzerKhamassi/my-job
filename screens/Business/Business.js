import React from 'react'
import { View, StyleSheet, Text, useWindowDimensions } from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AddOffer from './AddOffer/AddOffer';
import Offers from './Offers/Offers';


const FirstRoute = () => (
    <AddOffer />
);

const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});


const Business = (props) => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Add Offer' },
        { key: 'second', title: 'Offers' },
    ]);

    return (
        <View style={styles.container}>
            <Offers />
            {/* <AddOffer /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8FA',
    },
})

export default Business

import React from 'react'
import { View, StyleSheet, Text, useWindowDimensions } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Applications from '../Applications/Applications';
import AddOffer from './AddOffer/AddOffer';
import Offers from './Offers/Offers';


const FirstRoute = () => (
    // <AddOffer />
    <Applications />
);

const SecondRoute = () => (
    <Offers />
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});


const Business = (props) => {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Applications' },
        { key: 'second', title: 'Offers' },
    ]);

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => props.navigation.navigate('AddOffer')}>
                <View style={{
                    backgroundColor: 'white', padding: 10, marginVertical: 15, display: 'flex', justifyContent: 'center', flexDirection: 'row',
                    borderTopColor: 'black', borderTopWidth: 2, borderBottomColor: 'black', borderBottomWidth: 2
                }}>
                    <Text>Add Offer</Text>
                </View>
            </TouchableWithoutFeedback>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}

                initialLayout={{ width: layout.width }}
                renderTabBar={(props) => (
                    <TabBar
                        {...props}
                        style={{ backgroundColor: 'white' }}
                        indicatorStyle={{ backgroundColor: 'black' }}
                        renderLabel={({ route, focused, color }) => (
                            <Text style={{ color: 'black', margin: 8 }}>
                                {route.title}
                            </Text>
                        )}
                    />
                )}


            />
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

import React from 'react'
import { View, StyleSheet, Text, useWindowDimensions } from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AddOffer from './AddOffer/AddOffer';


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
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                tabStyle={{ backgroundColor: 'green', }}
                renderTabBar={(props) => <TabBar
                    style={{ backgroundColor: 'white' }}
                    {...props}
                    renderLabel={({ route, focused, color }) => (
                        <Text style={{ color: 'black', margin: 8 }}>
                            {route.title}
                        </Text>
                    )}
                    indicatorStyle={{
                        backgroundColor: '#F6931E',
                        height: 2,
                    }}

                />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8FA',
        flexDirection: 'row'
    },
})

export default Business

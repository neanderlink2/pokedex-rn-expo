import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Heading, HStack, Image } from 'native-base';
import React from 'react';
import logo from '../assets/imgs/pokeball.png';
import DetailsPage from '../modules/pokemon/pages/Details.page';
import HomePage from '../modules/pokemon/pages/Home.page';

const Stack = createNativeStackNavigator();

const HomeHeader = () => {
    return (
        <HStack alignItems="center" my={3}>
            <Image source={logo} width={10} height={10} />
            <Heading ml={5}>Pokedex</Heading>
        </HStack>
    );
}

const Routes = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomePage} options={{ headerTitle: () => <HomeHeader /> }} />
            <Stack.Screen name="Details" component={DetailsPage} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default Routes
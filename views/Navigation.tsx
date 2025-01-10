import React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NoteView from './NoteView';
import ItemView from './ItemView';

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="NoteView"
                    component={NoteView}
                    options={({ navigation }) => ({
                        title: 'Note View',
                        headerRight: () => (
                            <Button
                                title="Switch to Item View"
                                onPress={() => navigation.navigate('ItemView')}
                            />
                        ),
                    })}
                />
                <Stack.Screen
                    name="ItemView"
                    component={ItemView}
                    options={({ navigation }) => ({
                        title: 'Item View',
                        headerRight: () => (
                            <Button
                                title="Switch to Note View"
                                onPress={() => navigation.navigate('NoteView')}
                            />
                        ),
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
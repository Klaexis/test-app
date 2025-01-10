import React, { useState, useRef } from 'react';
import { StyleSheet, View, FlatList, TextInput, Button, TouchableOpacity } from 'react-native';
import { Provider as PaperProvider, Appbar, List, Menu, Divider } from 'react-native-paper';
import { ItemController, Item, Category } from '../controller/ItemController';

const ItemView = () => {
    // name stores the current value of the name input field
    // setName uses the useState to update the name input field in the component
    const [name, setName] = useState<string>('');

    // quantity stores the current value of the quantity input field
    // setQuantity uses the useState to update the quantity input field in the component
    const [quantity, setQuantity] = useState<string>('');

    // category stores the current value of the category dropdown
    // setCategory uses the useState to update the category dropdown in the component
    const [category, setCategory] = useState<Category>('Food');

    // items is the list of items
    // setItems uses the useState to update the items list in the component
    const [items, setItems] = useState<Item[]>([]);

    // Setting the visibility of the category menu
    const [isCategoryMenuVisible, setIsCategoryMenuVisible] = useState<boolean>(false);

    // Create a new instance of ItemController but create a reference for re-rendering
    const controller = useRef(new ItemController()).current;

    const addItem = () => {
        controller.addItem(name, quantity, category); // Add the item object created to the items array
        setItems(Array.from(controller.getItems())); // Render the items array again
        setName(''); // Clear the Name Input Field
        setQuantity(''); // Clear the Quantity Input Field
        setCategory('Food'); // Reset Category to default
    };

    const removeItem = (index: number) => {
        controller.removeItem(index); // Remove item based on the index
        setItems(Array.from(controller.getItems())); // Render the items array again
    };

    return (
        <PaperProvider>
            <Appbar.Header>
                <Appbar.Content title="Item List" />
            </Appbar.Header>

            <View style={styles.container}>
                {/* Input for Name */}
                <TextInput
                    style={styles.input}
                    placeholder="Enter item name"
                    value={name}
                    onChangeText={setName}
                />

                {/* Input for Quantity */}
                <TextInput
                    style={styles.input}
                    placeholder="Enter quantity"
                    value={quantity}
                    onChangeText={setQuantity}
                    keyboardType="numeric"
                />
                
                {/* Dropdown for Category */}
                <Menu
                    visible={isCategoryMenuVisible}
                    onDismiss={() => setIsCategoryMenuVisible(false)}
                    anchor={
                        <Button
                            title={`Select Category: ${category}`} 
                            onPress={() => setIsCategoryMenuVisible(true)}
                        />
                    }
                >
                    <Menu.Item
                        onPress={() => {
                            setCategory('Food');
                            setIsCategoryMenuVisible(false);
                        }}
                        title="Food"
                    />
                    <Menu.Item
                        onPress={() => {
                            setCategory('Beverage');
                            setIsCategoryMenuVisible(false);
                        }}
                        title="Beverage"
                    />
                    <Menu.Item
                        onPress={() => {
                            setCategory('Condiment');
                            setIsCategoryMenuVisible(false);
                        }}
                        title="Condiment"
                    />
                </Menu>

                {/* Add space below the dropdown */}
                <View style={styles.space} />

                {/* Button to Add Item */}
                <Button title="Add Item" onPress={addItem} />

                {/* List of Items */}
                <FlatList
                    data={items}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <List.Item
                            title={`${item.name} (${item.quantity}) - ${item.category}`}
                            right={() => (
                                <TouchableOpacity onPress={() => removeItem(index)}>
                                    <List.Icon icon="delete" />
                                </TouchableOpacity>
                            )}
                        />
                    )}
                />
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    space: {
        marginBottom: 20,
    },
});

export default ItemView;
import React, { useState, useRef } from 'react';
import { StyleSheet, View, FlatList, TextInput, Button, TouchableOpacity } from 'react-native';
import { Provider as PaperProvider, Appbar, List } from 'react-native-paper';
import { NoteController } from '../controller/NoteController';

const NoteView = () => {
    // input stores the current value of the note input field
    // setInput uses the useState to update the add note input field in the component
    const [input, setInput] = useState<string>('');

    // notes is the list of notes
    // setNotes uses the useState to update the notes list in the component
    const [notes, setNotes] = useState<string[]>([]);

    // editIndex stores the index of the note being edited
    // setEditIndex uses the useState to update the index of the note being edited
    const [editIndex, setEditIndex] = useState<number | null>(null);

    // editInput stores the current value of the edit note input field
    // setEditInput uses the useState to update the edit note input field in the component
    const [editInput, setEditInput] = useState<string>('');

    // Create a new instance of NoteController but create a reference for re-render
    const controller = useRef(new NoteController()).current;

    const addNote = () => {
        controller.addNote(input); // Add the Note to the Notes array
        setNotes(Array.from(controller.getNotes())); // Render the Notes array again
        setInput(''); // Clear the Note Input Field
    };

    const removeNote = (index: number) => {
        controller.removeNote(index); // Remove the Note based on the index
        setNotes(Array.from(controller.getNotes())); // Render the Notes array again
    };

    const startEditNote = (index: number, note: string) => {
        setEditIndex(index); // Set the index of the note being edited
        setEditInput(note); // Set the value of the note being edited
    };

    const saveEditNote = () => {
        if (editIndex !== null) {
            controller.editNote(editIndex, editInput); // Edit the Note based on the index
            setNotes(Array.from(controller.getNotes())); // Render the Notes array again
            setEditIndex(null); // Reset the index of the note being edited
            setEditInput(''); // Clear the Edit Note Input Field
        }
    };

    return (
        <PaperProvider>
            <Appbar.Header>
                <Appbar.Content title="Note List" />
            </Appbar.Header>

            <View style={styles.container}>
                {/* Input for creating a Note */}
                <TextInput
                    style={styles.input}
                    placeholder="Add a new note"
                    value={input}
                    onChangeText={setInput}
                />

                {/* Button to Add a Note */}
                <Button title="Add Note" onPress={addNote} />

                {/* List of Notes */}
                <FlatList
                    data={notes}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <List.Item
                            title={editIndex === index ? (
                                <TextInput
                                    style={styles.input}
                                    value={editInput}
                                    onChangeText={setEditInput}
                                />
                            ) : (
                                item
                            )}
                            right={() => (
                                <View style={styles.actions}>
                                    {editIndex === index ? (
                                        <>
                                            <TouchableOpacity onPress={saveEditNote}>
                                                <List.Icon icon="check" />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => removeNote(index)}>
                                                <List.Icon icon="delete" />
                                            </TouchableOpacity>
                                        </>
                                    ) : (
                                        <TouchableOpacity onPress={() => startEditNote(index, item)}>
                                            <List.Icon icon="pencil" />
                                        </TouchableOpacity>
                                    )}
                                </View>
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
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 8,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default NoteView;
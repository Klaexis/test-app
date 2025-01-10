export class NoteController {
    private notes: string[] = [];

    addNote(note: string): void {
        const trimmedNote: string = note.trim(); // Trim the note 
        if (trimmedNote) { // Check if the input is not empty
            this.notes.push(trimmedNote); // Add the note to the notes array
        } else {
            alert('Note is Required');
        }
    }

    removeNote(index: number): void {
        this.notes.splice(index, 1); // Remove the note based on the index
    }

    editNote(index: number, updatedNote: string): void {
        const trimmedNote: string = updatedNote.trim(); // Trim the updated note
        if (trimmedNote) { // Check if the edit input note is not empty
            this.notes[index] = trimmedNote; // Update the note based on the index
        } else {
            alert('Note should not be empty');
        }
    }

    getNotes(): string[] { // Getter function to get the notes in the array
        return this.notes; 
    }
}
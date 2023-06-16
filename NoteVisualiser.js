const notes = new Map();

class NoteVisualiser {

    /**
     * Creates a note on the staff.
     * @param {MIDIMessage} midiMessage - MIDI data taken from the user.
     */
    static createNote(midiMessage) {
        const noteName = AudioStream.noteValues[midiMessage.getNote()];
        const noteContainer = new Note(noteName);
        notes.set(noteName, noteContainer);
    }
    /**
     * Removes a note from the staff.
     * @param {MIDIMessage} midiMessage - MIDI data taken from the user.
     */
    static removeNote(midiMessage) {
        const noteName = AudioStream.noteValues[midiMessage.getNote()];
        if (notes.has(noteName)) {
            notes.get(noteName).removeNote();
            notes.delete(noteName);
        }
    }
}
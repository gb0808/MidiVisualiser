const notes = new Map();

class NoteVisualiser {

    /**
     * Creates a note on the staff.
     * @param {MIDIMessage} midiMessage - MIDI data taken from the user.
     */
    static createNote(midiMessage) {
        const staff = document.getElementById("staffContainer");
        const note = document.createElement("div");
        const noteName = AudioStream.noteValues[midiMessage.getNote()];
        this.styleNote(noteName, note);
        staff.appendChild(note);
        notes.set(noteName, note);
    }

    /**
     * Applies CSS to the note being created.
     * @param {String} noteName - the name of the note being played.
     * @param {HTML DOM Element} note - an HTML element acting as the note on a staff.
     */
    static styleNote(noteName, note) {
        note.style.position = "absolute";
        note.style.top = this.getTopPosition(noteName);
        note.style.left = "50%";
        note.style.height = "20px";
        note.style.width = "20px";
        note.style.backgroundColor = "black";
        note.style.borderRadius = "50%";
        note.id = noteName;
    }

    /**
     * Puts a note on the proper line or space on the staff.
     * @param {String} noteName - the name of the note being played.
     * @returns the CSS top value.
     */
    static getTopPosition(noteName) {
        switch (noteName) {
            case "A":
                return "51%";
            case "A#/Bb":
                return "44%";
            case "B":
                return "44%";
            case "C":
                return "36%";
            case "C#/Db":
                return "36%";
            case "D":
                return "28%";
            case "D#/Eb":
                return "21%";
            case "E":
                return "21%";
            case "F":
                return "66%";
            case "F#/Gb":
                return "66%";
            case "G":
                return "59%";
            case "G#/Ab":
                return "51%";
            default:
                return null;
        }
    }

    /**
     * Removes a note from the staff.
     * @param {MIDIMessage} midiMessage - MIDI data taken from the user.
     */
    static removeNote(midiMessage) {
        const noteName = AudioStream.noteValues[midiMessage.getNote()];
        if (notes.has(noteName)) {
            notes.get(noteName).remove();
            notes.delete(noteName);
        }
    }
}
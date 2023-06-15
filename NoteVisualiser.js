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
     * @private
     * @param {String} noteName - the name of the note being played.
     * @param {HTML DOM Element} note - an HTML element acting as the note on a staff.
     */
    static styleNote(noteName, note) {
        note.style.position = "absolute";
        note.style.top = this.getTopPosition(noteName);
        note.style.left = this.getLeftPosition(noteName);
        note.style.height = "20px";
        note.style.width = "20px";
        note.style.backgroundColor = "black";
        note.style.borderRadius = "50%";
        note.id = noteName;
    }

    /**
     * Puts a note on the proper line or space on the staff.
     * @private
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
        }
    }

    /**
     * Keeps notes from displaying on top of one another.
     * @private
     * @param {String} noteName - the name of the note being played.
     * @returns the CSS left value.
     */
    static getLeftPosition(noteName) {
        let left = "50%";
        switch (noteName) {
            case "A":
                if (notes.has("A#/Bb") || notes.has("G") || notes.has("B")) {
                    left = "54%";
                }
                if (notes.has("G#/Ab")) {
                    left = "46%";
                }
                break;
            case "A#/Bb":
                if (notes.has("A") || notes.has("C") || notes.has("C#/Db") || notes.has("G#/Ab")) {
                    left = "54%";
                }
                if (notes.has("B")) {
                    left = "46%";
                }
                break;
            case "B":
                if (notes.has("A") || notes.has("C") || notes.has("C#/Db") || notes.has("G#/Ab")) {
                    left = "54%";
                }
                if (notes.has("A#/Bb")) {
                    left = "46%";
                }
                break;
            case "C":
                if (notes.has("A#/Bb") || notes.has("B") || notes.has("D")) {
                    left = "54%";
                }
                if (notes.has("C#/Db")) {
                    left = "46%";
                }
                break;
            case "C#/Db":
                if (notes.has("A#/Bb") || notes.has("B") || notes.has("D")) {
                    left = "54%";
                }
                if (notes.has("C")) {
                    left = "46%";
                }
                break;
            case "D":
                if (notes.has("C") || notes.has("C#/Db") || notes.has("D#/Eb") || notes.has("E")) {
                    left = "54%";
                }
                break;
            case "D#/Eb":
                if (notes.has("D")) {
                    left = "54%";
                }
                if (notes.has("E")) {
                    left = "46%";
                }
                break;
            case "E":
                if (notes.has("D")) {
                    left = "54%";
                }
                if (notes.has("Eb")) {
                    left = "46%";
                }
                break;
            case "F":
                if (notes.has("G")) {
                    left = "54%"
                }
                if (notes.has("F#/Gb")) {
                    left = "46%";
                }
                break;
            case "F#/Gb":
                if (notes.has("G")) {
                    left = "54%"
                }
                if (notes.has("F")) {
                    left = "46%";
                }
                break;
            case "G":
                if (notes.has("F") || notes.has("F#/Gb") || notes.has("G#/Ab") || notes.has("A")) {
                    left = "54%"
                }
                break;
            case "G#/Ab":
                if (notes.has("A#/Bb") || notes.has("G") || notes.has("B")) {
                    left = "54%";
                }
                if (notes.has("A")) {
                    left = "46%";
                }
                break;
        }
        return left;
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
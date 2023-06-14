class NoteVisualiser {

    /**
     * Shows the note that is being played by the MIDI keyboard.
     * @param {MIDIMessage} midiMessage - The message recived from the MIDI keyboard.
     */
    static showNote(midiMessage) {
        const noteIcon = document.getElementById("note");
        const noteName = AudioStream.noteValues[midiMessage.getNote()];
        noteIcon.style.display = "block";

        switch (noteName) {
            case "A":
                noteIcon.style.top = "51%";
                break;
            case "A#/Bb":
                noteIcon.style.top = "44%";
                break;
            case "B":
                noteIcon.style.top = "44%";
                break;
            case "C":
                noteIcon.style.top = "36%";
                break;
            case "C#/Db":
                noteIcon.style.top = "36%";
                break;
            case "D":
                noteIcon.style.top = "28%";
                break;
            case "D#/Eb":
                noteIcon.style.top = "21%";
                break;
            case "E":
                noteIcon.style.top = "21%";
                break;
            case "F":
                noteIcon.style.top = "66%";
                break;
            case "F#/Gb":
                noteIcon.style.top = "66%";
                break;
            case "G":
                noteIcon.style.top = "59%";
                break;
            case "G#/Ab":
                noteIcon.style.top = "51%";
                break;
        }
    }

    /**
     * Hides any notes being displayed
     */
    static hideNote() {
        const noteIcon = document.getElementById("note");
        noteIcon.style.display = "none";
    }
}
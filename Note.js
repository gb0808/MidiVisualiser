class Note {

    #noteName;
    #noteContainer;
    #noteTopPosition = {
        "C4": "88%", "C#/Db4": "88%", "D4": "82%", "D#/Eb4": "74%", "E4": "74%", "F4": "66%", 
        "F#/Gb4": "66%", "G4": "59%", "G#/Ab4": "51%", "A4": "51%", "A#/Bb4": "44%", "B4": "44%",
        "C5": "36%", "C#/Db5": "36%", "D5": "28%", "D#/Eb5": "21%", "E5": "21%",
    }   

    constructor(noteName) {
        this.#noteName = noteName;
        this.#noteContainer = document.createElement("div");
        this.#noteContainer.id = this.#noteName;
        this.#createDomElement();
    }

    #createDomElement() {
        const staff = document.getElementById("staffContainer");

        //Create note head
        const noteGraphic = document.createElement("div");
        noteGraphic.id = this.#noteName + "--note";
        this.#styleNote(noteGraphic);

        // create accidental
        const accidentalContainer = document.createElement("div");
        const accidentalText = document.createElement("p");
        const symbol = document.createTextNode(this.#getAccidentalType());
        accidentalContainer.id = this.#noteName + "--accidental";
        accidentalText.appendChild(symbol);
        accidentalContainer.appendChild(accidentalText);
        this.#positionAccidental(noteGraphic, accidentalContainer);


        this.#noteContainer.appendChild(accidentalContainer);
        this.#noteContainer.appendChild(noteGraphic);
        staff.appendChild(this.#noteContainer);
    }

    /**
     * Applies CSS to the note being created.
     * @private
     * @param {HTML DOM Element} noteGraphic - an HTML element acting as the note on a staff.
     */
    #styleNote(noteGraphic) {
        noteGraphic.style.position = "absolute";
        noteGraphic.style.top = this.#noteTopPosition[this.#noteName];
        noteGraphic.style.left = "50%"
        noteGraphic.style.height = "20px";
        noteGraphic.style.width = "20px";
        noteGraphic.style.backgroundColor = "black";
        noteGraphic.style.borderRadius = "50%";
    }

    #getAccidentalType() {
        switch (this.#noteName.substring(0, this.#noteName.length - 1)) {
            case "C#/Db": case "F#/Gb":
                return "♯"; 
            case "D#/Eb": case "G#/Ab": case "A#/Bb":
                return "♭";
            default:
                return "";
        }
    }
    
    #positionAccidental(note, accidentalContainer) {
        const top = parseInt(note.style.top) - 18 + "%";
        const left = parseInt(note.style.left) + 2 + "%"

        accidentalContainer.style.position = "absolute";
        accidentalContainer.style.top = top;
        accidentalContainer.style.left = left;
    }

    removeNote() {
        this.#noteContainer.remove();
    }
}
class Note {

    #noteName;
    #noteContainer;
    #ledgerLineType;
    #noteTopPosition = {
        "E2": "93%", "F2": "90%", "F#/Gb2": "90%", "G2": "86%", "G#/Ab2": "82%", "A2": "82%",
        "A#/Bb2": "78%", "B2": "78%", "C3": "74%", "C#/Db3": "74%", "D3": "69.5%", 
        "D#/Eb3": "65.5%", "E3": "65.5%", "F3": "61.5%", "F#/Gb3": "61.5%", "G3": "57.5%", 
        "G#/Ab3": "53.5%", "A3": "53.5%", "A#/Bb3": "50%", "B3": "50%", "C4": "46.5%", 
        "C#/Db4": "46.5%", "D4": "43.5%", "D#/Eb4": "40%", "E4": "40%", "F4": "35.5%", 
        "F#/Gb4": "35.5%", "G4": "31.5%", "G#/Ab4": "27.5%", "A4": "27.5%", "A#/Bb4": "23.5%", 
        "B4": "23.5%", "C5": "19.5%", "C#/Db5": "19.5%", "D5": "15.5%", "D#/Eb5": "11.5%", 
        "E5": "11.5%", "F5": "7.5%", "F#/Gb5": "7.5%", "G5": "3.5%", "G#/Ab5": "0.5%", "A5": "0.5%",
    }   

    /**
     * @constructor
     * @param {String} noteName - the note letter name with octave number.
     */
    constructor(noteName) {
        this.#noteName = noteName;
        switch(noteName) {
            case "E2": case "C4": case "G#/Ab5": case "A5":
                this.#ledgerLineType = "middle";
                break;
            default:
                this.#ledgerLineType = "none";
                break;
        }
        this.#noteContainer = document.createElement("div");
        this.#noteContainer.id = this.#noteName;
        this.#createDomElement();
    }

    /**
     * Creates an HTML element to display the note.
     */
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
        this.#addLedgerLine(noteGraphic);
    }

    /**
     * Adds a ledger line to thenote.
     * @private
     * @param {HTML DOM Element} noteGraphic - an HTML element acting as the note on a staff.
     */
    #addLedgerLine(noteGraphic) {
        const ledgerLine = document.createElement("hr");
        ledgerLine.style.border = "1px solid black";
        ledgerLine.style.position = "absolute";
        switch (this.#ledgerLineType) {
            case "top":
                ledgerLine.style.top = parseInt(noteGraphic.style.top) - 2 + "%"
                break;
            case "middle":
                ledgerLine.style.top = noteGraphic.style.top;
                break;
            case "bottom":
                ledgerLine.style.top = parseInt(noteGraphic.style.top) + 4 + "%"
                break;
            default:
                break;
        }
        ledgerLine.style.left = parseInt(noteGraphic.style.left) - 0.75 + "%";
        ledgerLine.style.width = "33px";
        this.#noteContainer.appendChild(ledgerLine);
    }

    /**
     * Determines what accidental to place on a note.
     * @returns The appropriate accidental.
     */
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
    
    /**
     * Positions the accidental on the note head.
     * @param {HTML DOM Element} note - a div containing the note head on screen.
     * @param {HTML DOM Element} accidentalContainer - a div containing the accidental mark.
     */
    #positionAccidental(note, accidentalContainer) {
        const top = parseInt(note.style.top) - 10 + "%";
        const left = parseInt(note.style.left) + 2 + "%"

        accidentalContainer.style.position = "absolute";
        accidentalContainer.style.top = top;
        accidentalContainer.style.left = left;
    }

    /**
     * Removes a note from the staff.
     */
    removeNote() {
        this.#noteContainer.remove();
    }
}
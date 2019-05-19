/* Generated from Java with JSweet 2.0.0-SNAPSHOT - http://www.jsweet.org */
declare namespace arb.soundcipher {
    /**
     * Constructor to initialize the SoundCipher object with the Processing context
     * it is running in. In Processing, The SoundCipher object should be initialized as follows:
     * <pre>
     * SoundCipher sc = SoundCipher(this);
     * </pre>
     * @param {*} o    The Processing context the SoundCipher object will run in.
     * @class
     */
    export class SoundCipher {
        public constructor(o : any);

        public static PIANO : number;

        public static XYLOPHONE : number;

        public static ELECTRIC_GUITAR : number;

        public static ACOUSTIC_BASS : number;

        public static STRINGS : number;

        public static ORCHESTRA_HIT : number;

        public static TRUMPET : number;

        public static TUBA : number;

        public static BRASS : number;

        public static ALTO_SAX : number;

        public static CLARINET : number;

        public static FLUTE : number;

        public static TAIKO : number;

        public static SYNTH_DRUM : number;

        public instrument : number;

        /**
         * Plays a note with the given pitch, dynamic (loudness) and duration.
         * @param {number} note    The pitch of the note. This is a MIDI note, with the middle C
         * being 60, and increases by 1 for each half step.
         * @param {number} dynamic   The loudness of the note, from 0 to 127.
         * @param {number} duration   The duration of the note in seconds.
         */
        public playNote(note : number, dynamic : number, duration : number);

        /**
         * Plays an array of notes (simultaneously) with the given pitches , dynamic (loudness) and duration.
         * @param {Array} notes    The pitches of the notes. These are MIDI notes, with the middle C
         * being 60, and increases by 1 for each half step.
         * @param {number} dynamic   The loudness of the note, from 0 to 127.
         * @param {number} duration   The duration of the note in seconds.
         */
        public playChord(notes : number[], dynamic : number, duration : number);

        /**
         * Changes the instrument played by the current SoundCipher object. Currently,
         * only constants defined in this class are supported.
         * @param {number} instrumentCode    The instrument to load
         */
        public changeInstrument(instrumentCode : number);

        /**
         * Preload the sound file specified by the instrumentCode. This function can be called
         * before the <code>playNote</code> or <code>playChord</code> to prevent latency
         * on the first play caused by having to load the sound file.
         * @param {number} instrumentCode    The instrument to load
         */
        public static loadInstrument(instrumentCode : number);

        public static getInstrumentName(instrumentCode : number) : string;
    }
}


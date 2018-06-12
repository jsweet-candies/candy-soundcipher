/* Generated from Java with JSweet 2.0.0-SNAPSHOT - http://www.jsweet.org */
declare namespace arb.soundcipher {
    /**
     * An example of a library definition.
     * @param {*} o
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

        public playNote(note : number, dynamic : number, duration : number);

        public playChord(notes : number[], dynamic : number, duration : number);

        public changeInstrument(instrumentCode : number);

        public static loadInstrument(instrumentCode : number);

        public static getInstrumentName(instrumentCode : number) : string;
    }
}


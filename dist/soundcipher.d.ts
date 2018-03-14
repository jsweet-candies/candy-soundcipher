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

        public static SYNTH_DRUM : number;

        public static ELECTRIC_GUITAR : number;

        public instrument : number;

        public playNote(note : number, dynamic : number, duration : number);

        public playChord(notes : number[], dynamic : number, duration : number);
    }
}


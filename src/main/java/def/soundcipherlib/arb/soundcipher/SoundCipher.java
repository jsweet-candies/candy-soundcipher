package def.soundcipherlib.arb.soundcipher;

/**
 * SoundCipher is a library that you can use to play notes and make music in Processing.
 * The SoundCipher object should be initialized as follows:
 * <pre>
 * SoundCipher sc = new SoundCipher(this);
 * </pre>
 * To play a note:
 * <pre>
 * sc.playNote(60,100,2.0);
 * </pre>
 * To play a chord:
 * <pre>
 * sc.playChord(new double[]{60, 64, 67},100,2.0);
 * </pre>
 * To play a short tune:
 * <pre>
 * 
 * SoundCipher sc = new SoundCipher(this); 
 * int[] notes = {60,60,67,67,69,69,67}; 
 * 
 * int frames_per_note = 30; 
 * int noteIndex = 0;
 * 
 * void draw(){ 
 *   if(frameCount % frames_per_note == 1 && noteIndex < notes.length) {
 *     sc.playNote(notes[noteIndex], 100, 0.2);
 *     noteIndex++;
 *   }
 * }
 * </pre>
 */
public class SoundCipher {

    /**
     * Constructor to initialize the SoundCipher object with the Processing context
     * it is running in. In Processing, The SoundCipher object should be initialized as follows:
     * <pre>
     * SoundCipher sc = SoundCipher(this);
     * </pre>
     * @param o    The Processing context the SoundCipher object will run in.
     */
    public SoundCipher(Object o) {
    }

    public static final float PIANO = 0;
    public static final float XYLOPHONE=13;
    public static final float ELECTRIC_GUITAR = 27;
    public static final float ACOUSTIC_BASS=32;
    public static final float STRINGS=48;
    public static final float ORCHESTRA_HIT=55;
    public static final float TRUMPET=56;
    public static final float TUBA=58;
    public static final float BRASS=61;
    public static final float ALTO_SAX=65;
    public static final float CLARINET=71;
    public static final float FLUTE=73;
    public static final float TAIKO=116;
    public static final float SYNTH_DRUM = 118;

    public double instrument;

    /**
     * Plays a note with the given pitch, dynamic (loudness) and duration.
     * @param note    The pitch of the note. This is a MIDI note, with the middle C 
     *                being 60, and increases by 1 for each half step.
     * @param dynamic   The loudness of the note, from 0 to 127.
     * @param duration   The duration of the note in seconds.
     */
    native public void playNote(double note, double dynamic, double duration);


    /**
     * Plays an array of notes (simultaneously) with the given pitches , dynamic (loudness) and duration.
     * @param notes    The pitches of the notes. These are MIDI notes, with the middle C 
     *                being 60, and increases by 1 for each half step.
     * @param dynamic   The loudness of the note, from 0 to 127.
     * @param duration   The duration of the note in seconds.
     */
    native public void playChord(double[] notes, double dynamic, double duration);

    /**
     * Changes the instrument played by the current SoundCipher object. Currently,
     * only constants defined in this class are supported.
     * @param instrumentCode    The instrument to load
     */
    native public void changeInstrument(double instrumentCode);

    /**
     * Preload the sound file specified by the instrumentCode. This function can be called
     * before the <code>playNote</code> or <code>playChord</code> to prevent latency 
     * on the first play caused by having to load the sound file.
     * @param instrumentCode    The instrument to load
     */
    native public static void loadInstrument(double instrumentCode);
    native public static String getInstrumentName(double instrumentCode);
}

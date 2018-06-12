package def.soundcipherlib.arb.soundcipher;

/**
 * An example of a library definition.
 */
public class SoundCipher {
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

	native public void playNote(double note, double dynamic, double duration);
	native public void playChord(double[] notes, double dynamic, double duration);
	native public void changeInstrument(double instrumentCode);
	native public static void loadInstrument(double instrumentCode);
    native public static String getInstrumentName(double instrumentCode);
}

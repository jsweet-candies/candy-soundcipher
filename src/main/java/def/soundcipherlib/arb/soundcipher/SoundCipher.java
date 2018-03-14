package def.soundcipherlib.arb.soundcipher;

/**
 * An example of a library definition.
 */
public class SoundCipher {
	public SoundCipher(Object o) {
	}

    public static final float PIANO = 0;
    public static final float SYNTH_DRUM = 118;
    public static final float ELECTRIC_GUITAR = 27;

    public double instrument;

	native public void playNote(double note, double dynamic, double duration);
	native public void playChord(double[] notes, double dynamic, double duration);
}

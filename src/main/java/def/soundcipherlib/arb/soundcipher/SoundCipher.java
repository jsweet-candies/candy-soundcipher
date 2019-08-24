package def.soundcipherlib.arb.soundcipher;

/**
 * SoundCipher is a library that you can use to play notes and make music in
 * Processing. The SoundCipher object should be initialized as follows:
 * 
 * <pre>
 * SoundCipher sc = new SoundCipher(this);
 * </pre>
 * 
 * To play a note:
 * 
 * <pre>
 * sc.playNote(60, 100, 2.0);
 * </pre>
 * 
 * To play a chord:
 * 
 * <pre>
 * sc.playChord(new double[] { 60, 64, 67 }, 100, 2.0);
 * </pre>
 * 
 * To play a short tune:
 * 
 * <pre>
 * 
 * SoundCipher sc = new SoundCipher(this);
 * int[] notes = { 60, 60, 67, 67, 69, 69, 67 };
 * 
 * int frames_per_note = 30;
 * int noteIndex = 0;
 * 
 * void draw() {
 * 	if (frameCount % frames_per_note == 1 && noteIndex < notes.length) {
 * 		sc.playNote(notes[noteIndex], 100, 0.2);
 * 		noteIndex++;
 * 	}
 * }
 * </pre>
 */
public class SoundCipher {

	/**
	 * Constructor to initialize the SoundCipher object with the Processing context
	 * it is running in. In Processing, The SoundCipher object should be initialized
	 * as follows:
	 * 
	 * <pre>
	 * SoundCipher sc = SoundCipher(this);
	 * </pre>
	 * 
	 * @param o The Processing context the SoundCipher object will run in.
	 */
	public SoundCipher(Object o) {
	}

	public static final float PIANO = 0, ACOUSTIC_GRAND = 0, BRIGHT_ACOUSTIC = 1, ELECTRIC_GRAND = 2, HONKYTONK = 3,
			HONKYTONK_PIANO = 3, EPIANO = 4, ELECTRIC_PIANO = 4, ELPIANO = 4, RHODES = 4, EPIANO2 = 5, DX_EPIANO = 5,
			HARPSICHORD = 6, CLAV = 7, CLAVINET = 7, CELESTE = 8, CELESTA = 8, GLOCKENSPIEL = 9, GLOCK = 9,
			MUSIC_BOX = 10, VIBRAPHONE = 11, VIBES = 11, MARIMBA = 12, XYLOPHONE = 13, TUBULAR_BELL = 14,
			TUBULAR_BELLS = 14, ORGAN = 16, ELECTRIC_ORGAN = 16, ORGAN2 = 17, JAZZ_ORGAN = 17, ORGAN3 = 18,
			HAMMOND_ORGAN = 17, CHURCH_ORGAN = 19, PIPE_ORGAN = 19, REED_ORGAN = 20, ACCORDION = 21,
			PIANO_ACCORDION = 21, CONCERTINA = 21, HARMONICA = 22, BANDNEON = 23, NYLON_GUITAR = 24, NGUITAR = 24,
			GUITAR = 24, ACOUSTIC_GUITAR = 24, AC_GUITAR = 24, STEEL_GUITAR = 25, SGUITAR = 25, JAZZ_GUITAR = 26,
			JGUITAR = 26, CLEAN_GUITAR = 27, CGUITAR = 27, ELECTRIC_GUITAR = 27, EL_GUITAR = 27, MUTED_GUITAR = 28,
			MGUITAR = 28, OVERDRIVE_GUITAR = 29, OGUITAR = 29, DISTORTED_GUITAR = 30, DGUITAR = 30, DIST_GUITAR = 30,
			GUITAR_HARMONICS = 31, GT_HARMONICS = 31, HARMONICS = 31, ACOUSTIC_BASS = 32, ABASS = 32,
			FINGERED_BASS = 33, BASS = 33, FBASS = 33, ELECTRIC_BASS = 33, EL_BASS = 33, EBASS = 33, PICKED_BASS = 34,
			PBASS = 34, FRETLESS_BASS = 35, FRETLESS = 35, SLAP_BASS = 36, SBASS = 36, SLAP = 36, SYNTH_BASS = 38,
			VIOLIN = 40, VIOLA = 41, CELLO = 42, VIOLIN_CELLO = 42, CONTRABASS = 43, CONTRA_BASS = 43, DOUBLE_BASS = 43,
			TREMOLO_STRINGS = 44, TREMOLO = 44, PIZZICATO_STRINGS = 45, PIZZ = 45, PITZ = 45, PSTRINGS = 45, HARP = 46,
			TIMPANI = 47, TIMP = 47, STRINGS = 48, STR = 48, SLOW_STRINGS = 51, SYNTH_STRINGS = 50, SYN_STRINGS = 50,
			AAH = 52, AHHS = 52, CHOIR = 52, OOH = 53, OOHS = 53, VOICE = 53, SYNVOX = 54, VOX = 54, ORCHESTRA_HIT = 55,
			TRUMPET = 56, TROMBONE = 57, TUBA = 58, MUTED_TRUMPET = 59, FRENCH_HORN = 60, HORN = 60, BRASS = 61,
			SYNTH_BRASS = 62, SOPRANO_SAX = 64, SOPRANO = 64, SOPRANO_SAXOPHONE = 64, SOP = 64, ALTO_SAX = 65,
			ALTO = 65, ALTO_SAXOPHONE = 65, TENOR_SAX = 66, TENOR = 66, TENOR_SAXOPHONE = 66, SAX = 66, SAXOPHONE = 66,
			BARITONE_SAX = 67, BARI = 67, BARI_SAX = 67, BARITONE = 67, BARITONE_SAXOPHONE = 67, OBOE = 68,
			ENGLISH_HORN = 69, BASSOON = 70, CLARINET = 71, CLAR = 71, PICCOLO = 72, PIC = 72, PICC = 72, FLUTE = 73,
			RECORDER = 74, PAN_FLUTE = 75, PANFLUTE = 75, BOTTLE_BLOW = 76, BOTTLE = 76, SHAKUHACHI = 77, WHISTLE = 78,
			OCARINA = 79, GMSQUARE_WAVE = 80, SQUARE = 80, GMSAW_WAVE = 81, SAW = 81, SAWTOOTH = 81,
			SYNTH_CALLIOPE = 82, CALLOPE = 82, SYN_CALLIOPE = 82, CHIFFER_LEAD = 83, CHIFFER = 83, CHARANG = 84,
			SOLO_VOX = 85, FANTASIA = 88, WARM_PAD = 89, PAD = 89, POLYSYNTH = 90, POLY_SYNTH = 90, SPACE_VOICE = 91,
			BOWED_GLASS = 92, METAL_PAD = 93, HALO_PAD = 94, HALO = 94, SWEEP_PAD = 95, SWEEP = 95, ICE_RAIN = 96,
			ICERAIN = 96, SOUNDTRACK = 97, CRYSTAL = 98, ATMOSPHERE = 99, BRIGHTNESS = 100, GOBLIN = 101,
			ECHO_DROPS = 102, DROPS = 102, ECHOS = 102, ECHO = 102, ECHO_DROP = 102, STAR_THEME = 103, SITAR = 104,
			BANJO = 105, SHAMISEN = 106, KOTO = 107, KALIMBA = 108, THUMB_PIANO = 108, BAGPIPES = 109, BAG_PIPES = 109,
			BAGPIPE = 109, PIPES = 109, FIDDLE = 110, SHANNAI = 111, TINKLE_BELL = 112, BELL = 112, BELLS = 112,
			AGOGO = 113, STEEL_DRUMS = 114, STEELDRUMS = 114, STEELDRUM = 114, STEEL_DRUM = 114, WOODBLOCK = 115,
			WOODBLOCKS = 115, TAIKO = 116, DRUM = 116, TOM = 119, TOMS = 119, TOM_TOM = 119, TOM_TOMS = 119,
			SYNTH_DRUM = 118, SYNTH_DRUMS = 118, REVERSE_CYMBAL = 119, CYMBAL = 119, FRETNOISE = 120, FRET_NOISE = 120,
			FRET = 120, FRETS = 120, BREATHNOISE = 121, BREATH = 121, SEASHORE = 122, SEA = 122, RAIN = 122,
			THUNDER = 122, WIND = 122, STREAM = 122, SFX = 122, SOUNDEFFECTS = 122, SOUNDFX = 122, BIRD = 123,
			TELEPHONE = 124, PHONE = 124, HELICOPTER = 125, APPLAUSE = 126;

	public static final float ACOUSTIC_BASS_DRUM = 35, BASS_DRUM = 36, KICK = 36, KICK_DRUM = 36, SIDE_STICK = 37,
			ACOUSTIC_SNARE = 38, SNARE = 38, SNARE_DRUM = 38, HAND_CLAP = 39, ELECTRIC_SNARE = 40, LOW_FLOOR_TOM = 41,
			CLOSED_HI_HAT = 42, HIHAT = 42, HI_HAT = 42, HIGH_FLOOR_TOM = 43, PEDAL_HI_HAT = 44, LOW_TOM = 45,
			OPEN_HI_HAT = 46, LOW_MID_TOM = 47, HI_MID_TOM = 48, CRASH_CYMBAL_1 = 49, CRASH = 49, HIGH_TOM = 50,
			RIDE_CYMBAL_1 = 51, RIDE = 51, CHINESE_CYMBAL = 52, RIDE_BELL = 53, TAMBOURINE = 54, SPLASH_CYMBAL = 55,
			COWBELL = 56, CRASH_CYMBAL_2 = 57, VIBRASLAP = 58, RIDE_CYMBAL_2 = 59, HI_BONGO = 60, LOW_BONGO = 61,
			MUTE_HI_CONGA = 62, OPEN_HI_CONGA = 63, LOW_CONGA = 64, HIGH_TIMBALE = 65, LOW_TIMBALE = 66,
			HIGH_AGOGO = 67, LOW_AGOGO = 68, CABASA = 69, MARACAS = 70, SHORT_WHISTLE = 71, LONG_WHISTLE = 72,
			SHORT_GUIRO = 73, LONG_GUIRO = 74, CLAVES = 75, HI_WOOD_BLOCK = 76, LOW_WOOD_BLOCK = 77, MUTE_CUICA = 78,
			OPEN_CUICA = 79, MUTE_TRIANGLE = 80, OPEN_TRIANGLE = 81, TRIANGLE = 81;

	public double instrument;

	/**
	 * Plays a note with the given pitch, dynamic (loudness) and duration.
	 * 
	 * @param note     The pitch of the note. This is a MIDI note, with the middle C
	 *                 being 60, and increases by 1 for each half step.
	 * @param dynamic  The loudness of the note, from 0 to 127.
	 * @param duration The duration of the note in seconds.
	 */
	native public void playNote(double note, double dynamic, double duration);

	/**
	 * Plays an array of notes (simultaneously) with the given pitches , dynamic
	 * (loudness) and duration.
	 * 
	 * @param notes    The pitches of the notes. These are MIDI notes, with the
	 *                 middle C being 60, and increases by 1 for each half step.
	 * @param dynamic  The loudness of the note, from 0 to 127.
	 * @param duration The duration of the note in seconds.
	 */
	native public void playChord(double[] notes, double dynamic, double duration);

	/**
	 * Changes the instrument played by the current SoundCipher object. Currently,
	 * only constants defined in this class are supported.
	 * 
	 * @param instrumentCode The instrument to load
	 */
	native public void changeInstrument(double instrumentCode);

	/**
	 * Preload the sound file specified by the instrumentCode. This function can be
	 * called before the <code>playNote</code> or <code>playChord</code> to prevent
	 * latency on the first play caused by having to load the sound file.
	 * 
	 * @param instrumentCode The instrument to load
	 */
	native public static void loadInstrument(double instrumentCode);

	native public static String getInstrumentName(double instrumentCode);
}

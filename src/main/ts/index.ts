declare var MIDI: any;

const SoundFontUrl: string = window['arb.soundcipher.SoundCipher__SoundFontUrl'] || '/resources/soundfont/';

namespace arb.soundcipher {

    let initialized: Promise<void> = Promise.resolve();

    const DEFAULT_NOTE_DELAY = 0; // play one note every quarter second
    const DEFAULT_NOTE_VELOCITY = 127; // how hard the note hits

    export class SoundCipher {
        static readonly ACOUSTIC_BASS_DRUM = 35;
        static readonly BASS_DRUM = 36;
        static readonly KICK = 36;
        static readonly KICK_DRUM = 36;
        static readonly SIDE_STICK = 37;
        static readonly ACOUSTIC_SNARE = 38;
        static readonly SNARE = 38;
        static readonly SNARE_DRUM = 38;
        static readonly HAND_CLAP = 39;
        static readonly ELECTRIC_SNARE = 40;
        static readonly LOW_FLOOR_TOM = 41;

        static readonly CLOSED_HI_HAT = 42;
        static readonly HIHAT = 42;
        static readonly HI_HAT = 42;
        static readonly HIGH_FLOOR_TOM = 43;
        static readonly PEDAL_HI_HAT = 44;
        static readonly LOW_TOM = 45;

        static readonly OPEN_HI_HAT = 46;
        static readonly LOW_MID_TOM = 47;
        static readonly HI_MID_TOM = 48;
        static readonly CRASH_CYMBAL_1 = 49;
        static readonly CRASH = 49;
        static readonly HIGH_TOM = 50;

        static readonly RIDE_CYMBAL_1 = 51;
        static readonly RIDE = 51;
        static readonly CHINESE_CYMBAL = 52;
        static readonly RIDE_BELL = 53;
        static readonly TAMBOURINE = 54;
        static readonly SPLASH_CYMBAL = 55;

        static readonly COWBELL = 56;
        static readonly CRASH_CYMBAL_2 = 57;
        static readonly VIBRASLAP = 58;
        static readonly RIDE_CYMBAL_2 = 59;
        static readonly HI_BONGO = 60;
        static readonly LOW_BONGO = 61;

        static readonly MUTE_HI_CONGA = 62;
        static readonly OPEN_HI_CONGA = 63;
        static readonly LOW_CONGA = 64;
        static readonly HIGH_TIMBALE = 65;
        static readonly LOW_TIMBALE = 66;

        static readonly HIGH_AGOGO = 67;
        static readonly LOW_AGOGO = 68;
        static readonly CABASA = 69;
        static readonly MARACAS = 70;
        static readonly SHORT_WHISTLE = 71;
        static readonly LONG_WHISTLE = 72;

        static readonly SHORT_GUIRO = 73;
        static readonly LONG_GUIRO = 74;
        static readonly CLAVES = 75;
        static readonly HI_WOOD_BLOCK = 76;
        static readonly LOW_WOOD_BLOCK = 77;
        static readonly MUTE_CUICA = 78;

        static readonly OPEN_CUICA = 79;
        static readonly MUTE_TRIANGLE = 80;
        static readonly OPEN_TRIANGLE = 81;
        static readonly TRIANGLE = 81;

        static readonly PIANO = 0;
        static readonly ACOUSTIC_GRAND = 0;
        static readonly BRIGHT_ACOUSTIC = 1;
        static readonly ELECTRIC_GRAND = 2;
        static readonly HONKYTONK = 3;

        static readonly HONKYTONK_PIANO = 3;
        static readonly EPIANO = 4;
        static readonly ELECTRIC_PIANO = 4;
        static readonly ELPIANO = 4;
        static readonly RHODES = 4;
        static readonly EPIANO2 = 5;
        static readonly DX_EPIANO = 5;

        static readonly HARPSICHORD = 6;
        static readonly CLAV = 7;
        static readonly CLAVINET = 7;
        static readonly CELESTE = 8;
        static readonly CELESTA = 8;
        static readonly GLOCKENSPIEL = 9;
        static readonly GLOCK = 9;

        static readonly MUSIC_BOX = 10;
        static readonly VIBRAPHONE = 11;
        static readonly VIBES = 11;
        static readonly MARIMBA = 12;
        static readonly XYLOPHONE = 13;
        static readonly TUBULAR_BELL = 14;

        static readonly TUBULAR_BELLS = 14;
        static readonly ORGAN = 16;
        static readonly ELECTRIC_ORGAN = 16;
        static readonly ORGAN2 = 17;
        static readonly JAZZ_ORGAN = 17;
        static readonly ORGAN3 = 18;
        static readonly HAMMOND_ORGAN = 17;
        static readonly CHURCH_ORGAN = 19;
        static readonly PIPE_ORGAN = 19;
        static readonly REED_ORGAN = 20;
        static readonly ACCORDION = 21;

        static readonly PIANO_ACCORDION = 21;
        static readonly CONCERTINA = 21;
        static readonly HARMONICA = 22;
        static readonly BANDNEON = 23;
        static readonly NYLON_GUITAR = 24;
        static readonly NGUITAR = 24;

        static readonly GUITAR = 24;
        static readonly ACOUSTIC_GUITAR = 24;
        static readonly AC_GUITAR = 24;
        static readonly STEEL_GUITAR = 25;
        static readonly SGUITAR = 25;
        static readonly JAZZ_GUITAR = 26;

        static readonly JGUITAR = 26;
        static readonly CLEAN_GUITAR = 27;
        static readonly CGUITAR = 27;
        static readonly ELECTRIC_GUITAR = 27;
        static readonly EL_GUITAR = 27;
        static readonly MUTED_GUITAR = 28;

        static readonly MGUITAR = 28;
        static readonly OVERDRIVE_GUITAR = 29;
        static readonly OGUITAR = 29;
        static readonly DISTORTED_GUITAR = 30;
        static readonly DGUITAR = 30;
        static readonly DIST_GUITAR = 30;

        static readonly GUITAR_HARMONICS = 31;
        static readonly GT_HARMONICS = 31;
        static readonly HARMONICS = 31;
        static readonly ACOUSTIC_BASS = 32;
        static readonly ABASS = 32;

        static readonly FINGERED_BASS = 33;
        static readonly BASS = 33;
        static readonly FBASS = 33;
        static readonly ELECTRIC_BASS = 33;
        static readonly EL_BASS = 33;
        static readonly EBASS = 33;
        static readonly PICKED_BASS = 34;

        static readonly PBASS = 34;
        static readonly FRETLESS_BASS = 35;
        static readonly FRETLESS = 35;
        static readonly SLAP_BASS = 36;
        static readonly SBASS = 36;
        static readonly SLAP = 36;
        static readonly SYNTH_BASS = 38;

        static readonly VIOLIN = 40;
        static readonly VIOLA = 41;
        static readonly CELLO = 42;
        static readonly VIOLIN_CELLO = 42;
        static readonly CONTRABASS = 43;
        static readonly CONTRA_BASS = 43;
        static readonly DOUBLE_BASS = 43;

        static readonly TREMOLO_STRINGS = 44;
        static readonly TREMOLO = 44;
        static readonly PIZZICATO_STRINGS = 45;
        static readonly PIZZ = 45;
        static readonly PITZ = 45;
        static readonly PSTRINGS = 45;
        static readonly HARP = 46;

        static readonly TIMPANI = 47;
        static readonly TIMP = 47;
        static readonly STRINGS = 48;
        static readonly STR = 48;
        static readonly SLOW_STRINGS = 51;
        static readonly SYNTH_STRINGS = 50;
        static readonly SYN_STRINGS = 50;

        static readonly AAH = 52;
        static readonly AHHS = 52;
        static readonly CHOIR = 52;
        static readonly OOH = 53;
        static readonly OOHS = 53;
        static readonly VOICE = 53;
        static readonly SYNVOX = 54;
        static readonly VOX = 54;
        static readonly ORCHESTRA_HIT = 55;

        static readonly TRUMPET = 56;
        static readonly TROMBONE = 57;
        static readonly TUBA = 58;
        static readonly MUTED_TRUMPET = 59;
        static readonly FRENCH_HORN = 60;
        static readonly HORN = 60;
        static readonly BRASS = 61;

        static readonly SYNTH_BRASS = 62;
        static readonly SOPRANO_SAX = 64;
        static readonly SOPRANO = 64;
        static readonly SOPRANO_SAXOPHONE = 64;
        static readonly SOP = 64;
        static readonly ALTO_SAX = 65;

        static readonly ALTO = 65;
        static readonly ALTO_SAXOPHONE = 65;
        static readonly TENOR_SAX = 66;
        static readonly TENOR = 66;
        static readonly TENOR_SAXOPHONE = 66;
        static readonly SAX = 66;
        static readonly SAXOPHONE = 66;

        static readonly BARITONE_SAX = 67;
        static readonly BARI = 67;
        static readonly BARI_SAX = 67;
        static readonly BARITONE = 67;
        static readonly BARITONE_SAXOPHONE = 67;
        static readonly OBOE = 68;

        static readonly ENGLISH_HORN = 69;
        static readonly BASSOON = 70;
        static readonly CLARINET = 71;
        static readonly CLAR = 71;
        static readonly PICCOLO = 72;
        static readonly PIC = 72;
        static readonly PICC = 72;
        static readonly FLUTE = 73;

        static readonly RECORDER = 74;
        static readonly PAN_FLUTE = 75;
        static readonly PANFLUTE = 75;
        static readonly BOTTLE_BLOW = 76;
        static readonly BOTTLE = 76;
        static readonly SHAKUHACHI = 77;
        static readonly WHISTLE = 78;

        static readonly OCARINA = 79;
        static readonly GMSQUARE_WAVE = 80;
        static readonly SQUARE = 80;
        static readonly GMSAW_WAVE = 81;
        static readonly SAW = 81;
        static readonly SAWTOOTH = 81;

        static readonly SYNTH_CALLIOPE = 82;
        static readonly CALLOPE = 82;
        static readonly SYN_CALLIOPE = 82;
        static readonly CHIFFER_LEAD = 83;
        static readonly CHIFFER = 83;
        static readonly CHARANG = 84;

        static readonly SOLO_VOX = 85;
        static readonly FANTASIA = 88;
        static readonly WARM_PAD = 89;
        static readonly PAD = 89;
        static readonly POLYSYNTH = 90;
        static readonly POLY_SYNTH = 90;
        static readonly SPACE_VOICE = 91;

        static readonly BOWED_GLASS = 92;
        static readonly METAL_PAD = 93;
        static readonly HALO_PAD = 94;
        static readonly HALO = 94;
        static readonly SWEEP_PAD = 95;
        static readonly SWEEP = 95;
        static readonly ICE_RAIN = 96;

        static readonly ICERAIN = 96;
        static readonly SOUNDTRACK = 97;
        static readonly CRYSTAL = 98;
        static readonly ATMOSPHERE = 99;
        static readonly BRIGHTNESS = 100;
        static readonly GOBLIN = 101;

        static readonly ECHO_DROPS = 102;
        static readonly DROPS = 102;
        static readonly ECHOS = 102;
        static readonly ECHO = 102;
        static readonly ECHO_DROP = 102;
        static readonly STAR_THEME = 103;
        static readonly SITAR = 104;

        static readonly BANJO = 105;
        static readonly SHAMISEN = 106;
        static readonly KOTO = 107;
        static readonly KALIMBA = 108;
        static readonly THUMB_PIANO = 108;
        static readonly BAGPIPES = 109;
        static readonly BAG_PIPES = 109;

        static readonly BAGPIPE = 109;
        static readonly PIPES = 109;
        static readonly FIDDLE = 110;
        static readonly SHANNAI = 111;
        static readonly TINKLE_BELL = 112;
        static readonly BELL = 112;
        static readonly BELLS = 112;

        static readonly AGOGO = 113;
        static readonly STEEL_DRUMS = 114;
        static readonly STEELDRUMS = 114;
        static readonly STEELDRUM = 114;
        static readonly STEEL_DRUM = 114;
        static readonly WOODBLOCK = 115;

        static readonly WOODBLOCKS = 115;
        static readonly TAIKO = 116;
        static readonly DRUM = 116;
        static readonly TOM = 119;
        static readonly TOMS = 119;
        static readonly TOM_TOM = 119;
        static readonly TOM_TOMS = 119;

        static readonly SYNTH_DRUM = 118;
        static readonly SYNTH_DRUMS = 118;
        static readonly REVERSE_CYMBAL = 119;
        static readonly CYMBAL = 119;
        static readonly FRETNOISE = 120;
        static readonly FRET_NOISE = 120;

        static readonly FRET = 120;
        static readonly FRETS = 120;
        static readonly BREATHNOISE = 121;
        static readonly BREATH = 121;
        static readonly SEASHORE = 122;
        static readonly SEA = 122;
        static readonly RAIN = 122;

        static readonly THUNDER = 122;
        static readonly WIND = 122;
        static readonly STREAM = 122;
        static readonly SFX = 122;
        static readonly SOUNDEFFECTS = 122;
        static readonly SOUNDFX = 122;
        static readonly BIRD = 123;

        static readonly TELEPHONE = 124;
        static readonly PHONE = 124;
        static readonly HELICOPTER = 125;
        static readonly APPLAUSE = 126;

        static channelCount = 0;
        private static MAX_CHANNEL: number = 16;
        static maxChannelErrorHandler: () => void = () => { };

        static instrumentSoundMap = new Map();
        static openChannels = [];
        private channel: number;

        constructor() {
            // each SoundCipher instance will have a channel number
            // so that multiple sounds can be played at the same time
            this.channel = SoundCipher.channelCount;
            if (SoundCipher.channelCount >= 0 && SoundCipher.channelCount <= SoundCipher.MAX_CHANNEL) {
                SoundCipher.channelCount++;
            } else {
                SoundCipher.maxChannelErrorHandler();
            }
        }

        static initialize() {
            const DEFAULT_INSTRUMENT_PIANO = { name: "acoustic_grand_piano", isLoaded: false };
            SoundCipher.instrumentSoundMap.set(SoundCipher.PIANO, DEFAULT_INSTRUMENT_PIANO);
            SoundCipher.instrumentSoundMap.set(SoundCipher.XYLOPHONE, { name: "xylophone", isLoaded: false });
            SoundCipher.instrumentSoundMap.set(SoundCipher.ELECTRIC_GUITAR, { name: "electric_guitar_clean", isLoaded: false });
            SoundCipher.instrumentSoundMap.set(SoundCipher.ACOUSTIC_BASS, { name: "acoustic_bass", isLoaded: false });
            SoundCipher.instrumentSoundMap.set(SoundCipher.STRINGS, { name: "string_ensemble_1", isLoaded: false });
            SoundCipher.instrumentSoundMap.set(SoundCipher.ORCHESTRA_HIT, { name: "orchestra_hit", isLoaded: false });
            SoundCipher.instrumentSoundMap.set(SoundCipher.TRUMPET, { name: "trumpet", isLoaded: false });
            SoundCipher.instrumentSoundMap.set(SoundCipher.TUBA, { name: "tuba", isLoaded: false });
            SoundCipher.instrumentSoundMap.set(SoundCipher.BRASS, { name: "brass_section", isLoaded: false });
            SoundCipher.instrumentSoundMap.set(SoundCipher.ALTO_SAX, { name: "alto_sax", isLoaded: false });
            SoundCipher.instrumentSoundMap.set(SoundCipher.CLARINET, { name: "clarinet", isLoaded: false });
            SoundCipher.instrumentSoundMap.set(SoundCipher.FLUTE, { name: "flute", isLoaded: false });
            SoundCipher.instrumentSoundMap.set(SoundCipher.TAIKO, { name: "taiko_drum", isLoaded: false });
            SoundCipher.instrumentSoundMap.set(SoundCipher.SYNTH_DRUM, { name: "synth_drum", isLoaded: false });

            SoundCipher.instrumentSoundMap.set(SoundCipher.ELECTRIC_GRAND, { name: "electric_grand_piano", isLoaded: false }); /* 2 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.HONKYTONK, { name: "honkytonk_piano", isLoaded: false }); /* 3 */

            SoundCipher.instrumentSoundMap.set(SoundCipher.EPIANO, { name: "electric_piano_1", isLoaded: false }); /* 4 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.EPIANO2, { name: "electric_piano_2", isLoaded: false }); /* 5 */

            SoundCipher.instrumentSoundMap.set(SoundCipher.HARPSICHORD, { name: "harpsichord", isLoaded: false }); /* 6 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.CLAV, { name: "clavichord", isLoaded: false }); /* 7 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.CELESTE, { name: "celesta", isLoaded: false }); /* 8 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.GLOCKENSPIEL, { name: "glockenspiel", isLoaded: false }); /* 9 */

            SoundCipher.instrumentSoundMap.set(SoundCipher.MUSIC_BOX, { name: "music_box", isLoaded: false }); /* 10 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.VIBRAPHONE, { name: "vibraphone", isLoaded: false }); /* 11 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.MARIMBA, { name: "marimba", isLoaded: false }); /* 12 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.TUBULAR_BELL, { name: "tubular_bells", isLoaded: false }); /* 14 */

            SoundCipher.instrumentSoundMap.set(SoundCipher.ORGAN, { name: "rock_organ", isLoaded: false }); /* 16 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.ORGAN2, { name: "drawbar_organ", isLoaded: false }); /* 17 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.ORGAN3, { name: "percussive_organ", isLoaded: false }); /* 18 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.CHURCH_ORGAN, { name: "church_organ", isLoaded: false }); /* 19 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.REED_ORGAN, { name: "reed_organ", isLoaded: false }); /* 20 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.ACCORDION, { name: "accordion", isLoaded: false }); /* 21 */

            SoundCipher.instrumentSoundMap.set(SoundCipher.HARMONICA, { name: "harmonica", isLoaded: false }); /* 22 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.BANDNEON, { name: "xylophone", isLoaded: false }); /* 23 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.NYLON_GUITAR, { name: "acoustic_guitar_nylon", isLoaded: false }); /* 24 */

            SoundCipher.instrumentSoundMap.set(SoundCipher.STEEL_GUITAR, { name: "acoustic_guitar_steel", isLoaded: false }); /* 25 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.JAZZ_GUITAR, { name: "electric_guitar_jazz", isLoaded: false }); /* 26 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.MUTED_GUITAR, { name: "electric_guitar_muted", isLoaded: false }); /* 28 */

            SoundCipher.instrumentSoundMap.set(SoundCipher.OVERDRIVE_GUITAR, { name: "overdriven_guitar", isLoaded: false }); /* 29 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.DISTORTED_GUITAR, { name: "distortion_guitar", isLoaded: false }); /* 30 */

            SoundCipher.instrumentSoundMap.set(SoundCipher.GUITAR_HARMONICS, { name: "guitar_harmonics", isLoaded: false }); /* 31 */

            SoundCipher.instrumentSoundMap.set(SoundCipher.FINGERED_BASS, { name: "electric_bass_finger", isLoaded: false }); /* 33 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.PICKED_BASS, { name: "electric_bass_pick", isLoaded: false }); /* 34 */

            SoundCipher.instrumentSoundMap.set(SoundCipher.FRETLESS_BASS, { name: "fretless_bass", isLoaded: false }); /* 35 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.SLAP_BASS, { name: "slap_bass_1", isLoaded: false }); /* 36 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.SYNTH_BASS, { name: "synth_bass_1", isLoaded: false }); /* 38 */

            SoundCipher.instrumentSoundMap.set(SoundCipher.VIOLIN, { name: "violin", isLoaded: false }); /* 40 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.VIOLA, { name: "viola", isLoaded: false }); /* 41 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.CELLO, { name: "cello", isLoaded: false }); /* 42 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.CONTRABASS, { name: "contrabass", isLoaded: false }); /* 43 */

            SoundCipher.instrumentSoundMap.set(SoundCipher.TREMOLO_STRINGS, { name: "tremolo_strings", isLoaded: false }); /* 44 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.PIZZICATO_STRINGS, { name: "pizzicato_strings", isLoaded: false }); /* 45 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.HARP, { name: "harpsichord", isLoaded: false }); /* 46 */

            SoundCipher.instrumentSoundMap.set(SoundCipher.TIMPANI, { name: "timpani", isLoaded: false }); /* 47 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.SLOW_STRINGS, { name: "synthstrings_2", isLoaded: false }); /* 51 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.SYNTH_STRINGS, { name: "synthstrings_1", isLoaded: false }); /* 50 */

            SoundCipher.instrumentSoundMap.set(SoundCipher.AAH, { name: "choir_aahs", isLoaded: false }); /* 52 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.OOH, { name: "voice_oohs", isLoaded: false }); /* 53 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.SYNVOX, { name: "lead_6_voice", isLoaded: false }); /* 54 */

            SoundCipher.instrumentSoundMap.set(SoundCipher.TROMBONE, { name: "trombone", isLoaded: false }); /* 57 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.MUTED_TRUMPET, { name: "muted_trumpet", isLoaded: false }); /* 59 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.FRENCH_HORN, { name: "french_horn", isLoaded: false }); /* 60 */

            SoundCipher.instrumentSoundMap.set(SoundCipher.SYNTH_BRASS, { name: "synthbrass_1", isLoaded: false }); /* 62 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.SOPRANO_SAX, { name: "soprano_sax", isLoaded: false }); /* 64 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.TENOR_SAX, { name: "tenor_sax", isLoaded: false }); /* 66 */

            SoundCipher.instrumentSoundMap.set(SoundCipher.BARITONE_SAX, { name: "baritone_sax", isLoaded: false }); /* 67 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.OBOE, { name: "oboe", isLoaded: false }); /* 68 */
    
            SoundCipher.instrumentSoundMap.set(SoundCipher.ENGLISH_HORN, { name: "english_horn", isLoaded: false }); /* 69 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.BASSOON, { name: "bassoon", isLoaded: false }); /* 70 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.PICCOLO, { name: "piccolo", isLoaded: false }); /* 72 */
            
            SoundCipher.instrumentSoundMap.set(SoundCipher.RECORDER, { name: "recorder", isLoaded: false }); /* 74 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.PAN_FLUTE, { name: "pan_flute", isLoaded: false }); /* 75 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.BOTTLE_BLOW, { name: "blown_bottle", isLoaded: false }); /* 76 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.SHAKUHACHI, { name: "shakuhachi", isLoaded: false }); /* 77 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.WHISTLE, { name: "whistle", isLoaded: false }); /* 78 */
    
            SoundCipher.instrumentSoundMap.set(SoundCipher.OCARINA, { name: "ocarina", isLoaded: false }); /* 79 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.GMSQUARE_WAVE, { name: "lead_1_square", isLoaded: false }); /* 80 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.GMSAW_WAVE, { name: "lead_2_sawtooth", isLoaded: false }); /* 81 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.SYNTH_CALLIOPE, { name: "lead_3_calliope", isLoaded: false }); /* 82 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.CHIFFER_LEAD, { name: "lead_4_chiff", isLoaded: false }); /* 83 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.CHARANG, { name: "lead_5_charang", isLoaded: false }); /* 84 */
    
            SoundCipher.instrumentSoundMap.set(SoundCipher.SOLO_VOX, { name: "xylophone", isLoaded: false }); /* 85 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.FANTASIA, { name: "xylophone", isLoaded: false }); /* 88 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.WARM_PAD, { name: "pad_2_warm", isLoaded: false }); /* 89 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.POLYSYNTH, { name: "pad_3_polysynth", isLoaded: false }); /* 90 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.SPACE_VOICE, { name: "synth_voice", isLoaded: false }); /* 91 */
    
            SoundCipher.instrumentSoundMap.set(SoundCipher.BOWED_GLASS, { name: "pad_5_bowed", isLoaded: false }); /* 92 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.METAL_PAD, { name: "pad_6_metallic", isLoaded: false }); /* 93 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.HALO_PAD, { name: "pad_7_halo", isLoaded: false }); /* 94 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.SWEEP_PAD, { name: "pad_8_sweep", isLoaded: false }); /* 95 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.ICE_RAIN, { name: "xylophone", isLoaded: false }); /* 96 */
    
            SoundCipher.instrumentSoundMap.set(SoundCipher.SOUNDTRACK, { name: "fx_2_soundtrack", isLoaded: false }); /* 97 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.CRYSTAL, { name: "fx_3_crystal", isLoaded: false }); /* 98 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.ATMOSPHERE, { name: "fx_4_atmosphere", isLoaded: false }); /* 99 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.BRIGHTNESS, { name: "fx_5_brightness", isLoaded: false }); /* 100 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.GOBLIN, { name: "fx_6_goblins", isLoaded: false }); /* 101 */
    
            SoundCipher.instrumentSoundMap.set(SoundCipher.ECHO_DROPS, { name: "fx_7_echoes", isLoaded: false }); /* 102 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.STAR_THEME, { name: "fx_8_scifi", isLoaded: false }); /* 103 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.SITAR, { name: "sitar", isLoaded: false }); /* 104 */
    
            SoundCipher.instrumentSoundMap.set(SoundCipher.BANJO, { name: "banjo", isLoaded: false }); /* 105 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.SHAMISEN, { name: "shamisen", isLoaded: false }); /* 106 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.KOTO, { name: "koto", isLoaded: false }); /* 107 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.KALIMBA, { name: "kalimba", isLoaded: false }); /* 108 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.BAGPIPES, { name: "bag_pipe", isLoaded: false }); /* 109 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.FIDDLE, { name: "fiddle", isLoaded: false }); /* 110 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.SHANNAI, { name: "shanai", isLoaded: false }); /* 111 */
            SoundCipher.instrumentSoundMap.set(SoundCipher.TINKLE_BELL, { name: "tinkle_bell", isLoaded: false }); /* 112 */

            for (let i = 0; i < 128; i++) {
                if (!SoundCipher.instrumentSoundMap.has(i)) {
                    SoundCipher.instrumentSoundMap.set(i, DEFAULT_INSTRUMENT_PIANO);
                }
            }
        }

        static resetChannelCount() {
            SoundCipher.channelCount = 0;
            SoundCipher.openChannels = [];
        }

        static getInstrumentName(instrumentCode: number): string {
            if (SoundCipher.instrumentSoundMap.get(instrumentCode)) {
                return SoundCipher.instrumentSoundMap.get(instrumentCode).name;
            } else {
                return "No instrument found";
            }
        }

        private _instrument: number;

        get instrument(): number {
            return this._instrument;
        }

        set instrument(instrumentCode: number) {
            this._instrument = instrumentCode;
            initialized = initialized.then(() => {
                this.changeChannelInstrument(instrumentCode);
                if (!SoundCipher.instrumentSoundMap.get(instrumentCode).isLoaded) {
                    const instrumentName = SoundCipher.getInstrumentName(instrumentCode);
                    return new Promise<void>((resolve, reject) => {
                        log(`requesting instrument ${instrumentName} soundfontUrl: ${SoundFontUrl}`);
                        MIDI.loadResource(SoundCipher.getLoadInstrumentArgs(instrumentName, resolve));
                    });
                }
            });
        }

        public changeInstrument(instrumentCode: number) {
            this.instrument = instrumentCode;
        }

        async playNote(note: number, dynamic: number = DEFAULT_NOTE_VELOCITY, duration: number = 0.75) {
            log(`play note ${note} dynamic=${dynamic} duration=${duration} - WAITING`);

            await initialized;
            log('ready to play');

            // Check if MIDI channel not yet open
            if (SoundCipher.openChannels.indexOf(this.channel) == -1) {
                MIDI.programChange(this.channel, 0);
                SoundCipher.openChannels.push(this.channel);
            }

            // play the note
            MIDI.setVolume(this.channel, 127);
            MIDI.noteOn(this.channel, note, dynamic, DEFAULT_NOTE_DELAY);
            MIDI.noteOff(this.channel, note, DEFAULT_NOTE_DELAY + duration);

            // var beepAudio = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
            // beepAudio.play();
        }

        async playChord(notes: number[], dynamic: number = DEFAULT_NOTE_VELOCITY, duration: number = 0.75) {

            log(`play chord [${notes.join(',')}] dynamic=${dynamic} duration=${duration} - WAITING`);

            await initialized;
            log('ready to play chord');

            MIDI.setVolume(this.channel, 127);
            MIDI.chordOn(this.channel, notes, dynamic, DEFAULT_NOTE_DELAY);
            MIDI.chordOff(this.channel, notes, DEFAULT_NOTE_DELAY + duration);
        }


        static loadInstrument(instrumentCode: number) {
            return new Promise((resolve, reject) => {
                var instrumentName = SoundCipher.getInstrumentName(instrumentCode);
                log(`requesting instrument ${instrumentName} soundfontUrl: ${SoundFontUrl}`);
                MIDI.loadResource(SoundCipher.getLoadInstrumentArgs(instrumentName, resolve));
            });
        }

        private changeChannelInstrument(instrumentCode: number) {
            if (SoundCipher.openChannels.indexOf(this.channel) == -1) {
                SoundCipher.openChannels.push(this.channel);
                MIDI.programChange(this.channel, instrumentCode);
            } else {
                MIDI.programChange(this.channel, instrumentCode);
            }
        }

        static getLoadInstrumentArgs(instrumentName, onSuccess) {
            return {
                soundfontUrl: SoundFontUrl,
                instrument: instrumentName,
                onprogress: function (state, progress) {
                    log(`instrument [${instrumentName}] loading... state=${state} progress=${progress}`);
                },
                onsuccess: function () {
                    log(`instrument [${instrumentName}] loaded...`);
                    const instrumentCode = MIDI.GM.byName[instrumentName].number;
                    SoundCipher.instrumentSoundMap.set(instrumentCode, { name: instrumentName, isLoaded: true });
                    onSuccess();
                }
            }
        }
    }

    SoundCipher.initialize();

    function whenMidiLoaded(callback) {
        const interval = 10;
        if (typeof MIDI === 'undefined' || typeof MIDI.loadPlugin === 'undefined') {
            setTimeout(() => {
                whenMidiLoaded(callback);
            }, interval);
        } else {
            callback();
        }
    }

    if (!window['arb.soundcipher.SoundCipher__MIDIInitialized']) {
        window['arb.soundcipher.SoundCipher__MIDIInitialized'] = true;
        initialized = new Promise<void>((resolve, reject) => {
            const defaultInstrumentName: string = SoundCipher.getInstrumentName(SoundCipher.PIANO)
            const initialize = () => {
                MIDI.loadPlugin(SoundCipher.getLoadInstrumentArgs(defaultInstrumentName, resolve));
            }
            log('request SoundCipher initialization');
            if (document.readyState == 'complete') {
                whenMidiLoaded(initialize);
            } else {
                window.onload = initialize;
            }
        });
    }

    function log(message: string) {
        console.info(`SoundCipher: ${message}`);
    }
}
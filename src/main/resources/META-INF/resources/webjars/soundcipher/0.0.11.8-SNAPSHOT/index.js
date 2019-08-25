var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const SoundFontUrl = window['SoundCipher__SoundFontUrl'] || '/resources/soundfont/';
var arb;
(function (arb) {
    var soundcipher;
    (function (soundcipher) {
        let initialized = Promise.resolve();
        const DEFAULT_NOTE_DELAY = 0;
        const DEFAULT_NOTE_VELOCITY = 127;
        class SoundCipher {
            constructor() {
                this.channel = SoundCipher.channelCount;
                if (SoundCipher.channelCount >= 0 && SoundCipher.channelCount <= SoundCipher.MAX_CHANNEL) {
                    SoundCipher.channelCount++;
                }
                else {
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
                SoundCipher.instrumentSoundMap.set(SoundCipher.ELECTRIC_GRAND, { name: "electric_grand_piano", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.HONKYTONK, { name: "honkytonk_piano", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.EPIANO, { name: "electric_piano_1", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.EPIANO2, { name: "electric_piano_2", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.HARPSICHORD, { name: "harpsichord", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.CLAV, { name: "clavinet", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.CELESTE, { name: "celesta", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.GLOCKENSPIEL, { name: "glockenspiel", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.MUSIC_BOX, { name: "music_box", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.VIBRAPHONE, { name: "vibraphone", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.MARIMBA, { name: "marimba", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.TUBULAR_BELL, { name: "tubular_bells", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.ORGAN, { name: "rock_organ", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.ORGAN2, { name: "drawbar_organ", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.ORGAN3, { name: "percussive_organ", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.CHURCH_ORGAN, { name: "church_organ", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.REED_ORGAN, { name: "reed_organ", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.ACCORDION, { name: "accordion", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.HARMONICA, { name: "harmonica", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.BANDNEON, { name: "xylophone", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.NYLON_GUITAR, { name: "acoustic_guitar_nylon", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.STEEL_GUITAR, { name: "acoustic_guitar_steel", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.JAZZ_GUITAR, { name: "electric_guitar_jazz", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.MUTED_GUITAR, { name: "electric_guitar_muted", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.OVERDRIVE_GUITAR, { name: "overdriven_guitar", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.DISTORTED_GUITAR, { name: "distortion_guitar", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.GUITAR_HARMONICS, { name: "guitar_harmonics", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.FINGERED_BASS, { name: "electric_bass_finger", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.PICKED_BASS, { name: "electric_bass_pick", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.FRETLESS_BASS, { name: "fretless_bass", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.SLAP_BASS, { name: "slap_bass_1", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.SYNTH_BASS, { name: "synth_bass_1", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.VIOLIN, { name: "violin", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.VIOLA, { name: "viola", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.CELLO, { name: "cello", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.CONTRABASS, { name: "contrabass", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.TREMOLO_STRINGS, { name: "tremolo_strings", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.PIZZICATO_STRINGS, { name: "pizzicato_strings", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.HARP, { name: "harpsichord", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.TIMPANI, { name: "timpani", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.SLOW_STRINGS, { name: "synth_strings_2", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.SYNTH_STRINGS, { name: "synth_strings_1", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.AAH, { name: "choir_aahs", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.OOH, { name: "voice_oohs", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.SYNVOX, { name: "lead_6_voice", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.TROMBONE, { name: "trombone", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.MUTED_TRUMPET, { name: "muted_trumpet", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.FRENCH_HORN, { name: "french_horn", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.SYNTH_BRASS, { name: "synth_brass_1", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.SOPRANO_SAX, { name: "soprano_sax", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.TENOR_SAX, { name: "tenor_sax", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.BARITONE_SAX, { name: "baritone_sax", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.OBOE, { name: "oboe", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.ENGLISH_HORN, { name: "english_horn", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.BASSOON, { name: "bassoon", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.PICCOLO, { name: "piccolo", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.RECORDER, { name: "recorder", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.PAN_FLUTE, { name: "pan_flute", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.BOTTLE_BLOW, { name: "blown_bottle", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.SHAKUHACHI, { name: "shakuhachi", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.WHISTLE, { name: "whistle", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.OCARINA, { name: "ocarina", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.GMSQUARE_WAVE, { name: "lead_1_square", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.GMSAW_WAVE, { name: "lead_2_sawtooth", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.SYNTH_CALLIOPE, { name: "lead_3_calliope", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.CHIFFER_LEAD, { name: "lead_4_chiff", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.CHARANG, { name: "lead_5_charang", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.SOLO_VOX, { name: "xylophone", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.FANTASIA, { name: "xylophone", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.WARM_PAD, { name: "pad_2_warm", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.POLYSYNTH, { name: "pad_3_polysynth", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.SPACE_VOICE, { name: "polysynth", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.BOWED_GLASS, { name: "pad_5_bowed", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.METAL_PAD, { name: "pad_6_metallic", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.HALO_PAD, { name: "pad_7_halo", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.SWEEP_PAD, { name: "pad_8_sweep", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.ICE_RAIN, { name: "xylophone", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.SOUNDTRACK, { name: "fx_2_soundtrack", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.CRYSTAL, { name: "fx_3_crystal", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.ATMOSPHERE, { name: "fx_4_atmosphere", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.BRIGHTNESS, { name: "fx_5_brightness", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.GOBLIN, { name: "fx_6_goblins", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.ECHO_DROPS, { name: "fx_7_echoes", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.STAR_THEME, { name: "fx_8_scifi", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.SITAR, { name: "sitar", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.BANJO, { name: "banjo", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.SHAMISEN, { name: "shamisen", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.KOTO, { name: "koto", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.KALIMBA, { name: "kalimba", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.BAGPIPES, { name: "bagpipe", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.FIDDLE, { name: "fiddle", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.SHANNAI, { name: "shanai", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.TINKLE_BELL, { name: "tinkle_bell", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.AGOGO, { name: "agogo", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.STEEL_DRUMS, { name: "steel_drums", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.WOODBLOCK, { name: "woodblock", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.TOM, { name: "reverse_cymbal", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.FRETNOISE, { name: "guitar_fret_noise", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.BREATHNOISE, { name: "breath_noise", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.SEASHORE, { name: "seashore", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.BIRD, { name: "bird_tweet", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.TELEPHONE, { name: "telephone_ring", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.HELICOPTER, { name: "helicopter", isLoaded: false });
                SoundCipher.instrumentSoundMap.set(SoundCipher.APPLAUSE, { name: "applause", isLoaded: false });
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
            static getInstrumentName(instrumentCode) {
                if (SoundCipher.instrumentSoundMap.get(instrumentCode)) {
                    return SoundCipher.instrumentSoundMap.get(instrumentCode).name;
                }
                else {
                    return "No instrument found";
                }
            }
            get instrument() {
                return this._instrument;
            }
            set instrument(instrumentCode) {
                this._instrument = instrumentCode;
                initialized = initialized.then(() => {
                    this.changeChannelInstrument(instrumentCode);
                    if (!SoundCipher.instrumentSoundMap.get(instrumentCode).isLoaded) {
                        const instrumentName = SoundCipher.getInstrumentName(instrumentCode);
                        return new Promise((resolve, reject) => {
                            log(`requesting instrument ${instrumentName} soundfontUrl: ${SoundFontUrl}`);
                            MIDI.loadResource(SoundCipher.getLoadInstrumentArgs(instrumentName, resolve));
                        });
                    }
                });
            }
            changeInstrument(instrumentCode) {
                this.instrument = instrumentCode;
            }
            playNote(note, dynamic = DEFAULT_NOTE_VELOCITY, duration = 0.75) {
                return __awaiter(this, void 0, void 0, function* () {
                    log(`play note ${note} dynamic=${dynamic} duration=${duration} - WAITING`);
                    yield initialized;
                    log('ready to play');
                    if (SoundCipher.openChannels.indexOf(this.channel) == -1) {
                        MIDI.programChange(this.channel, 0);
                        SoundCipher.openChannels.push(this.channel);
                    }
                    MIDI.setVolume(this.channel, 127);
                    MIDI.noteOn(this.channel, note, dynamic, DEFAULT_NOTE_DELAY);
                    MIDI.noteOff(this.channel, note, DEFAULT_NOTE_DELAY + duration);
                });
            }
            playChord(notes, dynamic = DEFAULT_NOTE_VELOCITY, duration = 0.75) {
                return __awaiter(this, void 0, void 0, function* () {
                    log(`play chord [${notes.join(',')}] dynamic=${dynamic} duration=${duration} - WAITING`);
                    yield initialized;
                    log('ready to play chord');
                    MIDI.setVolume(this.channel, 127);
                    MIDI.chordOn(this.channel, notes, dynamic, DEFAULT_NOTE_DELAY);
                    MIDI.chordOff(this.channel, notes, DEFAULT_NOTE_DELAY + duration);
                });
            }
            static loadInstrument(instrumentCode) {
                return new Promise((resolve, reject) => {
                    var instrumentName = SoundCipher.getInstrumentName(instrumentCode);
                    log(`requesting instrument ${instrumentName} soundfontUrl: ${SoundFontUrl}`);
                    MIDI.loadResource(SoundCipher.getLoadInstrumentArgs(instrumentName, resolve));
                });
            }
            changeChannelInstrument(instrumentCode) {
                if (SoundCipher.openChannels.indexOf(this.channel) == -1) {
                    SoundCipher.openChannels.push(this.channel);
                    MIDI.programChange(this.channel, instrumentCode);
                }
                else {
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
                };
            }
        }
        SoundCipher.ACOUSTIC_BASS_DRUM = 35;
        SoundCipher.BASS_DRUM = 36;
        SoundCipher.KICK = 36;
        SoundCipher.KICK_DRUM = 36;
        SoundCipher.SIDE_STICK = 37;
        SoundCipher.ACOUSTIC_SNARE = 38;
        SoundCipher.SNARE = 38;
        SoundCipher.SNARE_DRUM = 38;
        SoundCipher.HAND_CLAP = 39;
        SoundCipher.ELECTRIC_SNARE = 40;
        SoundCipher.LOW_FLOOR_TOM = 41;
        SoundCipher.CLOSED_HI_HAT = 42;
        SoundCipher.HIHAT = 42;
        SoundCipher.HI_HAT = 42;
        SoundCipher.HIGH_FLOOR_TOM = 43;
        SoundCipher.PEDAL_HI_HAT = 44;
        SoundCipher.LOW_TOM = 45;
        SoundCipher.OPEN_HI_HAT = 46;
        SoundCipher.LOW_MID_TOM = 47;
        SoundCipher.HI_MID_TOM = 48;
        SoundCipher.CRASH_CYMBAL_1 = 49;
        SoundCipher.CRASH = 49;
        SoundCipher.HIGH_TOM = 50;
        SoundCipher.RIDE_CYMBAL_1 = 51;
        SoundCipher.RIDE = 51;
        SoundCipher.CHINESE_CYMBAL = 52;
        SoundCipher.RIDE_BELL = 53;
        SoundCipher.TAMBOURINE = 54;
        SoundCipher.SPLASH_CYMBAL = 55;
        SoundCipher.COWBELL = 56;
        SoundCipher.CRASH_CYMBAL_2 = 57;
        SoundCipher.VIBRASLAP = 58;
        SoundCipher.RIDE_CYMBAL_2 = 59;
        SoundCipher.HI_BONGO = 60;
        SoundCipher.LOW_BONGO = 61;
        SoundCipher.MUTE_HI_CONGA = 62;
        SoundCipher.OPEN_HI_CONGA = 63;
        SoundCipher.LOW_CONGA = 64;
        SoundCipher.HIGH_TIMBALE = 65;
        SoundCipher.LOW_TIMBALE = 66;
        SoundCipher.HIGH_AGOGO = 67;
        SoundCipher.LOW_AGOGO = 68;
        SoundCipher.CABASA = 69;
        SoundCipher.MARACAS = 70;
        SoundCipher.SHORT_WHISTLE = 71;
        SoundCipher.LONG_WHISTLE = 72;
        SoundCipher.SHORT_GUIRO = 73;
        SoundCipher.LONG_GUIRO = 74;
        SoundCipher.CLAVES = 75;
        SoundCipher.HI_WOOD_BLOCK = 76;
        SoundCipher.LOW_WOOD_BLOCK = 77;
        SoundCipher.MUTE_CUICA = 78;
        SoundCipher.OPEN_CUICA = 79;
        SoundCipher.MUTE_TRIANGLE = 80;
        SoundCipher.OPEN_TRIANGLE = 81;
        SoundCipher.TRIANGLE = 81;
        SoundCipher.PIANO = 0;
        SoundCipher.ACOUSTIC_GRAND = 0;
        SoundCipher.BRIGHT_ACOUSTIC = 1;
        SoundCipher.ELECTRIC_GRAND = 2;
        SoundCipher.HONKYTONK = 3;
        SoundCipher.HONKYTONK_PIANO = 3;
        SoundCipher.EPIANO = 4;
        SoundCipher.ELECTRIC_PIANO = 4;
        SoundCipher.ELPIANO = 4;
        SoundCipher.RHODES = 4;
        SoundCipher.EPIANO2 = 5;
        SoundCipher.DX_EPIANO = 5;
        SoundCipher.HARPSICHORD = 6;
        SoundCipher.CLAV = 7;
        SoundCipher.CLAVINET = 7;
        SoundCipher.CELESTE = 8;
        SoundCipher.CELESTA = 8;
        SoundCipher.GLOCKENSPIEL = 9;
        SoundCipher.GLOCK = 9;
        SoundCipher.MUSIC_BOX = 10;
        SoundCipher.VIBRAPHONE = 11;
        SoundCipher.VIBES = 11;
        SoundCipher.MARIMBA = 12;
        SoundCipher.XYLOPHONE = 13;
        SoundCipher.TUBULAR_BELL = 14;
        SoundCipher.TUBULAR_BELLS = 14;
        SoundCipher.ORGAN = 16;
        SoundCipher.ELECTRIC_ORGAN = 16;
        SoundCipher.ORGAN2 = 17;
        SoundCipher.JAZZ_ORGAN = 17;
        SoundCipher.ORGAN3 = 18;
        SoundCipher.HAMMOND_ORGAN = 17;
        SoundCipher.CHURCH_ORGAN = 19;
        SoundCipher.PIPE_ORGAN = 19;
        SoundCipher.REED_ORGAN = 20;
        SoundCipher.ACCORDION = 21;
        SoundCipher.PIANO_ACCORDION = 21;
        SoundCipher.CONCERTINA = 21;
        SoundCipher.HARMONICA = 22;
        SoundCipher.BANDNEON = 23;
        SoundCipher.NYLON_GUITAR = 24;
        SoundCipher.NGUITAR = 24;
        SoundCipher.GUITAR = 24;
        SoundCipher.ACOUSTIC_GUITAR = 24;
        SoundCipher.AC_GUITAR = 24;
        SoundCipher.STEEL_GUITAR = 25;
        SoundCipher.SGUITAR = 25;
        SoundCipher.JAZZ_GUITAR = 26;
        SoundCipher.JGUITAR = 26;
        SoundCipher.CLEAN_GUITAR = 27;
        SoundCipher.CGUITAR = 27;
        SoundCipher.ELECTRIC_GUITAR = 27;
        SoundCipher.EL_GUITAR = 27;
        SoundCipher.MUTED_GUITAR = 28;
        SoundCipher.MGUITAR = 28;
        SoundCipher.OVERDRIVE_GUITAR = 29;
        SoundCipher.OGUITAR = 29;
        SoundCipher.DISTORTED_GUITAR = 30;
        SoundCipher.DGUITAR = 30;
        SoundCipher.DIST_GUITAR = 30;
        SoundCipher.GUITAR_HARMONICS = 31;
        SoundCipher.GT_HARMONICS = 31;
        SoundCipher.HARMONICS = 31;
        SoundCipher.ACOUSTIC_BASS = 32;
        SoundCipher.ABASS = 32;
        SoundCipher.FINGERED_BASS = 33;
        SoundCipher.BASS = 33;
        SoundCipher.FBASS = 33;
        SoundCipher.ELECTRIC_BASS = 33;
        SoundCipher.EL_BASS = 33;
        SoundCipher.EBASS = 33;
        SoundCipher.PICKED_BASS = 34;
        SoundCipher.PBASS = 34;
        SoundCipher.FRETLESS_BASS = 35;
        SoundCipher.FRETLESS = 35;
        SoundCipher.SLAP_BASS = 36;
        SoundCipher.SBASS = 36;
        SoundCipher.SLAP = 36;
        SoundCipher.SYNTH_BASS = 38;
        SoundCipher.VIOLIN = 40;
        SoundCipher.VIOLA = 41;
        SoundCipher.CELLO = 42;
        SoundCipher.VIOLIN_CELLO = 42;
        SoundCipher.CONTRABASS = 43;
        SoundCipher.CONTRA_BASS = 43;
        SoundCipher.DOUBLE_BASS = 43;
        SoundCipher.TREMOLO_STRINGS = 44;
        SoundCipher.TREMOLO = 44;
        SoundCipher.PIZZICATO_STRINGS = 45;
        SoundCipher.PIZZ = 45;
        SoundCipher.PITZ = 45;
        SoundCipher.PSTRINGS = 45;
        SoundCipher.HARP = 46;
        SoundCipher.TIMPANI = 47;
        SoundCipher.TIMP = 47;
        SoundCipher.STRINGS = 48;
        SoundCipher.STR = 48;
        SoundCipher.SLOW_STRINGS = 51;
        SoundCipher.SYNTH_STRINGS = 50;
        SoundCipher.SYN_STRINGS = 50;
        SoundCipher.AAH = 52;
        SoundCipher.AHHS = 52;
        SoundCipher.CHOIR = 52;
        SoundCipher.OOH = 53;
        SoundCipher.OOHS = 53;
        SoundCipher.VOICE = 53;
        SoundCipher.SYNVOX = 54;
        SoundCipher.VOX = 54;
        SoundCipher.ORCHESTRA_HIT = 55;
        SoundCipher.TRUMPET = 56;
        SoundCipher.TROMBONE = 57;
        SoundCipher.TUBA = 58;
        SoundCipher.MUTED_TRUMPET = 59;
        SoundCipher.FRENCH_HORN = 60;
        SoundCipher.HORN = 60;
        SoundCipher.BRASS = 61;
        SoundCipher.SYNTH_BRASS = 62;
        SoundCipher.SOPRANO_SAX = 64;
        SoundCipher.SOPRANO = 64;
        SoundCipher.SOPRANO_SAXOPHONE = 64;
        SoundCipher.SOP = 64;
        SoundCipher.ALTO_SAX = 65;
        SoundCipher.ALTO = 65;
        SoundCipher.ALTO_SAXOPHONE = 65;
        SoundCipher.TENOR_SAX = 66;
        SoundCipher.TENOR = 66;
        SoundCipher.TENOR_SAXOPHONE = 66;
        SoundCipher.SAX = 66;
        SoundCipher.SAXOPHONE = 66;
        SoundCipher.BARITONE_SAX = 67;
        SoundCipher.BARI = 67;
        SoundCipher.BARI_SAX = 67;
        SoundCipher.BARITONE = 67;
        SoundCipher.BARITONE_SAXOPHONE = 67;
        SoundCipher.OBOE = 68;
        SoundCipher.ENGLISH_HORN = 69;
        SoundCipher.BASSOON = 70;
        SoundCipher.CLARINET = 71;
        SoundCipher.CLAR = 71;
        SoundCipher.PICCOLO = 72;
        SoundCipher.PIC = 72;
        SoundCipher.PICC = 72;
        SoundCipher.FLUTE = 73;
        SoundCipher.RECORDER = 74;
        SoundCipher.PAN_FLUTE = 75;
        SoundCipher.PANFLUTE = 75;
        SoundCipher.BOTTLE_BLOW = 76;
        SoundCipher.BOTTLE = 76;
        SoundCipher.SHAKUHACHI = 77;
        SoundCipher.WHISTLE = 78;
        SoundCipher.OCARINA = 79;
        SoundCipher.GMSQUARE_WAVE = 80;
        SoundCipher.SQUARE = 80;
        SoundCipher.GMSAW_WAVE = 81;
        SoundCipher.SAW = 81;
        SoundCipher.SAWTOOTH = 81;
        SoundCipher.SYNTH_CALLIOPE = 82;
        SoundCipher.CALLOPE = 82;
        SoundCipher.SYN_CALLIOPE = 82;
        SoundCipher.CHIFFER_LEAD = 83;
        SoundCipher.CHIFFER = 83;
        SoundCipher.CHARANG = 84;
        SoundCipher.SOLO_VOX = 85;
        SoundCipher.FANTASIA = 88;
        SoundCipher.WARM_PAD = 89;
        SoundCipher.PAD = 89;
        SoundCipher.POLYSYNTH = 90;
        SoundCipher.POLY_SYNTH = 90;
        SoundCipher.SPACE_VOICE = 91;
        SoundCipher.BOWED_GLASS = 92;
        SoundCipher.METAL_PAD = 93;
        SoundCipher.HALO_PAD = 94;
        SoundCipher.HALO = 94;
        SoundCipher.SWEEP_PAD = 95;
        SoundCipher.SWEEP = 95;
        SoundCipher.ICE_RAIN = 96;
        SoundCipher.ICERAIN = 96;
        SoundCipher.SOUNDTRACK = 97;
        SoundCipher.CRYSTAL = 98;
        SoundCipher.ATMOSPHERE = 99;
        SoundCipher.BRIGHTNESS = 100;
        SoundCipher.GOBLIN = 101;
        SoundCipher.ECHO_DROPS = 102;
        SoundCipher.DROPS = 102;
        SoundCipher.ECHOS = 102;
        SoundCipher.ECHO = 102;
        SoundCipher.ECHO_DROP = 102;
        SoundCipher.STAR_THEME = 103;
        SoundCipher.SITAR = 104;
        SoundCipher.BANJO = 105;
        SoundCipher.SHAMISEN = 106;
        SoundCipher.KOTO = 107;
        SoundCipher.KALIMBA = 108;
        SoundCipher.THUMB_PIANO = 108;
        SoundCipher.BAGPIPES = 109;
        SoundCipher.BAG_PIPES = 109;
        SoundCipher.BAGPIPE = 109;
        SoundCipher.PIPES = 109;
        SoundCipher.FIDDLE = 110;
        SoundCipher.SHANNAI = 111;
        SoundCipher.TINKLE_BELL = 112;
        SoundCipher.BELL = 112;
        SoundCipher.BELLS = 112;
        SoundCipher.AGOGO = 113;
        SoundCipher.STEEL_DRUMS = 114;
        SoundCipher.STEELDRUMS = 114;
        SoundCipher.STEELDRUM = 114;
        SoundCipher.STEEL_DRUM = 114;
        SoundCipher.WOODBLOCK = 115;
        SoundCipher.WOODBLOCKS = 115;
        SoundCipher.TAIKO = 116;
        SoundCipher.DRUM = 116;
        SoundCipher.TOM = 119;
        SoundCipher.TOMS = 119;
        SoundCipher.TOM_TOM = 119;
        SoundCipher.TOM_TOMS = 119;
        SoundCipher.SYNTH_DRUM = 118;
        SoundCipher.SYNTH_DRUMS = 118;
        SoundCipher.REVERSE_CYMBAL = 119;
        SoundCipher.CYMBAL = 119;
        SoundCipher.FRETNOISE = 120;
        SoundCipher.FRET_NOISE = 120;
        SoundCipher.FRET = 120;
        SoundCipher.FRETS = 120;
        SoundCipher.BREATHNOISE = 121;
        SoundCipher.BREATH = 121;
        SoundCipher.SEASHORE = 122;
        SoundCipher.SEA = 122;
        SoundCipher.RAIN = 122;
        SoundCipher.THUNDER = 122;
        SoundCipher.WIND = 122;
        SoundCipher.STREAM = 122;
        SoundCipher.SFX = 122;
        SoundCipher.SOUNDEFFECTS = 122;
        SoundCipher.SOUNDFX = 122;
        SoundCipher.BIRD = 123;
        SoundCipher.TELEPHONE = 124;
        SoundCipher.PHONE = 124;
        SoundCipher.HELICOPTER = 125;
        SoundCipher.APPLAUSE = 126;
        SoundCipher.channelCount = 0;
        SoundCipher.MAX_CHANNEL = 16;
        SoundCipher.maxChannelErrorHandler = () => { };
        SoundCipher.instrumentSoundMap = new Map();
        SoundCipher.openChannels = [];
        soundcipher.SoundCipher = SoundCipher;
        SoundCipher.initialize();
        function whenMidiLoaded(callback) {
            const interval = 10;
            if (typeof MIDI === 'undefined' || typeof MIDI.loadPlugin === 'undefined') {
                setTimeout(() => {
                    whenMidiLoaded(callback);
                }, interval);
            }
            else {
                callback();
            }
        }
        if (!window['arb.soundcipher.SoundCipher__MIDIInitialized']) {
            window['arb.soundcipher.SoundCipher__MIDIInitialized'] = true;
            initialized = new Promise((resolve, reject) => {
                const defaultInstrumentName = SoundCipher.getInstrumentName(SoundCipher.PIANO);
                const initialize = () => {
                    MIDI.loadPlugin(SoundCipher.getLoadInstrumentArgs(defaultInstrumentName, resolve));
                };
                log('request SoundCipher initialization');
                if (document.readyState == 'complete') {
                    whenMidiLoaded(initialize);
                }
                else {
                    window.onload = initialize;
                }
            });
        }
        function log(message) {
            console.info(`SoundCipher: ${message}`);
        }
    })(soundcipher = arb.soundcipher || (arb.soundcipher = {}));
})(arb || (arb = {}));
//# sourceMappingURL=index.js.map
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const SoundFontUrl = window['arb.ktsoundcipher.KTSoundCipher__SoundFontUrl'] || '/resources/soundfont/';
var arb;
(function (arb) {
    var ktsoundcipher;
    (function (ktsoundcipher) {
        let initialized = Promise.resolve();
        const DEFAULT_NOTE_DELAY = 0;
        const DEFAULT_NOTE_VELOCITY = 127;
        class KTSoundCipher {
            constructor() {
                this.channel = KTSoundCipher.count;
                if (KTSoundCipher.count >= 0 && KTSoundCipher.count < 16) {
                    KTSoundCipher.count++;
                }
                else {
                    if (coderBetaController !== 'undefined') {
                        coderBetaController.coderBeta.processingCompiler.displayRuntimeError('Too many KTSoundCipher instances... there can only be a maximum of 16');
                    }
                    else {
                        KTSoundCipher.count = 0;
                    }
                }
            }
            static initialize() {
                KTSoundCipher.instrumentSoundMap.set(KTSoundCipher.PIANO, "acoustic_grand_piano");
                KTSoundCipher.instrumentSoundMap.set(KTSoundCipher.XYLOPHONE, "xylophone");
                KTSoundCipher.instrumentSoundMap.set(KTSoundCipher.ELECTRIC_GUITAR, "electric_guitar_clean");
                KTSoundCipher.instrumentSoundMap.set(KTSoundCipher.ACOUSTIC_BASS, "acoustic_bass");
                KTSoundCipher.instrumentSoundMap.set(KTSoundCipher.STRINGS, "string_ensemble_1");
                KTSoundCipher.instrumentSoundMap.set(KTSoundCipher.ORCHESTRA_HIT, "orchestra_hit");
                KTSoundCipher.instrumentSoundMap.set(KTSoundCipher.TRUMPET, "trumpet");
                KTSoundCipher.instrumentSoundMap.set(KTSoundCipher.TUBA, "tuba");
                KTSoundCipher.instrumentSoundMap.set(KTSoundCipher.BRASS, "brass_section");
                KTSoundCipher.instrumentSoundMap.set(KTSoundCipher.ALTO_SAX, "alto_sax");
                KTSoundCipher.instrumentSoundMap.set(KTSoundCipher.CLARINET, "clarinet");
                KTSoundCipher.instrumentSoundMap.set(KTSoundCipher.FLUTE, "flute");
                KTSoundCipher.instrumentSoundMap.set(KTSoundCipher.TAIKO, "taiko_drum");
                KTSoundCipher.instrumentSoundMap.set(KTSoundCipher.SYNTH_DRUM, "synth_drum");
            }
            static getInstrumentName(soundCipherInstrumentCode) {
                if (KTSoundCipher.instrumentSoundMap.get(soundCipherInstrumentCode)) {
                    return KTSoundCipher.instrumentSoundMap.get(soundCipherInstrumentCode);
                }
                else {
                    return KTSoundCipher.instrumentSoundMap.get(KTSoundCipher.PIANO);
                }
            }
            get instrument() {
                return this._instrument;
            }
            set instrument(instrumentCode) {
                this._instrument = instrumentCode;
                initialized = initialized.then(() => {
                    this.changeChannelInstrument(instrumentCode);
                    const instrumentName = KTSoundCipher.getInstrumentName(instrumentCode);
                    return new Promise((resolve, reject) => {
                        log(`requesting instrument ${instrumentName} soundfontUrl: ${SoundFontUrl}`);
                        MIDI.loadResource(KTSoundCipher.getLoadInstrumentArgs(instrumentName, resolve));
                    });
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
                    if ((KTSoundCipher.openChannels.length) <= this.channel) {
                        MIDI.programChange(this.channel, 0);
                        KTSoundCipher.openChannels.push(this.channel);
                    }
                    MIDI.setVolume(this.channel, 127);
                    MIDI.noteOn(this.channel, note, DEFAULT_NOTE_VELOCITY, DEFAULT_NOTE_DELAY);
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
                    var instrumentName = KTSoundCipher.getInstrumentName(instrumentCode);
                    log(`requesting instrument ${instrumentName} soundfontUrl: ${SoundFontUrl}`);
                    MIDI.loadResource(KTSoundCipher.getLoadInstrumentArgs(instrumentName, resolve));
                });
            }
            changeChannelInstrument(instrumentCode) {
                if ((KTSoundCipher.openChannels.length) <= this.channel) {
                    KTSoundCipher.openChannels.push(this.channel);
                    MIDI.programChange(this.channel, instrumentCode);
                }
                else {
                    MIDI.programChange(this.channel, instrumentCode);
                }
            }
            static getLoadInstrumentArgs(instrumentNames, onSuccess) {
                return {
                    soundfontUrl: SoundFontUrl,
                    instrument: instrumentNames,
                    onprogress: function (state, progress) {
                        let instrumentName = instrumentNames;
                        log(`instrument [${instrumentName}] loading... state=${state} progress=${progress}`);
                    },
                    onsuccess: function () {
                        let instrumentName = instrumentNames;
                        log(`instrument [${instrumentName}] loaded...`);
                        onSuccess();
                    }
                };
            }
        }
        KTSoundCipher.PIANO = 0;
        KTSoundCipher.XYLOPHONE = 13;
        KTSoundCipher.ELECTRIC_GUITAR = 27;
        KTSoundCipher.ACOUSTIC_BASS = 32;
        KTSoundCipher.STRINGS = 48;
        KTSoundCipher.ORCHESTRA_HIT = 55;
        KTSoundCipher.TRUMPET = 56;
        KTSoundCipher.TUBA = 58;
        KTSoundCipher.BRASS = 61;
        KTSoundCipher.ALTO_SAX = 65;
        KTSoundCipher.CLARINET = 71;
        KTSoundCipher.FLUTE = 73;
        KTSoundCipher.TAIKO = 116;
        KTSoundCipher.SYNTH_DRUM = 118;
        KTSoundCipher.count = 0;
        KTSoundCipher.instrumentSoundMap = new Map();
        KTSoundCipher.openChannels = [];
        ktsoundcipher.KTSoundCipher = KTSoundCipher;
        KTSoundCipher.initialize();
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
        if (!window['arb.ktsoundcipher.KTSoundCipher__MIDIInitialized']) {
            window['arb.ktsoundcipher.KTSoundCipher__MIDIInitialized'] = true;
            initialized = new Promise((resolve, reject) => {
                const defaultInstrumentName = KTSoundCipher.getInstrumentName(KTSoundCipher.PIANO);
                const initialize = () => {
                    MIDI.loadPlugin(KTSoundCipher.getLoadInstrumentArgs(defaultInstrumentName, resolve));
                };
                log('request KTSoundCipher initialization');
                if (document.readyState == 'complete') {
                    whenMidiLoaded(initialize);
                }
                else {
                    window.onload = initialize;
                }
            });
        }
        function log(message) {
            console.info(`KTSoundCipher: ${message}`);
        }
    })(ktsoundcipher = arb.ktsoundcipher || (arb.ktsoundcipher = {}));
})(arb || (arb = {}));
//# sourceMappingURL=index.js.map
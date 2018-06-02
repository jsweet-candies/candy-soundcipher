var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const SoundFontUrl = window['arb.soundcipher.SoundCipher__SoundFontUrl'] || '/resources/soundfont/';
var arb;
(function (arb) {
    var soundcipher;
    (function (soundcipher) {
        let initialized = Promise.resolve();
        const DEFAULT_NOTE_DELAY = 0;
        const DEFAULT_NOTE_VELOCITY = 127;
        class SoundCipher {
            constructor() {
                this.channel = SoundCipher.count;
                console.log('NEW SOUNDCIPHER!!!: channel #', SoundCipher.count);
                if (SoundCipher.count >= 0 && SoundCipher.count < 16) {
                    SoundCipher.count++;
                }
                else {
                    if (coderBetaController !== 'undefined') {
                        coderBetaController.coderBeta.processingCompiler.displayRuntimeError('Too many SoundCipher instances... there can only be a maximum of 16');
                    }
                    else {
                        SoundCipher.count = 0;
                    }
                }
            }
            static initialize() {
                SoundCipher.instrumentSoundMap.set(SoundCipher.PIANO, "acoustic_grand_piano");
                SoundCipher.instrumentSoundMap.set(SoundCipher.XYLOPHONE, "xylophone");
                SoundCipher.instrumentSoundMap.set(SoundCipher.ELECTRIC_GUITAR, "electric_guitar_clean");
                SoundCipher.instrumentSoundMap.set(SoundCipher.ACOUSTIC_BASS, "acoustic_bass");
                SoundCipher.instrumentSoundMap.set(SoundCipher.STRINGS, "string_ensemble_1");
                SoundCipher.instrumentSoundMap.set(SoundCipher.ORCHESTRA_HIT, "orchestra_hit");
                SoundCipher.instrumentSoundMap.set(SoundCipher.TRUMPET, "trumpet");
                SoundCipher.instrumentSoundMap.set(SoundCipher.TUBA, "tuba");
                SoundCipher.instrumentSoundMap.set(SoundCipher.BRASS, "brass_section");
                SoundCipher.instrumentSoundMap.set(SoundCipher.ALTO_SAX, "alto_sax");
                SoundCipher.instrumentSoundMap.set(SoundCipher.CLARINET, "clarinet");
                SoundCipher.instrumentSoundMap.set(SoundCipher.FLUTE, "flute");
                SoundCipher.instrumentSoundMap.set(SoundCipher.TAIKO, "taiko_drum");
                SoundCipher.instrumentSoundMap.set(SoundCipher.SYNTH_DRUM, "synth_drum");
            }
            static getInstrumentName(soundCipherInstrumentCode) {
                if (SoundCipher.instrumentSoundMap.get(soundCipherInstrumentCode)) {
                    return SoundCipher.instrumentSoundMap.get(soundCipherInstrumentCode);
                }
                else {
                    return SoundCipher.instrumentSoundMap.get(SoundCipher.PIANO);
                }
            }
            get instrument() {
                return this._instrument;
            }
            set instrument(instrumentCode) {
                this._instrument = instrumentCode;
                initialized = initialized.then(() => {
                    this.changeChannelInstrument(instrumentCode);
                    const instrumentName = SoundCipher.getInstrumentName(instrumentCode);
                    return new Promise((resolve, reject) => {
                        log(`requesting instrument ${instrumentName} soundfontUrl: ${SoundFontUrl}`);
                        MIDI.loadResource(SoundCipher.getLoadInstrumentArgs(instrumentName, resolve));
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
                    if ((SoundCipher.openChannels.length) <= this.channel) {
                        MIDI.programChange(this.channel, 0);
                        SoundCipher.openChannels.push(this.channel);
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
                    var instrumentName = SoundCipher.getInstrumentName(instrumentCode);
                    log(`requesting instrument ${instrumentName} soundfontUrl: ${SoundFontUrl}`);
                    MIDI.loadResource(SoundCipher.getLoadInstrumentArgs(instrumentName, resolve));
                });
            }
            changeChannelInstrument(instrumentCode) {
                if ((SoundCipher.openChannels.length) <= this.channel) {
                    SoundCipher.openChannels.push(this.channel);
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
                        console.log("Getting load isntr args: ", instrumentNames);
                        let instrumentName = instrumentNames;
                        log(`instrument [${instrumentName}] loading - state=${state} progress=${progress}`);
                    },
                    onsuccess: function () {
                        let instrumentName = instrumentNames;
                        log(`instrument [${instrumentName}] loaded...`);
                        onSuccess();
                    }
                };
            }
        }
        SoundCipher.PIANO = 0;
        SoundCipher.XYLOPHONE = 13;
        SoundCipher.ELECTRIC_GUITAR = 27;
        SoundCipher.ACOUSTIC_BASS = 32;
        SoundCipher.STRINGS = 48;
        SoundCipher.ORCHESTRA_HIT = 55;
        SoundCipher.TRUMPET = 56;
        SoundCipher.TUBA = 58;
        SoundCipher.BRASS = 61;
        SoundCipher.ALTO_SAX = 65;
        SoundCipher.CLARINET = 71;
        SoundCipher.FLUTE = 73;
        SoundCipher.TAIKO = 116;
        SoundCipher.SYNTH_DRUM = 118;
        SoundCipher.count = 0;
        SoundCipher.instrumentSoundMap = new Map();
        SoundCipher.openChannels = [];
        soundcipher.SoundCipher = SoundCipher;
        SoundCipher.initialize();
        if (!window['arb.soundcipher.SoundCipher__MIDIInitialized']) {
            window['arb.soundcipher.SoundCipher__MIDIInitialized'] = true;
            initialized = new Promise((resolve, reject) => {
                const defaultInstrumentName = SoundCipher.getInstrumentName(SoundCipher.PIANO);
                const initialize = () => {
                    console.log("!!!!!!!! RUNNING HERE!!!");
                    MIDI.loadPlugin(SoundCipher.getLoadInstrumentArgs(defaultInstrumentName, resolve));
                };
                log('request SoundCipher initialization');
                if (document.readyState == 'complete') {
                    if (typeof MIDI.loadPlugin === 'undefined') {
                        console.log('MIDI not yet defined');
                        setTimeout(initialize, 1000);
                    }
                    else {
                        initialize();
                    }
                }
                else {
                    console.log('Doc not ready, initialize on window load');
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
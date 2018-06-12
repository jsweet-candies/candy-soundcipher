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
                this.channel = SoundCipher.channelCount;
                if (SoundCipher.channelCount >= 0 && SoundCipher.channelCount < SoundCipher.MAX_CHANNELS) {
                    SoundCipher.channelCount++;
                }
                else {
                    SoundCipher.maxChannelErrorHandler();
                }
            }
            static initialize() {
                SoundCipher.instrumentSoundMap.set(SoundCipher.PIANO, { name: "acoustic_grand_piano", isLoaded: false });
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
                            MIDI.loadResource(SoundCipher.getLoadInstrumentArgs(instrumentName, instrumentCode, resolve));
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
                    MIDI.loadResource(SoundCipher.getLoadInstrumentArgs(instrumentName, instrumentCode, resolve));
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
            static getLoadInstrumentArgs(instrumentName, instrumentCode, onSuccess) {
                return {
                    soundfontUrl: SoundFontUrl,
                    instrument: instrumentName,
                    onprogress: function (state, progress) {
                        log(`instrument [${instrumentName}] loading... state=${state} progress=${progress}`);
                    },
                    onsuccess: function () {
                        log(`instrument [${instrumentName}] loaded...`);
                        SoundCipher.instrumentSoundMap.set(instrumentCode, { name: instrumentName, isLoaded: true });
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
        SoundCipher.channelCount = 0;
        SoundCipher.MAX_CHANNELS = 16;
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
                    MIDI.loadPlugin(SoundCipher.getLoadInstrumentArgs(defaultInstrumentName, SoundCipher.PIANO, resolve));
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
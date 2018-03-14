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
            static getInstrumentName(soundCipherInstrumentCode) {
                switch (soundCipherInstrumentCode) {
                    case SoundCipher.SYNTH_DRUM:
                        return "synth_drum";
                    case SoundCipher.ELECTRIC_GUITAR:
                        return "electric_guitar_clean";
                    default:
                        return "acoustic_grand_piano";
                }
            }
            get instrument() {
                return this._instrument;
            }
            set instrument(instrumentCode) {
                this._instrument = instrumentCode;
                initialized = initialized.then(() => {
                    const instrumentName = SoundCipher.getInstrumentName(instrumentCode);
                    return new Promise((resolve, reject) => {
                        log(`requesting instrument ${instrumentName} soundfontUrl: ${SoundFontUrl}`);
                        MIDI.loadResource(SoundCipher.getLoadInstrumentArgs(instrumentName, resolve));
                    });
                });
            }
            playNote(note, dynamic = DEFAULT_NOTE_VELOCITY, duration = 0.75) {
                return __awaiter(this, void 0, void 0, function* () {
                    log(`play note ${note} dynamic=${dynamic} duration=${duration} - WAITING`);
                    yield initialized;
                    log('ready to play');
                    MIDI.setVolume(0, 127);
                    MIDI.noteOn(0, note, DEFAULT_NOTE_VELOCITY, DEFAULT_NOTE_DELAY);
                    MIDI.noteOff(0, note, DEFAULT_NOTE_DELAY + duration);
                });
            }
            playChord(notes, dynamic = DEFAULT_NOTE_VELOCITY, duration = 0.75) {
                return __awaiter(this, void 0, void 0, function* () {
                    log(`play chord [${notes.join(',')}] dynamic=${dynamic} duration=${duration} - WAITING`);
                    yield initialized;
                    log('ready to play chord');
                    MIDI.setVolume(0, 127);
                    MIDI.chordOn(0, notes, dynamic, DEFAULT_NOTE_DELAY);
                    MIDI.chordOff(0, notes, DEFAULT_NOTE_DELAY + duration);
                });
            }
            static getLoadInstrumentArgs(instrumentName, onSuccess) {
                return {
                    soundfontUrl: SoundFontUrl,
                    instrument: instrumentName,
                    onprogress: function (state, progress) {
                        log(`instrument [${instrumentName}] loading - state=${state} progress=${progress}`);
                    },
                    onsuccess: function () {
                        const instrumentCode = MIDI.GM.byName[instrumentName].number;
                        log(`instrument [${instrumentName}] loaded code=${instrumentCode}`);
                        MIDI.programChange(0, instrumentCode);
                        onSuccess();
                    }
                };
            }
        }
        SoundCipher.PIANO = 0;
        SoundCipher.SYNTH_DRUM = 118;
        SoundCipher.ELECTRIC_GUITAR = 27;
        soundcipher.SoundCipher = SoundCipher;
        if (!window['arb.soundcipher.SoundCipher__MIDIInitialized']) {
            window['arb.soundcipher.SoundCipher__MIDIInitialized'] = true;
            initialized = new Promise((resolve, reject) => {
                const defaultInstrumentName = SoundCipher.getInstrumentName(SoundCipher.PIANO);
                const initialize = () => MIDI.loadPlugin(SoundCipher.getLoadInstrumentArgs(defaultInstrumentName, resolve));
                log('request SoundCipher initialization');
                if (document.readyState == 'complete') {
                    initialize();
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
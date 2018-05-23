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
		// each SoundCipher instance will have a channel number
		// so that multiple sounds can be played at the same time
		if (SoundCipher.count >= 0) {
			SoundCipher.count++;
		} else {
			SoundCipher.count = 0;
		}
		this.channel = SoundCipher.count;
	}

          static getInstrumentName(soundCipherInstrumentCode) {
            if (this.instrumentSoundMap.get(soundCipherInstrumentCode)) {
              return this.instrumentSoundMap.get(soundCipherInstrumentCode);
            } else {
              // default
              return this.instrumentSoundMap.get(SoundCipher.PIANO);
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
		log(`requesting 22 instrument ${instrumentName} soundfontUrl: ${SoundFontUrl}`);
		MIDI.loadResource(SoundCipher.getLoadInstrumentArgs(instrumentName, resolve));
	      });
		}

		instrument(instrumentCode) {
		MIDI.programChange(this.channel, instrumentCode);
            }

            static getLoadInstrumentArgs(instrumentNames, onSuccess) {
                return {
                    soundfontUrl: SoundFontUrl,
                    instrument: instrumentNames,
                    onprogress: function (state, progress) {
                        log(`instrument [${instrumentNames}] loading - state=${state} progress=${progress}`);
                    },
                    onsuccess: function () {
			for (var i=0; i<instrumentNames.length; i++) {
				const instrumentCode = MIDI.GM.byName[instrumentNames[i]].number;
				var instrumentName = instrumentNames[i];
				log(`instrument [${instrumentName}] loaded code=${instrumentCode}`);
			}
                        onSuccess();
                    }
                };
            }
        }
        SoundCipher.PIANO = 0;
        SoundCipher.XYLOPHONE=13;
        SoundCipher.ELECTRIC_GUITAR = 27;
        SoundCipher.ACOUSTIC_BASS=32;
        SoundCipher.STRINGS=48;
        SoundCipher.ORCHESTRA_HIT=55;
        SoundCipher.TRUMPET=56;
        SoundCipher.TUBA=58;
        SoundCipher.BRASS=61;
        SoundCipher.ALTO_SAX=65;
        SoundCipher.CLARINET=71;
        SoundCipher.FLUTE=73;
        SoundCipher.TAIKO=116;
        SoundCipher.SYNTH_DRUM = 118;

	SoundCipher.instrumentSoundMap = new Map();

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

        soundcipher.SoundCipher = SoundCipher;
        if (!window['arb.soundcipher.SoundCipher__MIDIInitialized']) {
            window['arb.soundcipher.SoundCipher__MIDIInitialized'] = true;
            initialized = new Promise((resolve, reject) => {
                const defaultInstrumentsName = [SoundCipher.getInstrumentName(SoundCipher.PIANO)
		,SoundCipher.getInstrumentName(SoundCipher.XYLOPHONE)
		,SoundCipher.getInstrumentName(SoundCipher.ELECTRIC_GUITAR)
		,SoundCipher.getInstrumentName(SoundCipher.ACOUSTIC_BASS)
		,SoundCipher.getInstrumentName(SoundCipher.STRINGS)
		,SoundCipher.getInstrumentName(SoundCipher.ORCHESTRA_HIT)
		,SoundCipher.getInstrumentName(SoundCipher.TRUMPET)
		,SoundCipher.getInstrumentName(SoundCipher.TUBA)
		,SoundCipher.getInstrumentName(SoundCipher.BRASS)
		,SoundCipher.getInstrumentName(SoundCipher.ALTO_SAX)
		,SoundCipher.getInstrumentName(SoundCipher.FLUTE)
		,SoundCipher.getInstrumentName(SoundCipher.TAIKO)
		,SoundCipher.getInstrumentName(SoundCipher.SYNTH_DRUM)];
                const initialize = () => MIDI.loadPlugin(SoundCipher.getLoadInstrumentArgs(defaultInstrumentsName, resolve));
                log('request SoundCipher initialization');
                if (document.readyState == 'complete') {
                    initialize();
                }
                else {
                    window.onload = initialize;
                }
            });
						console.log("abc");
						console.log(initialized);
        }
        function log(message) {
            console.info(`SoundCipher: ${message}`);
        }
    })(soundcipher = arb.soundcipher || (arb.soundcipher = {}));
})(arb || (arb = {}));
//# sourceMappingURL=index.js.map

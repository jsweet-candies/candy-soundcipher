declare var MIDI: any;
declare var coderBetaController;

const SoundFontUrl: string = window['arb.ktsoundcipher.KTSoundCipher__SoundFontUrl'] || '/resources/soundfont/';

namespace arb.ktsoundcipher {

    let initialized: Promise<void> = Promise.resolve();

    const DEFAULT_NOTE_DELAY = 0; // play one note every quarter second
    const DEFAULT_NOTE_VELOCITY = 127; // how hard the note hits

    export class KTSoundCipher {
		
		static readonly PIANO = 0;
        static readonly XYLOPHONE=13;
        static readonly ELECTRIC_GUITAR = 27;
        static readonly ACOUSTIC_BASS=32;
        static readonly STRINGS=48;
        static readonly ORCHESTRA_HIT=55;
        static readonly TRUMPET=56;
        static readonly TUBA=58;
        static readonly BRASS=61;
        static readonly ALTO_SAX=65;
        static readonly CLARINET=71;
        static readonly FLUTE=73;
        static readonly TAIKO=116;
		static readonly SYNTH_DRUM = 118;
        
        static count = 0;
        static instrumentSoundMap = new Map();
        static openChannels = [];
        channel : number;
        
        constructor() {
            // each KTSoundCipher instance will have a channel number
            // so that multiple sounds can be played at the same time
            this.channel = KTSoundCipher.count;
            if (KTSoundCipher.count >= 0 && KTSoundCipher.count < 16) {
                KTSoundCipher.count++;
            } else {
                // Display a runtime error msg in the KTCODER
                if (typeof coderBetaController !== 'undefined') {
                    coderBetaController.coderBeta.processingCompiler.displayRuntimeError('Too many KTSoundCipher instances... there can only be a maximum of 16');
                } else {
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
        
      static getInstrumentName(soundCipherInstrumentCode: number): string {
            if (KTSoundCipher.instrumentSoundMap.get(soundCipherInstrumentCode)) {
              return KTSoundCipher.instrumentSoundMap.get(soundCipherInstrumentCode);
            } else {
              // default
              return KTSoundCipher.instrumentSoundMap.get(KTSoundCipher.PIANO);
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
                const instrumentName = KTSoundCipher.getInstrumentName(instrumentCode);
                return new Promise<void>((resolve, reject) => {
                    log(`requesting instrument ${instrumentName} soundfontUrl: ${SoundFontUrl}`);
                    MIDI.loadResource(KTSoundCipher.getLoadInstrumentArgs(instrumentName, resolve));
                });
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
            if ((KTSoundCipher.openChannels.length) <= this.channel ) {
                MIDI.programChange(this.channel, 0);
                KTSoundCipher.openChannels.push(this.channel);
            }

            // play the note
            MIDI.setVolume(this.channel, 127);
            MIDI.noteOn(this.channel, note, DEFAULT_NOTE_VELOCITY, DEFAULT_NOTE_DELAY);
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
		    var instrumentName = KTSoundCipher.getInstrumentName(instrumentCode);
		    log(`requesting instrument ${instrumentName} soundfontUrl: ${SoundFontUrl}`);
		    MIDI.loadResource(KTSoundCipher.getLoadInstrumentArgs(instrumentName, resolve));
	      });
        }       
        
		private changeChannelInstrument(instrumentCode: number) {
            if ((KTSoundCipher.openChannels.length) <= this.channel ) {
                KTSoundCipher.openChannels.push(this.channel);
                MIDI.programChange(this.channel, instrumentCode);
            } else {
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
            }
        }
    }
    
    KTSoundCipher.initialize();

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

    if (!window['arb.ktsoundcipher.KTSoundCipher__MIDIInitialized']) {
        window['arb.ktsoundcipher.KTSoundCipher__MIDIInitialized'] = true;
        initialized = new Promise<void>((resolve, reject) => {
            const defaultInstrumentName: string = KTSoundCipher.getInstrumentName(KTSoundCipher.PIANO)
            const initialize = () => {
                MIDI.loadPlugin(KTSoundCipher.getLoadInstrumentArgs(defaultInstrumentName, resolve));
            }
            log('request KTSoundCipher initialization');
            if (document.readyState == 'complete') {
                whenMidiLoaded(initialize);
            } else {
                window.onload = initialize;
            }
        });
    }

    function log(message: string) {
        console.info(`KTSoundCipher: ${message}`);
    }
}
declare var MIDI: any;

const SoundFontUrl: string = window['arb.soundcipher.SoundCipher__SoundFontUrl'] || '/resources/soundfont/';

namespace arb.soundcipher {

    let initialized: Promise<void> = Promise.resolve();

    const DEFAULT_NOTE_DELAY = 0; // play one note every quarter second
    const DEFAULT_NOTE_VELOCITY = 127; // how hard the note hits

    export class SoundCipher {
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
        
        static channelCount = 0;
        private static MAX_CHANNEL: number = 16;
        static maxChannelErrorHandler: () => void = () => {};

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
            SoundCipher.instrumentSoundMap.set(SoundCipher.PIANO, {name: "acoustic_grand_piano", isLoaded: false});
            SoundCipher.instrumentSoundMap.set(SoundCipher.XYLOPHONE, {name: "xylophone", isLoaded: false});
            SoundCipher.instrumentSoundMap.set(SoundCipher.ELECTRIC_GUITAR, {name: "electric_guitar_clean", isLoaded: false});
            SoundCipher.instrumentSoundMap.set(SoundCipher.ACOUSTIC_BASS, {name: "acoustic_bass", isLoaded: false});
            SoundCipher.instrumentSoundMap.set(SoundCipher.STRINGS, {name: "string_ensemble_1", isLoaded: false});
            SoundCipher.instrumentSoundMap.set(SoundCipher.ORCHESTRA_HIT, {name: "orchestra_hit", isLoaded: false});
            SoundCipher.instrumentSoundMap.set(SoundCipher.TRUMPET, {name: "trumpet", isLoaded: false});
            SoundCipher.instrumentSoundMap.set(SoundCipher.TUBA, {name: "tuba", isLoaded: false});
            SoundCipher.instrumentSoundMap.set(SoundCipher.BRASS, {name: "brass_section", isLoaded: false});
            SoundCipher.instrumentSoundMap.set(SoundCipher.ALTO_SAX, {name: "alto_sax", isLoaded: false});
            SoundCipher.instrumentSoundMap.set(SoundCipher.CLARINET, {name: "clarinet", isLoaded: false});
            SoundCipher.instrumentSoundMap.set(SoundCipher.FLUTE, {name: "flute", isLoaded: false});
            SoundCipher.instrumentSoundMap.set(SoundCipher.TAIKO, {name: "taiko_drum", isLoaded: false});
            SoundCipher.instrumentSoundMap.set(SoundCipher.SYNTH_DRUM, {name: "synth_drum", isLoaded: false});
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
                    SoundCipher.instrumentSoundMap.set(instrumentCode, {name: instrumentName, isLoaded: true});
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
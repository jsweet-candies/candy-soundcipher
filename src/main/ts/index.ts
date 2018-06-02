declare var MIDI: any;
declare var coderBetaController;

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
        
        static count = 0;
        static instrumentSoundMap = new Map();
        static openChannels = [];
        channel : number;
        
        constructor() {
            // each SoundCipher instance will have a channel number
            // so that multiple sounds can be played at the same time
            this.channel = SoundCipher.count;
            console.log('NEW SOUNDCIPHER!!!: channel #', SoundCipher.count);
            if (SoundCipher.count >= 0 && SoundCipher.count < 16) {
                SoundCipher.count++;
            } else {
                // Display a runtime error msg in the KTCODER
                if (coderBetaController !== 'undefined') {
                    coderBetaController.coderBeta.processingCompiler.displayRuntimeError('Too many SoundCipher instances... there can only be a maximum of 16');
                } else {
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
        
      static getInstrumentName(soundCipherInstrumentCode: number): string {
            if (SoundCipher.instrumentSoundMap.get(soundCipherInstrumentCode)) {
              return SoundCipher.instrumentSoundMap.get(soundCipherInstrumentCode);
            } else {
              // default
              return SoundCipher.instrumentSoundMap.get(SoundCipher.PIANO);
            }
        }

        private _instrument: number;

        get instrument(): number {
            return this._instrument;
        }

        set instrument(instrumentCode: number) {
            this._instrument = instrumentCode;
            initialized = initialized.then(() => {
                this.changeInstrument(instrumentCode);
                const instrumentName = SoundCipher.getInstrumentName(instrumentCode);
                return new Promise<void>((resolve, reject) => {
                    log(`requesting instrument ${instrumentName} soundfontUrl: ${SoundFontUrl}`);
                    MIDI.loadResource(SoundCipher.getLoadInstrumentArgs(instrumentName, resolve));
                });
            });

        }

        async playNote(note: number, dynamic: number = DEFAULT_NOTE_VELOCITY, duration: number = 0.75) {
            log(`play note ${note} dynamic=${dynamic} duration=${duration} - WAITING`);

            await initialized;
            log('ready to play');

            // Check if MIDI channel not yet open
            if ((SoundCipher.openChannels.length) <= this.channel ) {
                MIDI.programChange(this.channel, 0);
                SoundCipher.openChannels.push(this.channel);
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
		    var instrumentName = SoundCipher.getInstrumentName(instrumentCode);
		    log(`requesting instrument ${instrumentName} soundfontUrl: ${SoundFontUrl}`);
		    MIDI.loadResource(SoundCipher.getLoadInstrumentArgs(instrumentName, resolve));
	      });
        }       
        
		changeInstrument(instrumentCode: number) {
            if ((SoundCipher.openChannels.length) <= this.channel ) {
                SoundCipher.openChannels.push(this.channel);
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
                    console.log("Getting load isntr args: ", instrumentNames);
                    let instrumentName = instrumentNames;
                    log(`instrument [${instrumentName}] loading - state=${state} progress=${progress}`);
                    //  for (var i=0; i<instrumentNames.length; i++) {
                    //     var instrumentName = instrumentNames[i];
                    //     log(`instrument [${instrumentName}] loading - state=${state} progress=${progress}`);
                    // }
                },
                onsuccess: function () {
                    // const instrumentCode = MIDI.GM.byName[instrumentNames[i]].number;
                    let instrumentName = instrumentNames;
                    log(`instrument [${instrumentName}] loaded...`);
                    // for (var i=0; i<instrumentNames.length; i++) {
                    //     // const instrumentCode = MIDI.GM.byName[instrumentNames[i]].number;
                    //     var instrumentName = instrumentNames[i];
                    //     log(`instrument [${instrumentName}] loaded...`);
                    // }
                    onSuccess();
                }
            }
        }
    }
    
    SoundCipher.initialize();

    if (!window['arb.soundcipher.SoundCipher__MIDIInitialized']) {
        window['arb.soundcipher.SoundCipher__MIDIInitialized'] = true;
        initialized = new Promise<void>((resolve, reject) => {
            const defaultInstrumentName: string = SoundCipher.getInstrumentName(SoundCipher.PIANO)
                // ,SoundCipher.getInstrumentName(SoundCipher.XYLOPHONE)
                // ,SoundCipher.getInstrumentName(SoundCipher.ELECTRIC_GUITAR)
                // ,SoundCipher.getInstrumentName(SoundCipher.ACOUSTIC_BASS)
                // ,SoundCipher.getInstrumentName(SoundCipher.STRINGS)
                // ,SoundCipher.getInstrumentName(SoundCipher.ORCHESTRA_HIT)
                // ,SoundCipher.getInstrumentName(SoundCipher.TRUMPET)
                // ,SoundCipher.getInstrumentName(SoundCipher.TUBA)
                // ,SoundCipher.getInstrumentName(SoundCipher.BRASS)
                // ,SoundCipher.getInstrumentName(SoundCipher.ALTO_SAX)
                // ,SoundCipher.getInstrumentName(SoundCipher.FLUTE)
                // ,SoundCipher.getInstrumentName(SoundCipher.TAIKO)
                // ,SoundCipher.getInstrumentName(SoundCipher.SYNTH_DRUM)];
            const initialize = () => {
                    console.log("!!!!!!!! RUNNING HERE!!!");
                    MIDI.loadPlugin(SoundCipher.getLoadInstrumentArgs(defaultInstrumentName, resolve));
                }

            log('request SoundCipher initialization');
            if (document.readyState == 'complete') {
                if (typeof MIDI.loadPlugin === 'undefined') {
                    console.log('MIDI not yet defined');
                    setTimeout(initialize, 1000);
                } else {
                    initialize();
                }
            } else {
                console.log('Doc not ready, initialize on window load');
                window.onload = initialize;
            }
        });
    }

    function log(message: string) {
        console.info(`SoundCipher: ${message}`);
    }
}
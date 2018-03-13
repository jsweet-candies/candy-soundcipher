var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var arb;
(function (arb) {
    var soundcipher;
    (function (soundcipher) {
        let initialized = Promise.resolve();
        if (!window['arb.soundcipher.SoundCipher__MIDIInitialized']) {
            window['arb.soundcipher.SoundCipher__MIDIInitialized'] = true;
            initialized = new Promise((resolve, reject) => {
                const initialize = () => MIDI.loadPlugin({
                    soundfontUrl: "/resources/soundfont/",
                    instrument: "acoustic_grand_piano",
                    onprogress: function (state, progress) {
                        console.log("PROGRESS!!!!", state, progress);
                    },
                    onsuccess: function () {
                        console.log("INITIALIZED!!!!!");
                        resolve();
                    }
                });
                console.log('request initialization');
                if (document.readyState == 'complete') {
                    initialize();
                }
                else {
                    window.onload = initialize;
                }
            });
        }
        class SoundCipher {
            playNote(pitch, dynamic, duration) {
                return __awaiter(this, void 0, void 0, function* () {
                    console.info("play note from candy " + pitch + " dynamic=" + dynamic + " duration=" + duration + " - WAITING");
                    yield initialized;
                    console.log('ready to play');
                    var delay = 0;
                    var velocity = 127;
                    MIDI.setVolume(0, 127);
                    MIDI.noteOn(0, pitch, velocity, delay);
                    MIDI.noteOff(0, pitch, delay + 0.75);
                });
            }
        }
        soundcipher.SoundCipher = SoundCipher;
    })(soundcipher = arb.soundcipher || (arb.soundcipher = {}));
})(arb || (arb = {}));
//# sourceMappingURL=index.js.map
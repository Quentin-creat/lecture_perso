export default class Mixtape extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.gainNode = null;
        this.render();
        
        document.addEventListener('gainChange', (event) => {
            this.gainNode.gain.value = event.detail.gain;
        });

        document.addEventListener('reverbChange', (event) => {
            this.convolver.buffer = event.detail.buffer;
        });
    }

    // Gain management
    createGainNode(audioCtx) {
        this.gainNode = audioCtx.createGain();
        this.gainNode.connect(audioCtx.destination);
        return this.gainNode;
    }

    connectGainNode(track, gainNode) {
        track.connect(gainNode);
        return track;
    }


    // Reverbe management
    createReverbNode(audioCtx) {
        this.convolver = audioCtx.createConvolver();
        this.convolver.connect(audioCtx.destination);
        return this.convolver;
    }

    connectReverbNode(track, convolver) {
        track.connect(convolver);
        return track;
    }

    render() {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" type="text/css" href="./styles/mixtape.css">
        <gain-button></gain-button>
        `;
    }
}
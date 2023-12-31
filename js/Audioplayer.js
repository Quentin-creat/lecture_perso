export default class AudioPlayer extends HTMLElement {
    playing = false;
    volume = 0.4;
    prevVolume = 0.4;
    initialized = false;
    bufferPercentage = 75;
    nonAudioAttributes = new Set(['title', 'bar-width', 'bar-gap', 'buffer-percentage']);

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.render();
    }

    static get observedAttributes() {
        return [
            // audio tag attributes
            // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
            'src', 'muted', 'crossorigin', 'loop', 'preload', 'autoplay',
            // the name of the audio
            'title',
            // the size of the frequency bar
            'bar-width',
            // the size of the gap between the bars
            'bar-gap',
            // the percentage of the frequency buffer data to represent
            // if the dataArray contains 1024 data points only a percentage of data will
            // be used to draw on the canvas
            'buffer-percentage'
        ];
    }

    async attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'src':
                this.initialized = false;
                this.render();
                this.initializeAudio();
                break;
            case 'muted':
                this.toggleMute(Boolean(this.audio?.getAttribute('muted')));
                break;
            case 'title':
                this.titleElement.textContent = newValue;
                break;
            case 'bar-width':
                this.barWidth = Number(newValue) || 3;
                break;
            case 'bar-gap':
                this.barGap = Number(newValue) || 1;
                break;
            case 'buffer-percentage':
                this.bufferPercentage = Number(newValue) || 75;
                break;
            default:
        }

        this.updateAudioAttributes(name, newValue);
    }

    updateAudioAttributes(name, value) {
        if (!this.audio || this.nonAudioAttributes.has(name)) return;

        // if the attribute was explicitly set on the audio-player tag
        // set it otherwise remove it
        if (this.attributes.getNamedItem(name)) {
            this.audio.setAttribute(name, value ?? '')
        } else {
            this.audio.removeAttribute(name);
        }
    }

    initializeAudio() {
        if (this.initialized) return;

        this.initialized = true;

        this.audioCtx = new AudioContext();

        this.analyserNode = this.audioCtx.createAnalyser();
        this.track = this.audioCtx.createMediaElementSource(this.audio);

        const mixTable = document.querySelector('mix-table');
        this.gainNode = mixTable.createGainNode(this.audioCtx);
        this.track = mixTable.connectGainNode(this.track, this.gainNode);

        this.analyserNode.fftSize = 2048;
        this.bufferLength = this.analyserNode.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
        this.analyserNode.getByteFrequencyData(this.dataArray);

        this.track
            .connect(this.analyserNode)
            .connect(this.audioCtx.destination);

        this.changeVolume();
    }

    updateFrequency() {
        if (!this.playing) return;

        this.analyserNode.getByteFrequencyData(this.dataArray);

        if(this.frequencyVisualizer == null) this.shadowRoot.querySelector('audio-visualizer');

        this.frequencyVisualizer.updateFrequency(
            this.dataArray,
            this.bufferLength,
            this.bufferPercentage
        );

        requestAnimationFrame(this.updateFrequency.bind(this))
    }

    //Listeners
    attachEvents() {
        this.volumeBar.parentNode.addEventListener('click', e => {
            if (e.target === this.volumeBar.parentNode) {
                this.toggleMute();
            }
        }, false);

        this.playPauseBtn.addEventListener('click', this.togglePlay.bind(this), false);

        this.volumeBar.addEventListener('input', this.changeVolume.bind(this), false);

        this.progressBar.addEventListener('input', (e) => this.seekTo(this.progressBar.value), false);

        this.audio.addEventListener('loadedmetadata', () => {
            this.progressBar.max = this.audio.duration;
            this.durationEl.textContent = this.getTimeString(this.audio.duration);
            this.updateAudioTime();
        })

        this.audio.addEventListener('error', (e) => {
            this.titleElement.textContent = this.audio.error.message;
            this.playPauseBtn.disabled = true;
        })

        this.audio.addEventListener('timeupdate', () => {
            this.updateAudioTime(this.audio.currentTime);
        })

        this.audio.addEventListener('ended', () => {
            this.playing = false;
            this.playPauseBtn.textContent = 'play';
            this.playPauseBtn.classList.remove('playing');
            //this.dispatchEvent(new CustomEvent('playNextSong'));
            this.dispatchEvent(new CustomEvent('playNextSong', {
                bubbles: true,
                composed: true,
                detail: {
                    src: this.src,
                    title: this.title
                }
            }));
        }, false);

        this.audio.addEventListener('pause', () => {
            this.playing = false;
            this.playPauseBtn.textContent = 'play';
            this.playPauseBtn.classList.remove('playing');
        }, false);

        this.audio.addEventListener('play', () => {
            this.playing = true;
            this.playPauseBtn.textContent = 'pause';
            this.playPauseBtn.classList.add('playing');
            this.updateFrequency();
        }, false);

        document.addEventListener('songSelected', (event) => {
            this.updateAudio(event.detail.src, event.detail.title);
            this.titleElement.textContent = event.detail.title;
        });

        
    }

    updateAudio(src, title) {
        this.updateAudioAttributes('src', src);
        this.updateAudioAttributes('title', title);
        //restart the audio player from beginning
        this.audio.currentTime = 0;
        this.audio.play();
    }

    //gere pause / play
    async togglePlay() {
        if (this.audioCtx.state === 'suspended') {
            await this.audioCtx.resume();
        }

        if (this.playing) {
            return this.audio.pause();
        }

        return this.audio.play();
    }

    getTimeString(time) {
        const secs = `${parseInt(`${time % 60}`, 10)}`.padStart(2, '0');
        const min = parseInt(`${(time / 60) % 60}`, 10);

        return `${min}:${secs}`;
    }

    changeVolume() {
        this.volume = Number(this.volumeBar.value);

        if (Number(this.volume) > 1) {
            this.volumeBar.parentNode.className = 'volume-bar over';
        } else if (Number(this.volume) > 0) {
            this.volumeBar.parentNode.className = 'volume-bar half';
        } else {
            this.volumeBar.parentNode.className = 'volume-bar';
        }

        if (this.gainNode) {
            this.gainNode.gain.value = this.volume;
        }
    }

    toggleMute(muted = null) {
        this.volumeBar.value = muted || this.volume === 0 ? this.prevVolume : 0;
        this.changeVolume();
    }

    seekTo(value) {
        this.audio.currentTime = value;
    }

    updateAudioTime() {
        this.progressBar.value = this.audio.currentTime;
        this.currentTimeEl.textContent = this.getTimeString(this.audio.currentTime);
    }

    render() {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" type="text/css" href="./styles/player.css">
        <div class="player-container">
            <figure class="audio-player">
            <figcaption class="audio-name"></figcaption>
                <audio style="display: none"></audio>
                <button class="play-btn" type="button">play</button>
                <div class="progress-indicator">
                    <span class="current-time">0:0</span>
                    <input type="range" max="100" value="0" class="progress-bar">
                    <span class="duration">0:00</span>
                </div>
                <div class="volume-bar">
                    <input type="range" min="0" max="2" step="0.01" value="${this.volume}" class="volume-field">
                </div>
            </figure>
            <audio-visualizer></audio-visualizer>
        </div>
        `;


        this.audio = this.shadowRoot.querySelector('audio');
        this.playPauseBtn = this.shadowRoot.querySelector('.play-btn');
        this.titleElement = this.shadowRoot.querySelector('.audio-name');
        this.volumeBar = this.shadowRoot.querySelector('.volume-field');
        this.progressIndicator = this.shadowRoot.querySelector('.progress-indicator');
        this.currentTimeEl = this.progressIndicator.children[0];
        this.progressBar = this.progressIndicator.children[1];
        this.durationEl = this.progressIndicator.children[2];

        this.frequencyVisualizer = this.shadowRoot.querySelector('audio-visualizer');
        this.titleElement.textContent = this.getAttribute('title');
        this.volumeBar.value = this.volume;

        // if rendering or re-rendering all audio attributes need to be reset
        for (let i = 0; i < this.attributes.length; i++) {
            const attr = this.attributes[i];
            this.updateAudioAttributes(attr.name, attr.value);
        }

        this.attachEvents();
    }
}
import '../libs/webaudio-controls.js';
import AudioPlayer from './Audioplayer.js';
import Song from './Song.js';
import Playlist from './Playlist.js';
import Visualizer from './Visualiser.js';
import Mixtable from './MixTable.js';
import GainButton from './GainButton.js';



customElements.define('mix-table', Mixtable);
customElements.define('gain-button', GainButton);
customElements.define('audio-player', AudioPlayer);
customElements.define('custom-song', Song);
customElements.define('play-list', Playlist);
customElements.define('audio-visualizer', Visualizer);
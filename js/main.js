import '../libs/webaudio-controls.js';
import AudioPlayer from './Audioplayer.js';
import Song from './Song.js';
import Playlist from './Playlist.js';



customElements.define('audio-player', AudioPlayer);
customElements.define('custom-song', Song);
customElements.define('play-list', Playlist);
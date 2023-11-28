export default class Playlist extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.songs = [];
        this.currentSongIndex = 0;
    }

    connectedCallback() {
        document.addEventListener('playNextSong', () => {
            console.log('playNextSong');
            this.playNextSong();
        });
        this.render();
    }

    playNextSong() {
        this.currentSongIndex = (this.currentSongIndex + 1) % this.songs.length;

        const nextSong = this.songs[this.currentSongIndex];

        this.dispatchEvent(new CustomEvent('songSelected', {
            bubbles: true,
            composed: true,
            detail: {
                src: nextSong.getAttribute('src'),
                title: nextSong.getAttribute('title')
            }
        }));
    }

    render() {
        this.shadowRoot.innerHTML = `
                <custom-song style="margin: 0 2rem" src="./audios/Kansas-Dust_in_the_Wind.mp3" title="Kansas - Dust in the wind"></custom-song>
                <custom-song style="margin: 0 2rem" src="./audios/Guns_N_Roses-Sweet_Child_O_Mine.mp3" title="Guns N Roses - Sweet Child O Mine"></custom-song>
                <custom-song style="margin: 0 2rem" src="./audios/Guns-N-Roses_Knockin_On_Heavens_Door.mp3" title="Guns N Roses - Knocking on heavens door"></custom-song>
                <custom-song style="margin: 0 2rem" src="./audios/ACDC-Hells_Bells.mp3" title="AC-DC - Hells Bells"></custom-song>
                <custom-song style="margin: 0 2rem" src="./audios/Lynyrd_Skynyrd-Simple_Man.mp3" title="Lynyrd Skynyrd - Simple man"></custom-song>
        `;
        this.songs = Array.from(this.shadowRoot.querySelectorAll('custom-song'));
    }
}

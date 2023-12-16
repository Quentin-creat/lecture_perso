export default class Playlist extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.songs = [];
        this.currentSongIndex = 0;
    }

    shiftFocus(delta) {
        let newIndex = (this.currentSongIndex + delta + this.songs.length) % this.songs.length;
        this.updateSongFocus(newIndex);

        // Jouer la chanson sélectionnée
        const selectedSong = this.songs[this.currentSongIndex];

        this.dispatchEvent(new CustomEvent('songSelected', {
            bubbles: true,
            composed: true,
            detail: {
                src: selectedSong.getAttribute('src'),
                title: selectedSong.getAttribute('title')
            }
        }));
    }


    updateSongFocus(index) {
        // Met à jour l'indice de la chanson actuelle
        this.currentSongIndex = index;
        // Met à jour l'affichage pour mettre en évidence la chanson actuelle
        const newActiveSong = this.songs[this.currentSongIndex];
        this.songs.forEach(song => song.classList.remove('active'));
        newActiveSong.classList.add('active');

        // Scrollez la vue pour centrer la nouvelle chanson active
        newActiveSong.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    connectedCallback() {
        document.addEventListener('playNextSong', () => {
            console.log('playNextSong');
            this.playNextSong();
        });

        this.render();

        // Mettre à jour la liste des chansons
        this.songs = Array.from(this.shadowRoot.querySelectorAll('custom-song'));
        console.log(this.songs);
        for(let i = 0; i < this.songs.length; i++) {
            this.songs[i].addEventListener('click', () => this.updateSongFocus(i));
        }

        this.shadowRoot.querySelector('.left-arrow').addEventListener('click', () => this.shiftFocus(-1));
        this.shadowRoot.querySelector('.right-arrow').addEventListener('click', () => this.shiftFocus(1));
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
        <link href="/styles/playlist.css" rel="stylesheet"/>
        <div class="arrow left-arrow"></div> <!-- Flèche gauche -->
        <custom-song class="song active" style="margin: 0 2rem" src="./audios/Kansas-Dust_in_the_Wind.mp3" title="Kansas - Dust in the wind" cover="./img/Kansas-Dust_in_the_Wind.jpg"></custom-song>
        <custom-song class="song" style="margin: 0 2rem" src="./audios/Guns_N_Roses-Sweet_Child_O_Mine.mp3" title="Guns N Roses - Sweet Child O Mine" cover="./img/Guns_N_Roses-Sweet_Child_O_Mine.png"></custom-song>
        <custom-song class="song" style="margin: 0 2rem" src="./audios/Guns-N-Roses_Knockin_On_Heavens_Door.mp3" title="Guns N Roses - Knocking on heavens door" cover="./img/Guns-N-Roses_Knockin_On_Heavens_Door.jpg"></custom-song>
        <custom-song class="song" style="margin: 0 2rem" src="./audios/ACDC-Hells_Bells.mp3" title="AC-DC - Hells Bells" cover="./img/ACDC-Hells_Bells.jpg"></custom-song>
        <custom-song class="song" style="margin: 0 2rem" src="./audios/Lynyrd_Skynyrd-Simple_Man.mp3" title="Lynyrd Skynyrd - Simple man" cover="./img/Lynyrd_Skynyrd-Simple_Man.jpg"></custom-song>
        <div class="arrow right-arrow"> </div> <!-- Flèche droite -->
    `;
        this.songs = Array.from(this.shadowRoot.querySelectorAll('custom-song'));
    }


}
export default class Song extends HTMLElement {
    static getObservedAttributes() {
        return ['src', 'title'];
    }
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.src = this.getAttribute('src');
        this.title = this.getAttribute('title');
        this.render();
    }

    connectedCallback() {
        const bandeau = this.shadowRoot.querySelector('.song-bandeau');

        bandeau.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('songSelected', {
                bubbles: true,
                composed: true,
                detail: {
                    src: this.src,
                    title: this.title
                }
            }));
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" type="text/css" href="./styles/song.css">
            <div class="song-bandeau">
                <img src="./img/musique.jpg" alt="cover">
                <div class="song-info">
                    <h3>${this.title}</h3>
                    <p>${this.src}</p>
                </div>
            </div>
        `;
    }
}
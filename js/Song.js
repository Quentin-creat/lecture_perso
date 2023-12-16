export default class Song extends HTMLElement {
    static getObservedAttributes() {
        return ['src', 'title', 'cover'];
    }
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.src = this.getAttribute('src');
        this.title = this.getAttribute('title');
        this.cover = this.getAttribute('cover');
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
                <div class="cover-container"> 
                    <img src="${this.cover}" alt="cover" class="cover-image"> 
                </div>
                <div class="song-info">
                    <h3>${this.title}</h3>
                    <p>${this.src}</p>
                </div>
            </div>
        `;
    }
}
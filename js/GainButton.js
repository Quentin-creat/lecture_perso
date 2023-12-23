export default class GainButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
        this.gainInput = this.shadowRoot.getElementById('gainInput');
        this.gainValueDisplay = this.shadowRoot.querySelector('.gain-value');
        this.gainInput.addEventListener('input', this.handleGainChange.bind(this));
    }

    static get observedAttributes() {
        return ['gain'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'gain') {
            this.gainValueDisplay.textContent = newValue;
            this.gainInput.value = newValue;
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" type="text/css" href="./styles/gain.css">
        <input type="range" min="0" max="10" step="0.01" value="0" id="gainInput">
        <span class="gain-value">0</span>
        <span>Gain</span>
        `;
    }

    handleGainChange() {
        const newGain = this.gainInput.value;
        this.setAttribute('gain', newGain);
        this.dispatchEvent(new CustomEvent('gainChange', {
            bubbles: true,
            composed: true,
            detail: {
                gain: newGain
            }
        }));
    }
}
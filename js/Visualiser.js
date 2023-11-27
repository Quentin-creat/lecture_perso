export default class Visualizer extends HTMLElement {
    constructor() {
        super();
        this.barWidth = 1;
        this.barGap = 1;
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    updateFrequency(dataArray, bufferLength, bufferPercentage) {
        this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvasCtx.fillStyle = "rgba(0, 0, 0, 0)";
        this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const barCount = (this.canvas.width / (this.barWidth + this.barGap)) - this.barGap;
        const bufferSize = (bufferLength * bufferPercentage) / 100;
        let x = 0;

        for (let i = 0; i < barCount; i++) {
            const iPerc = Math.round((i * 100) / barCount);
            const pos = Math.round((bufferSize * iPerc) / 100);
            const frequency = dataArray[pos];
            const frequencyPerc = (frequency * 100) / 255;
            const barHeight = (frequencyPerc * this.canvas.height) / 100;
            const y = this.canvas.height - barHeight;

            this.canvasCtx.fillStyle = `rgba(210, 10, 30)`;
            this.canvasCtx.fillRect(x, y, this.barWidth, barHeight);

            x += (this.barWidth + this.barGap);
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" type="text/css" href="./styles/visualizer.css">
            <canvas class="visualizer" style="width: 100%; height: 20px"></canvas>
        `;
        this.canvas = this.shadowRoot.querySelector('canvas');
        this.canvasCtx = this.canvas.getContext("2d");
        const scale = window.devicePixelRatio;
        this.canvas.width = Math.floor(this.canvas.width * scale);
        this.canvas.height = Math.floor(this.canvas.height * scale);
    }
}
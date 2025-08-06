class Hexagon extends HTMLElement {
    static observedAttributes = ["orientation", "fill"];

    constructor() {
        super();
        this._internals = this.attachInternals();

        this.fill = 'none';
        this.uniqueId = `hexagon-block-${Math.floor(Math.random() * 100000)}`;

        const shadow = this.attachShadow({mode: 'open'});
        this.wrapper = document.createElement('div');
        this.wrapper.setAttribute('id', this.uniqueId);
        shadow.appendChild(this.wrapper);
        this.render()
    }

    connectedCallback() {
        this.addEventListener('click', this.handleClick.bind(this))
    }

    disconnectedCallback() {
        this.removeEventListener('click', this.handleClick.bind(this));
    }

    attributeChangedCallback(name, oldVal, newVal) {
        switch (name) {
            case 'fill':
                this.setFill(newVal);
                break;
            case 'orientation':
                    this.setOrientation(newVal);
                    break;
            default:
                // nothin
        }
        this.render();
    }

    setFill(newVal) {
        this.fill = newVal === 'true' ? 'var(--fill)' : 'none';
    }

    setOrientation(newVal) {
        this.rotation = newVal === 'vertical' ? '90deg' : '0deg';
    }

    // toggle solid/hollow on click
    handleClick() {
        const fill = this.getAttribute('fill');
        !!fill ? this.removeAttribute('fill') : this.setAttribute('fill', 'true');
    }

    render() {
        this.wrapper.innerHTML = `
            <svg height="100" width="100" xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink">
                <defs>
                    <clipPath id="hexagon-mask">
                        <use xlink:href="#hexagon"/>
                    </clipPath>

                    <polygon
                        style="z-index: -10"
                        fill="${this.fill}"
                        id="hexagon"
                        points="25,0 75,0 100,50 75,100 25,100 0,50"
                    />
                </defs>

                <use
                    style="transform-box: fill-box; transform-origin: center; transform: rotate(${this.rotation})"
                    clip-path="url(#hexagon-mask)"
                    stroke="var(--stroke)"
                    stroke-width="var(--stroke-width)"
                    xlink:href="#hexagon"
                />
            </svg>
        `;
    }
}

customElements.define('hexagon-block', Hexagon);
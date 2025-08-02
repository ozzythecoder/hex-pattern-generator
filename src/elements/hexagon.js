class Hexagon extends HTMLElement {
    static observedAttributes = ["orientation"];

    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({mode: 'open'});
        const wrapper = document.createElement('div');

        let rotation = '0deg';
        if (this.getAttribute('orientation') === 'vertical') {
            rotation = '90deg';
        }

        wrapper.innerHTML = `
            <svg height="100" width="100" xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink">
                <defs>
                    <clipPath id="hexagon-mask">
                        <use xlink:href="#hexagon"/>
                    </clipPath>

                    <polygon
                        fill="none"
                        id="hexagon"
                        points="25,0 75,0 100,50 75,100 25,100 0,50"
                    />
                </defs>

                <use
                    style="transform-box: fill-box; transform-origin: center; transform: rotate(${rotation})"
                    clip-path="url(#hexagon-mask)"
                    stroke="var(--stroke)"
                    stroke-width="var(--stroke-width)"
                    xlink:href="#hexagon"
                />
            </svg>
        `;
        shadow.appendChild(wrapper);
    }
}

customElements.define('hexagon-block', Hexagon);
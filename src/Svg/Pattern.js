import { SvgElement } from "./Element.js";

/**
 * Represents a pattern element in SVG.
 * @extends SvgElement
 */
class Pattern extends SvgElement {
	/**
	 * The name of the pattern element.
	 * @type {string}
	 */
	name = "pattern";

	/**
	 * The pattern units of the pattern element.
	 * @type {string}
	 */
	patternUnits = "userSpaceOnUse"; // userSpaceOnUse | objectBoundingBox

	/**
	 * Creates a new Pattern instance.
	 * @param {number} width - The width of the pattern.
	 * @param {number} height - The height of the pattern.
	 */
	constructor(width, height) {
		super();
		this.id = Pattern.createId();
		this.width = width;
		this.height = height;
		this.children = [];
	}

	/**
	 * Creates the DOM representation of the pattern element.
	 * @returns {Element} The DOM element representing the pattern.
	 */
	createDom() {
		const result = super.createDom({
			id: this.id,
			width: this.width,
			height: this.height,
			patternUnits: this.patternUnits,
		});
		result.innerHTML = `<g>
			<rect stroke="black" stroke-width="2" x="0" y="0" width="28" height="28" fill="#ff0"/>
			<path transform="translate(-2, -10) scale(.1)" d="m192 160 83.138 48v96l-83.138 48-83.138-48v-96z" fill="#800000"/>
		</g>`;
		return result;
	}

	/**
	 * Creates a unique ID for the pattern element.
	 * @param {string} [prefix="pattern"] - The prefix for the ID.
	 * @returns {string} The generated ID.
	 */
	static createId(prefix = "pattern") {
		var result = ((new Date()) * Math.random()).toString(36).replace(/[\d\.]/g, "");
		result = (result + result).slice(0, 8);
		return prefix + result;
	}

	/**
	 * Adds a child element to the pattern.
	 * @param {SvgElement} ...children - The children element to add.
	 */
	addChildren(...children) {
		this.children.push(...children);
		return this;
	}

	/**
	 * Renders the pattern element as an SVG string.
	 * @returns {string} The SVG string representing the pattern.
	 */
	render() {
		return `<pattern id="${this.id}" width="${this.width}" height="${this.height}" patternTransform="${this.patternTransform}" patternUnits="${this.patternUnits}">
			${this.children.map((child) => child.render()).join("")}
		</pattern>`;
	}
}

export { Pattern, Pattern as default };
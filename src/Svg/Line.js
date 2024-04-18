import { SvgElement } from "./Element.js";

/**
 * Represents a path in SVG format.
 * @extends SvgElement
 */
class Line extends SvgElement {
	/**
	 * The name of the path.
	 * @type {string}
	 */
	name = "line";

	/**
	 * Constructs a new path object.
	 */
	constructor(pt1, pt2) {
		super(pt1.x, pt1.y);
		this.pt1 = pt1;
		this.pt2 = pt2;
	}

	/**
	 * Creates the DOM representation of the path.
	 * @returns {Element} The DOM element representing the path.
	 */
	createDom() {
		const result = super.createDom();
		result.setAttribute('x1', this.pt1.x);
		result.setAttribute('y1', this.pt1.y);
		result.setAttribute('x2', this.pt2.x);
		result.setAttribute('y2', this.pt2.y);
		return result;
	}

	/**
	 * Creates the SVG controls for the path.
	 * @returns {Element} The SVG controls element.
	 */
	svg_controls() {
		const result = document.createElementNS('http://www.w3.org/2000/svg', 'g');
		result.appendChild(this.pt1.svg_controls());
		result.appendChild(this.pt2.svg_controls());
		return result;
	}
}

export { Line as Path, Line as default };
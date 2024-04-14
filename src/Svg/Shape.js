import { SvgElement } from "./Element.js";

/**
 * Represents a shape in SVG format.
 * @extends SvgElement
 */
class Shape extends SvgElement {
	/**
	 * The name of the shape.
	 * @type {string}
	 */
	name = "path";

	/**
	 * Constructs a new Shape object.
	 */
	constructor() {
		super();
		/**
		 * The segments that make up the shape.
		 * @type {Array}
		 */
		this.segments = [];
	}

	/**
	 * Adds a segment to the shape.
	 * @param {Segment} segment - The segment to add.
	 * @param {number|null} to - The index to insert the segment at. If null, the segment is appended to the end.
	 * @returns {Shape} The updated Shape object.
	 */
	addSegment(segment, to = null) {
		if (to) {
			if (typeof to !== 'number') {
				//ALERT Infinite loop
				segment.start = to;
				to = this.segments.indexOf(to);
				if (to < 0) {
					this.segments.push(segment);
					return this;
				}
			}
			segment.start = this.segments[to];
			this.segments[to] = segment;
			return this;
		}
		this.segments.push(segment);
		return this;
	}

	/**
	 * Creates the DOM representation of the shape.
	 * @returns {Element} The DOM element representing the shape.
	 */
	createDom() {
		const result = super.createDom();
		result.setAttribute('d', this.segments.map((segment, index) => segment.toString(2)).join(' '));
		return result;
	}

	/**
	 * Creates the SVG controls for the shape.
	 * @returns {Element} The SVG controls element.
	 */
	svg_controls() {
		const result = document.createElementNS('http://www.w3.org/2000/svg', 'g');
		this.segments.forEach((segment, index) => {
			result.appendChild(segment.svg_controls());
		});
		return result;
	}
}

export { Shape, Shape as default };
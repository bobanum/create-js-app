import { SvgElement } from "./Element.js";

/**
 * Represents a path in SVG format.
 * @extends SvgElement
 */
class Path extends SvgElement {
	/**
	 * The name of the path.
	 * @type {string}
	 */
	name = "path";

	/**
	 * Constructs a new path object.
	 */
	constructor(x = 0, y = 0) {
		super(x, y);
		/**
		 * The segments that make up the path.
		 * @type {Array}
		 */
		this.segments = [];
	}

	/**
	 * Adds a segment to the path.
	 * @param {Segment} segment - The segment to add.
	 * @param {number|null} to - The index to insert the segment at. If null, the segment is appended to the end.
	 * @returns {Path} The updated path object.
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
	 * Creates the DOM representation of the path.
	 * @returns {Element} The DOM element representing the path.
	 */
	createDom() {
		const result = super.createDom();
		result.setAttribute('d', this.segments.map((segment, index) => segment.toString(2)).join(' '));
		return result;
	}

	/**
	 * Creates the SVG controls for the path.
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

export { Path as Path, Path as default };
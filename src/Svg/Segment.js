import { SvgElement } from "./Element.js";
import Point from "./Point.js";

/**
 * Represents a segment in an SVG element.
 */
class Segment extends SvgElement {
	name = "path";

	/**
	 * Creates a new Segment instance.
	 * @param {Point} start - The starting point of the segment.
	 * @param {Point} end - The ending point of the segment.
	 * @param {Point|null} controlStart - The control point for the start of the segment (optional).
	 * @param {Point|null} controlEnd - The control point for the end of the segment (optional).
	 */
	constructor(start, end, controlStart = null, controlEnd = null) {
		super();
		this.start = start;
		this.end = end;
		this.controlStart = controlStart;
		this.controlEnd = controlEnd;
	}

	/**
	 * Gets the x-coordinate of the segment.
	 * @returns {number} The x-coordinate.
	 */
	get x() {
		return this.start.end?.x || this.start.x;
	}

	/**
	 * Gets the y-coordinate of the segment.
	 * @returns {number} The y-coordinate.
	 */
	get y() {
		return this.start.end?.y || this.start.y;
	}

	/**
	 * Gets the type of the segment.
	 * @returns {string} The segment type.
	 */
	get type() {
		if (this.start instanceof Point) {
			return 'M';
		}
		if (!this.controlStart && !this.controlEnd) {
			if (this.start.x === this.end.x) {
				return 'V';
			}
			if (this.start.y === this.end.y) {
				return 'H';
			}
			return 'L';
		}
		if (!this.controlStart && this.controlEnd) {
			return 'Q';
		}
		if (this.controlStart && !this.controlEnd) {
			return 'S';
		}
	}

	/**
	 * Converts the segment to a string representation.
	 * @param {number} begin - The beginning value (0: no beginning, 1: detached segment, 2: from the beginning).
	 * @returns {string} The string representation of the segment.
	 */
	toString(begin = 0) {
		const result = [];
		if (begin === 1 || Point.isInstance(this.start)) {
			result.push(`M ${this.start.end || this.start}`);
		} else if (begin === 2) {
			result.push(`${this.start.toString(2)}`);
		}
		if (!this.controlStart && !this.controlEnd) {
			if (this.start.x === this.end.x) {
				result.push(`V ${this.end.y}`);
			}
			if (this.start.y === this.end.y) {
				result.push(`H ${this.end.x}`);
			}
			result.push(`L ${this.end}`);
		}
		if (this.controlStart && !this.controlEnd) {
			result.push(`Q ${this.controlStart} ${this.end}`);
		}
		if (!this.controlStart && this.controlEnd) {
			result.push(`S ${this.controlEnd} ${this.end}`);
		}
		if (this.controlStart && this.controlEnd) {
			result.push(`C ${this.controlStart} ${this.controlEnd} ${this.end}`);
		}
		return result.join(' ');
	}

	/**
	 * Creates the DOM representation of the segment.
	 * @returns {Element} The DOM element representing the segment.
	 */
	createDom() {
		const result = super.createDom({ d: this.toString() });
		return result;
	}

	/**
	 * Creates the SVG controls for the segment.
	 * @returns {Element} The SVG controls element.
	 */
	svg_controls() {
		const result = document.createElementNS('http://www.w3.org/2000/svg', 'g');
		if (Point.isInstance(this.start)) {
			result.appendChild(this.start.svg_controls());
		} else {
			[...this.start.svg_controls().children].forEach((control) => {
				result.appendChild(control);
			});
		}
		result.appendChild(this.end.svg_controls());
		if (Point.isInstance(this.controlStart)) {
			result.appendChild(this.controlStart.svg_controls()).setAttribute('fill', 'blue');
		}
		if (Point.isInstance(this.controlEnd)) {
			result.appendChild(this.controlEnd.svg_controls()).setAttribute('fill', 'green');
		}
		return result;
	}
}

export { Segment, Segment as default };
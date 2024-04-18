import { SvgElement } from "./Element.js";
import Line from "./Line.js";
import Point from "./Point.js";

/**
 * Represents a segment in an SVG element.
 */
class Segment extends SvgElement {
	name = "path";
	static NO_BEGINNING = 0;
	static DETACHED = 1;
	static FROM_BEGINNING = 2;

	/**
	 * Creates a new Segment instance.
	 * @param {Point} start - The starting point of the segment.
	 * @param {Point} end - The ending point of the segment.
	 * @param {Point|null} controlStart - The control point for the start of the segment (optional).
	 * @param {Point|null} controlEnd - The control point for the end of the segment (optional).
	 */
	constructor(start, end = null, controlStart = null, controlEnd = null) {
		super(start.x, start.y);
		this.origin = start.origin || start;
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
		return (this.start.end || this.start).x;
	}
	set x(value) {
		this._x = (this.start.end || this.start).x = value;
	}

	/**
	 * Gets the y-coordinate of the segment.
	 * @returns {number} The y-coordinate.
	 */
	get y() {
		return (this.start.end || this.start).y;
	}
	set y(value) {
		this._y = (this.start.end || this.start).y = value;
	}
	get looping() {
		return this.origin === this.end;
	}
	get length() {
		if (Segment.isInstance(this.start)) {
			return this.start.length + 1;
		}
		return 1;
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
	toString(begin = Segment.NO_BEGINNING) {
		const result = [];
		if (Segment.isInstance(this.start)) { // This is not the start of the path
			if (begin === Segment.DETACHED) {
				result.push(`M ${this.start.end}`);
			} else if (begin === Segment.FROM_BEGINNING) {
				result.push(`${this.start.toString(2)}`);
			}
		} else { // This is the start of the path
			if (begin > Segment.NO_BEGINNING) {
				result.push(`M ${this.start}`);
			}
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
		const result = super.createDom({ d: this.toString(Segment.FROM_BEGINNING) });
		return result;
	}
	grow(end, controlStart = null, controlEnd = null) {
		if (!this.end) {
			this.end = end;
			this.controlStart = controlStart;
			this.controlEnd = controlEnd;
			return this;
		}
		const result = new this.constructor(this, end, controlStart, controlEnd);
		return result;
	}
	grow_rel(end, controlStart = null, controlEnd = null) {
		const ref = this.end || this.start;
		end.add(ref);
		if (controlStart) {
			controlStart.add(ref);
		}
		if (controlEnd) {
			controlEnd.add(ref);
		}

		return this.grow(end, controlStart, controlEnd);
	}
	clone() {
		return new this.constructor(this.start.clone(), this.end ? this.end.clone() : null, this.controlStart ? this.controlStart.clone() : null, this.controlEnd ? this.controlEnd.clone() : null);
	}
}

export { Segment, Segment as default };
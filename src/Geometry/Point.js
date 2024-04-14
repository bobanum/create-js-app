/**
 * Represents a point in an SVG element.
 * @extends SvgElement
 */
class Point {
	_x = null;
	_y = null;
	_a = null;
	_r = null;
	/**
	 * Creates a new Point instance.
	 * @param {number} x - The x-coordinate of the point.
	 * @param {number} y - The y-coordinate of the point.
	 */
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}
	get x() {
		if (this._x === null) {
			this._x = this._r * Math.cos(this._a);
			this._y = this._r * Math.sin(this._a);
		}
		return this._x;
	}
	set x(value) {
		if (value === this._x) return;
		this._x = value;
		this._a = null;
		this._r = null;
	}
	

	/**
	 * Returns a string representation of the point.
	 * @returns {string} The string representation of the point.
	 */
	toString() {
		return `${this.x},${this.y}`;
	}

	/**
	 * Creates the DOM representation of the point.
	 * @returns {Element} The DOM element representing the point.
	 */
	createDom() {
		const result = super.createDom({ cx: this.x, cy: this.y, r: 5, fill: 'black', 'fill-opacity': 0.5 });
		return result;
	}

	/**
	 * Returns the SVG controls for the point.
	 * @returns {Element} The SVG controls for the point.
	 */
	svg_controls() {
		return this.dom;
	}
}

export { Point, Point as default };
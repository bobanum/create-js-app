/**
 * Represents a point in an SVG element.
 * @extends SvgElement
 */
class Point extends DOMPoint {
	/**
	 * Creates a new this.constructor instance.
	 * @param {number} x - The x-coordinate of the point.
	 * @param {number} y - The y-coordinate of the point.
	 */
	constructor(x = 0, y = 0) {
		super(x, y);
	}
	matrixTransform(matrix) {
		({x:this.x, y:this.y} = super.matrixTransform(matrix));
		return this;
	}
	translate(x, y) {
		this.x += x;
		this.y += y;
		return this;
	}
	rotate(angle, x = 0, y = 0) {
		let matrix = new DOMMatrix().rotate(angle, x, y);
		return this.matrixTransform(matrix);
	}
	scale(scaleX, scaleY, x = 0, y = 0) {
		let matrix = new DOMMatrix().scale(scaleX, scaleY, x, y);
		return this.matrixTransform(matrix);
	}

}

export { Point, Point as default };
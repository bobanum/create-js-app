import { SvgElement } from "./Element.js";

class Point extends SvgElement {
	name = "circle";

	constructor(x = 0, y = 0) {
		super();
		this.x = x;
		this.y = y;
	}
	toString() {
		return `${this.x},${this.y}`;
	}
	createDom() {
		const result = super.createDom({ cx: this.x, cy: this.y, r: 5, fill: 'black', 'fill-opacity': 0.5 });
		return result;
	} 
	svg_controls() {
		return this.dom;
	}
	static isInstance(object) {
		return object instanceof this;
	}

}
export { Point, Point as default };
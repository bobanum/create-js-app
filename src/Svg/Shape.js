import { SvgElement } from "./Element.js";

class Shape extends SvgElement {
	name = "path";

	constructor() {
		super();
		this.segments = [];
	}
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
	createDom() {
		const result = super.createDom();
		result.setAttribute('d', this.segments.map((segment, index) => segment.toString(2)).join(' '));
		return result;
	}
	svg_controls() {
		const result = document.createElementNS('http://www.w3.org/2000/svg', 'g');
		this.segments.forEach((segment, index) => {
			result.appendChild(segment.svg_controls());
		});
		return result;
	}
	static isInstance(object) {
		return object instanceof this;
	}
}
export { Shape, Shape as default };
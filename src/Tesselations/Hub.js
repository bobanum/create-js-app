import Point from "./Point.js";
import Segment from "./Segment.js";

class Hub extends Point {
	constructor(x = 0, y = 0) {
		super(x, y);
		this.segments = [new Segment(this)];
		this.pivots = [];
	}
	createDom() {
		// const result = super.createDom();
		// result.classList.add("hub");
		const result = this.segments[0].clone(true).dom;
		result.setAttribute("transform", "translate(10,10)");
		// return result.dom;
		return result;
	}
	svg_controls() {
		return super.createDom();
		// return this.segments[0].svg_controls();
	}
}
export { Hub as default, Hub };
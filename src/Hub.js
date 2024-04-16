import Point from "./Svg/Point.js";
import Segment from "./Svg/Segment.js";

class Hub extends Point {
	constructor(x = 0, y = 0) {
		super(x, y);
		this.segments = [new Segment(this)];
		this.pivots = [];
	}
}
export { Hub as default, Hub };
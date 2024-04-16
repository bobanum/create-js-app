import Path from "./Svg/Path.js";

class Shape extends Path {
	constructor(x, y) {
		super(x, y);
		this.hubs = [];
	}
	addHub(hub) {
		this.hubs.push(hub);
		this.addSegment(hub.segments[0]);
		return this;
	}
}
export { Shape, Shape as default };
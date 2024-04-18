import Point from "../Geometry/Point.js";

class Pivot extends Point {
	constructor(x = 0, y = 0) {
		super(x, y);
		this.points = [];
	}
}
export { Pivot as default, Pivot as Pivot };
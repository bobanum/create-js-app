import { Point as SvgPoint } from "../Svg/Point.js";
SVGAngle
/**
 * Represents a point in an SVG element.
 * @extends SvgPoint
 */
class Point extends SvgPoint {
	/**
	 * Returns the SVG controls for the point.
	 * @returns {Element} The SVG controls for the point.
	 */
	svg_controls() {
		return this.dom;
	}
}
class ControlPoint extends Point {
}

export { Point, Point as default, ControlPoint};
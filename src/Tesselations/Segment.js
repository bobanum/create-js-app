import { Segment as SvgSegment } from "../Svg/Segment.js";
import Line from "../Svg/Line.js";

/**
 * Represents a segment in an SVG element.
 */
class Segment extends SvgSegment {
	/**
	 * Creates the SVG controls for the segment.
	 * @returns {Element} The SVG controls element.
	 */
	svg_controls() {
		function controlLine(point, from, classes = []) {
			const result = document.createElementNS('http://www.w3.org/2000/svg', 'g');
			result.classList.add(...classes);
			result.appendChild(point.svg_controls());
			result.appendChild((new Line(point, from)).dom);
			return result;
		}
		const result = document.createElementNS('http://www.w3.org/2000/svg', 'g');
		if (!this.end) {
			let pt = result.appendChild(this.start.svg_controls());
			pt.classList.add('anchor');
			console.log('end', this.end, this.controlEnd, this.controlStart);
			return result;
		}

		let ref = this;
		do {
			let pt = result.appendChild(ref.end.svg_controls());
			pt.classList.add('anchor');
			ref = ref.start;
		} while (Segment.isInstance(ref));
		let pt = result.appendChild(ref.svg_controls());
		pt.classList.add('anchor');
		ref = this;
		do {
			if (ref.controlEnd) {
				result.appendChild(controlLine(ref.controlEnd, ref.end, ['control', 'end']));
			}
			if (ref.controlStart && ref.controlEnd) {
				result.appendChild(controlLine(ref.controlStart, ref, ['control', 'start']));
			}
			if (ref.start.controlEnd && !ref.controlStart) {
				let virtual = ref.start.controlEnd.clone().subtract(ref).flip().add(ref);
				result.appendChild(controlLine(virtual, ref, ['control', 'start', 'virtual']));
			}
			if (ref.controlStart && !ref.controlEnd) {
				result.appendChild(controlLine(ref.controlStart, ref, ['control', 'start']));
				result.appendChild(controlLine(ref.controlStart, ref.end, ['control', 'end', 'virtual']));
			}
			ref = ref.start;
		} while (Segment.isInstance(ref));

		return result;
	}
}

export { Segment, Segment as default };
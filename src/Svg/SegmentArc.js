class SegmentArc {
	name = "path";

	constructor(start, end, controlStart = null, controlEnd = null) {
		this.start = start;
		this.end = end;
		this.controlStart = controlStart;
		this.controlEnd = controlEnd;
	}
	toString(begin = false) {
		if (begin) {
			return `M${this.start.x} ${this.start.y} C${this.controlStart.x} ${this.controlStart.y} ${this.controlEnd.x} ${this.controlEnd.y} ${this.end.x} ${this.end.y}`;
		}
		// Mm Ll Hh Vv Cc Ss Qq Tt Aa Zz
		return `M${this.start.x} ${this.start.y} C${this.controlStart.x} ${this.controlStart.y} ${this.controlEnd.x} ${this.controlEnd.y} ${this.end.x} ${this.end.y}`;
	}
	createDom() {
		const result = super.createDom();
		return result;
	}
}
export { SegmentArc as SegmentArc, SegmentArc as default };
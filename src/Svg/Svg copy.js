import { SvgElement } from "./Element.js";
import Pattern from "./Pattern.js";

class Svg extends SvgElement {
	_dom = null;
	_defs = null;
	name = "svg";

	constructor(width = "100%", height = "100%") {
		super('svg');
		this.width = width;
		this.height = height;
		this.children = [];
		this.drawControls = false;
	}
	createDom() {
		// this._defs = this.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'defs'));
		// let pattern = this._defs.appendChild(new Pattern(28,28).dom);
		// let rect = this.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'rect'));
		// rect.setAttribute('width', '100%');
		// rect.setAttribute('height', '100%');
		// rect.setAttribute('fill', `url(#${pattern.getAttribute('id')})`);
		const result = super.createDom({ width: this.width, height: this.height, viewBox: `0 0 500 500` });
		if (this.drawControls) {
			this.children.forEach((child) => {
				if (child.svg_controls) {
					result.appendChild(child.svg_controls());
				}
			});
		}
		return result;
	}
	addContent(...child) {
		this.children.push(...child);
		return this;
	}
	static isInstance(object) {
		return object instanceof this;
	}

}
export { Svg, Svg as default };
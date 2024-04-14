import { SvgElement } from "./Element.js";

class Pattern extends SvgElement {
	name = "pattern";
	patternUnits = "userSpaceOnUse";	// userSpaceOnUse | objectBoundingBox
	constructor(width, height) {
		super();
		this.id = Pattern.createId();
		this.width = width;
		this.height = height;
		this.children = [];
	}
	createDom() {
		const result = super.createDom({ id: this.id, width: this.width, height: this.height, patternUnits: this.patternUnits });
		result.innerHTML = `<g>
		<rect stroke="black" stroke-width="2" x="0" y="0" width="28" height="28" fill="#ff0"/>
		<path transform="translate(-2, -10) scale(.1)" d="m192 160 83.138 48v96l-83.138 48-83.138-48v-96z" fill="#800000"/>
	</g>`;
		return result;
	}
	static isInstance(object) {
		return object instanceof this;
	}
	static createId(prefix = "pattern") {
		var result = ((new Date()) * Math.random()).toString(36).replace(/[\d\.]/g, "");
		result = (result+result).slice(0, 8);
		return prefix + result;
	}

	addChildren(child) {
		this.children.push(child);
	}

	render() {
		return `<pattern id="${this.id}" width="${this.width}" height="${this.height}" patternTransform="${this.patternTransform}" patternUnits="${this.patternUnits}">
      ${this.children.map((child) => child.render()).join("")}
    </pattern>`;
	}

	// <pattern id="pattern6113" patternTransform="matrix(.44444 0 0 .44444 96 224)" xlink:href="#pattern5126"/>
	// <pattern id="pattern5126" width="288" height="288" patternTransform="translate(32,96)" patternUnits="userSpaceOnUse">
	// 	<g transform="translate(-32,-96)">
	// 		<rect x="32" y="96" width="288" height="288" fill="#ff0" fill-rule="evenodd" stop-color="#000000" style="-inkscape-stroke:none;paint-order:markers stroke fill"/>
	// 		<path d="m192 160 83.138 48v96l-83.138 48-83.138-48v-96z" fill="#800000" fill-rule="evenodd" stop-color="#000000" style="-inkscape-stroke:none;paint-order:markers stroke fill"/>
	// 	</g>
	// </pattern>
}


export { Pattern, Pattern as default };
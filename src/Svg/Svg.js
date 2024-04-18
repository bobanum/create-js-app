import { SvgElement } from "./Element.js";
import Pattern from "./Pattern.js";

/**
 * Represents an SVG component.
 * @extends SvgElement
 */
class Svg extends SvgElement {
	_dom = null;
	_dom_defs = null;
	_dom_background = null;
	_dom_content = null;
	_dom_controls = null;
	name = "svg";

	/**
	 * Creates a new Svg instance.
	 * @param {string} width - The width of the SVG element.
	 * @param {string} height - The height of the SVG element.
	 */
	constructor(width = "100%", height = "100%") {
		super('svg');
		this.width = width;
		this.height = height;
		this.content = [];
		this.drawControls = false;
	}

	/**
	 * Creates the DOM structure for the Svg component.
	 * @returns {HTMLElement} The root SVG element.
	 */
	createDom() {
		this._dom_defs = new SvgElement('defs');
		let pattern = this._dom_defs.appendChild(new Pattern(28,28));
		this._dom_background = new SvgElement('rect', { x: 0, y: 0, width: '100%', height: '100%', fill: `url(#${pattern.id})` });
		this._dom_background.setAttribute('opacity', 0.1);
		this._dom_content = new SvgElement('g', { class: 'content' });
		this._dom_controls = new SvgElement('g', { class: 'controls' });
		this.appendChild(this._dom_defs);
		this.appendChild(this._dom_background);
		this.appendChild(this._dom_content);
		this.appendChild(this._dom_controls);
		
		const result = super.createDom({ width: this.width, height: this.height, viewBox: `0 0 500 500` });
		this.content.forEach((child) => {
			this._dom_content.appendChild(child.dom);
			this._dom_controls.appendChild(child.svg_controls());
		});
		return result;
	}

	/**
	 * Adds content to the Svg component.
	 * @param {...SvgElement} children - The elements to add to the Svg component.
	 * @returns {Svg} The Svg component instance.
	 */
	addContent(...children) {
		this.content.push(...children);
		return this;
	}
}

export { Svg, Svg as default };
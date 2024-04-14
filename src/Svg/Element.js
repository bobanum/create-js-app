/**
 * Represents an SVG element.
 */
class Element {
	_dom = null;
	name = "Element";

	/**
	 * Creates a new instance of the Element class.
	 * @param {string} name - The name of the SVG element.
	 * @param {Object} attributes - The attributes of the SVG element.
	 * @param {Array} children - The children of the SVG element.
	 */
	constructor(name = this.name, attributes = {}, children = []) {
		this.name = name;
		this.attributes = {};
		for (let name in attributes) {
			this.setAttribute(name, attributes[name]);
		}
		this.children = [];
		children.forEach(child => {
			this.appendChild(child);
		});
	}

	/**
	 * Gets the DOM representation of the SVG element.
	 * @returns {Element} - The DOM element.
	 */
	get dom() {
		if (!this._dom) {
			this._dom = this.createDom();
			this._dom.obj = this;
		}
		return this._dom;
	}

	/**
	 * Creates the DOM representation of the SVG element.
	 * @param {Object} extraAttributes - Additional attributes for the DOM element.
	 * @param {Array} extraChildren - Additional children for the DOM element.
	 * @returns {Element} - The DOM element.
	 */
	createDom(extraAttributes = {}, extraChildren = []) {
		const result = document.createElementNS('http://www.w3.org/2000/svg', this.name);
		for (let name in this.attributes) {
			result.setAttribute(name, this.attributes[name]);
		}
		for (let name in extraAttributes) {
			result.setAttribute(name, extraAttributes[name]);
		}

		this.children.forEach(child => {
			const childDom = child instanceof Element ? child.dom : child instanceof Node ? child : document.createTextNode(child);
			result.appendChild(childDom);
		});
		extraChildren.forEach(child => {
			result.appendChild(child instanceof Element ? child.dom : child instanceof Node ? child : document.createTextNode(child));
		});
		return result;
	}

	/**
	 * Appends a child to the SVG element.
	 * @param {Element|Node|string} child - The child element to append.
	 * @returns {Element} - The appended child element.
	 */
	appendChild(child) {
		this.children.push(child);
		child.parent = this;
		if (this._dom) {
			this._dom.appendChild(child instanceof Element ? child.dom : child instanceof Node ? child : document.createTextNode(child));
		}
		return child;
	}

	/**
	 * Sets an attribute for the SVG element.
	 * @param {string} name - The name of the attribute.
	 * @param {string} value - The value of the attribute.
	 */
	setAttribute(name, value) {
		this.attributes[name] = value;
		if (this._dom) {
			this._dom.setAttribute(name, value);
		}
	}

	/**
	 * Gets the value of an attribute for the SVG element.
	 * @param {string} name - The name of the attribute.
	 * @returns {string|null} - The value of the attribute, or null if the attribute is not set.
	 */
	getAttribute(name) {
		if (this._dom) {
			return this._dom.getAttribute(name);
		}
		return this.attributes[name];
	}
	static isInstance(object) {
		return object instanceof this;
	}
}

export { Element, Element as SvgElement, Element as default };
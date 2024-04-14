class Element {
	_dom = null;
	name = "Element";

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
	get dom() {
		if (!this._dom) {
			this._dom = this.createDom();
			this._dom.obj = this;
		}
		return this._dom;
	}
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

	appendChild(child) {
		this.children.push(child);
		child.parent = this;
		if (this._dom) {
			this._dom.appendChild(child instanceof Element ? child.dom : child instanceof Node ? child : document.createTextNode(child));
		}
		return child;
	}

	setAttribute(name, value) {
		this.attributes[name] = value;
		if (this._dom) {
			this._dom.setAttribute(name, value);
		}
	}

	getAttribute(name) {
		if (this._dom) {
			return this._dom.getAttribute(name);
		}
		return this.attributes[name];
	}
}

export { Element, Element as SvgElement, Element as default };
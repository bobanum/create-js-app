import Menu from "./Menu.js";

class MenuItem {
	_dom;
	constructor(id, label, content) {
		this.id = id;
		this.label = label;
		this.setContent(content);
	}
	get icon() {
		if (this.label instanceof Array && this.label.length > 1) {
			return this.label.slice(-1)[0];
		}
		return null;
	}
	get dom() {
		if (!this._dom) {
			const result = document.createElement('li');
			const a = result.appendChild(document.createElement('a'));
			if (typeof this.label === 'string') {
				a.appendChild(this.dom_label(this.label));
			} else if (Array.isArray(this.label)) {
				a.appendChild(this.dom_label(this.label[0]));
				this.label.slice(1, -1).forEach(text => {
					let span = a.appendChild(document.createElement('span'));
					span.innerHTML = text;
				});
			}
			if (this.icon) {
				a.dataset.icon = this.icon;
			}
			if (Menu.isInstance(this.content)) {
				a.href = '#';
				result.appendChild(this.content.dom);
				a.addEventListener('click', e => {
					e.preventDefault();
				});
			} else if (typeof this.content === 'function') {
				a.href = '#';
				a.addEventListener('click', e => {
					e.preventDefault();
					this.content();
				});
			} else {
				a.href = this.content;
				a.addEventListener('click', e => {
					e.preventDefault();
				});
			}
			this._dom = result;
		}
		return this._dom;
	}
	dom_label(text) {
		const result = document.createElement('span');
		result.classList.add('label');
		result.innerHTML = text;
		return result;
	}
	dom_icon(icon = this.icon) {
		if (!icon) return document.createTextNode('');
		const result = document.createElement('span');
		result.classList.add('icon', 'material-icons');
		result.innerHTML = icon;
		return result;
	}
	getContent() {
		return this.content;
	}
	setContent(content) {
		if (typeof content === 'string') {
			content = new URL(content, window.location.href).href;
		} else if (Array.isArray(content)) {
			content = new Menu(content);
		}
		this.content = content;
		return this;
	}
	static isInstance(item) {
		return item instanceof this;
	}
	static from(item) {
		if (this.isInstance(item)) return item;
		return new this(item.id, item.label, item.content);
	}
}
export { MenuItem as default, MenuItem };


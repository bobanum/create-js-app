/**
 * Represents a menu.
 */
class Menu {
	_dom;
	items = [];

	/**
	 * Creates a new Menu instance.
	 * @param {Array} items - The items to add to the menu.
	 */
	constructor(items = []) {
		this.addItem(...items);
	}

	/**
	 * Gets the DOM element representing the menu.
	 * @returns {HTMLElement} The DOM element representing the menu.
	 */
	get dom() {
		if (!this._dom) {
			const result = document.createElement('ul');
			this.items.forEach(item => {
				result.appendChild(item.dom);
			});
			this._dom = result;
		}
		return this._dom;
	}

	/**
	 * Adds items to the menu.
	 * @param {...MenuItem} items - The items to add to the menu.
	 * @returns {Menu} The updated menu instance.
	 */
	addItem(...items) {
		items = items.map(item => MenuItem.from(item));
		this.items.push(...items);
		return this;
	}

	/**
	 * Gets the items in the menu.
	 * @returns {Array} The items in the menu.
	 */
	getItems() {
		return this.items;
	}

	/**
	 * Removes an item from the menu.
	 * @param {MenuItem} item - The item to remove from the menu.
	 */
	removeItem(item) {
		this.items = this.items.filter(i => i !== item);
	}

	/**
	 * Checks if an object is an instance of Menu.
	 * @param {Object} item - The object to check.
	 * @returns {boolean} True if the object is an instance of Menu, false otherwise.
	 */
	static isInstance(item) {
		return item instanceof this;
	}
}
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
export { Menu as default, Menu, MenuItem };


{/* <nav tabindex="1">
<ul>
	<li><a href="index.html"><span class="material-icons">home</span><span class="label">Home</span></a></li>
	<li><a href="#"><span class="material-icons">note_add</span><span class="label">New Project</span></a>
		<ul>
			<li><a href="#">Square</a>
				<ul>
					<li><a href="#">Straight</a></li>
					<li><a href="#">90&deg;</a></li>
				</ul>
			</li>
		</ul>
	</li>
	<li><a href="#">Laudantium Blanditiis!</a></li>
	<li><a href="#">Labore</a></li>
	<li><a href="#">Neque</a></li>
</ul>
</nav> */}
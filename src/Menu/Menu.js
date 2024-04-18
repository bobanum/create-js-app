import MenuItem from "./MenuItem.js";

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
export { Menu as default, Menu };

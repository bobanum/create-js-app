class Pattern {
	constructor() {
		this.pattern = [];
	}

	add(value) {
		this.pattern.push(value);
	}

	get() {
		return this.pattern;
	}
}
export { Pattern, Pattern as default };
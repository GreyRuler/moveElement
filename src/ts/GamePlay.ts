export default class GamePlay {
	private readonly goblin: HTMLElement;

	private container: Element;

	private counter: number;

	constructor(container: Element) {
		this.container = container;
		this.counter = 0;
		this.goblin = document.createElement('div');
		this.goblin.classList.add('goblin');
	}

	init() {
		const counterElement = document.querySelector('.counter');
		const timeout = 1000;
		let interval = setInterval(this.moveGoblin.bind(this), timeout);
		this.goblin.addEventListener('click', () => {
			this.goblin.classList.add('d-none');
			this.counter++;
			counterElement!.textContent = String(this.counter);
			clearInterval(interval);
			interval = setInterval(this.moveGoblin.bind(this), timeout);
		});
	}

	moveGoblin() {
		const cells = this.container.querySelectorAll('.box');
		const cell: HTMLElement = this.randomElementFromArray(Array.from(cells));
		this.goblin.classList.remove('d-none');
		cell.insertAdjacentElement('afterbegin', this.goblin);
	}

	// eslint-disable-next-line class-methods-use-this
	randomElementFromArray(array: any[]) {
		const randomIndex = Math.floor(Math.random() * array.length);
		return array[randomIndex];
	}
}

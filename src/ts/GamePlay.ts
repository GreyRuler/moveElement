export default class GamePlay {
	private readonly goblin: HTMLElement;

	private container: Element;

	private counter: number;
	private counterElement: HTMLElement | null;

	constructor(container: Element) {
		this.container = container;
		this.counter = 0;
		this.goblin = this.createGoblin();
		this.counterElement = document.querySelector('.counter');
	}

	init() {
		const timeout = 1000;
		setInterval(this.moveGoblin, timeout);
		this.goblin.addEventListener('click', () => {
			this.goblin.classList.add('d-none');
			this.counter++;
			this.counterElement!.textContent = String(this.counter);
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

	createGoblin() {
		const goblin = document.createElement('div');
		goblin.classList.add('goblin');
		return goblin;
	}
}

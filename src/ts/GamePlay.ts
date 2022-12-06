import { Toast } from 'bootstrap';

export default class GamePlay {
	private readonly goblin: HTMLElement;

	private container: Element;

	private counter: number;

	private counterElement: HTMLElement | null;

	private readonly cells: NodeListOf<Element>;

	private miss: number;

	private timer: NodeJS.Timer | undefined;

	private toast: Toast;

	private score: HTMLElement | null;

	constructor(container: Element) {
		this.container = container;
		this.counter = 0;
		this.miss = 0;
		this.goblin = this.createGoblin();
		this.counterElement = document.querySelector('.counter');
		this.toast = new Toast(
			document.querySelector('.toast')!,
			{
				delay: 1000000000
			}
		);
		this.score = document.querySelector('.score');
		this.cells = this.container.querySelectorAll('.box');
	}

	init() {
		const timeout = 1000;
		this.timer = setInterval(this.moveGoblin.bind(this), timeout);
		this.goblin.addEventListener('click', () => {
			this.goblin.classList.add('d-none');
			this.counter++;
			this.counterElement!.textContent = String(this.counter);
		});
		this.cells.forEach((cell) => {
			cell.addEventListener('click', (event: Event) => {
				const target = event.target as HTMLElement;
				if (!target?.closest('.goblin')) {
					this.miss++;
					if (this.miss === 5) {
						this.endGame();
					}
				}
			});
		});
	}

	moveGoblin() {
		const cell: HTMLElement = this.randomElementFromArray(Array.from(this.cells));
		this.goblin.classList.remove('d-none');
		cell.insertAdjacentElement('afterbegin', this.goblin);
	}

	// eslint-disable-next-line class-methods-use-this
	randomElementFromArray(array: any[]) {
		const randomIndex = Math.floor(Math.random() * array.length);
		return array[randomIndex];
	}

	// eslint-disable-next-line class-methods-use-this
	createGoblin() {
		const goblin = document.createElement('div');
		goblin.classList.add('goblin');
		return goblin;
	}

	endGame() {
		clearInterval(this.timer);
		this.goblin.classList.add('d-none');
		this.score!.textContent = String(this.counter);
		this.toast.show();
	}
}

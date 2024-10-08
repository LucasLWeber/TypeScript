import { Timeout } from "./Timeout.js";

export default class Slide{
	container;
	slides;
	controls;
	time;
	index: number;
	slide: Element;
	timeout: Timeout | null;
	paused: boolean;
	pausedTimeout: Timeout | null;
	thumbItens: HTMLElement[] | null;
	thumb: HTMLElement | null;

	constructor(container: Element, slides: Element[], controls: Element, time: number = 5000){
		this.container = container;
		this.slides = slides;
		this.controls = controls;
		this.time = time;
		this.index = localStorage.getItem('current-slide') ? Number(localStorage.getItem('current-slide')) : 0;
		this.slide = this.slides[this.index];
		this.timeout = null;
		this.paused = false;
		this.pausedTimeout = null;
		this.thumbItens = null;
		this.thumb = null;

		this.init();
	}

	hide(el: Element){
		el.classList.remove("active");
		if (el instanceof HTMLVideoElement){
			el.currentTime = 0;
			el.pause();
		}
	}

	show(index: number){
		this.index = index;
		this.slide = this.slides[this.index];
		this.slides.forEach(slide => this.hide(slide));
		this.slides[index].classList.add("active");
		
		localStorage.setItem('current-slide', this.index.toString());

		if (this.thumbItens){
			this.thumb = this.thumbItens[this.index];
			this.thumbItens.forEach(el => el.classList.remove("active"));
			this.thumb.classList.add("active");
		}

		if(this.slide instanceof HTMLVideoElement)
			this.autoVideo(this.slide)
		else
			this.auto(this.time);
	}

	autoVideo(video: HTMLVideoElement){
		video.muted = true;
		video.play();
		let firstPlay = true;
		
		if(firstPlay){
			video.addEventListener('playing', () => {
				this.auto(video.duration * 1000)
				firstPlay = false;
			});
		}
	}

	auto(time: number){
		this.timeout?.clear();
		this.timeout = new Timeout(() => this.next(), time);
		if (this.thumb) this.thumb.style.animationDuration = `${time}ms`;
	}

	pause(){
		document.body.classList.add('paused');
		this.pausedTimeout = new Timeout(() => {
			this.timeout?.pause();
			this.paused = true;
			this.thumb?.classList.add('paused');
			if(this.slide instanceof HTMLVideoElement) this.slide.pause();
		}, 300);
	}

	continue(){
		document.body.classList.remove('paused');
		this.pausedTimeout?.clear();
		if (this.paused) {
			this.paused = false;
			this.timeout?.continue();
			this.thumb?.classList.remove('paused');
			if(this.slide instanceof HTMLVideoElement) this.slide.play();
		}
	}

	prev(){
		if (this.paused) return;
		this.show(this.index === 0 ? this.slides.length - 1 : this.index -= 1);
	}

	next(){
		if (this.paused) return;
		this.show(this.index === this.slides.length - 1 ? this.index = 0 : this.index += 1);
	}

	private addControls(){
		const prevButton = document.createElement("button");
		prevButton.innerText = "Slide anterior";
		const nextButton = document.createElement("button");
		nextButton.innerText = "Próximo Slide";
		this.controls.appendChild(prevButton);
		this.controls.appendChild(nextButton);

		this.controls.addEventListener("pointerdown", () => this.pause());
		document.addEventListener("pointerup", () => this.continue());
		document.addEventListener("touchend", () => this.continue());
		prevButton.addEventListener("pointerup", () => this.prev());
		nextButton.addEventListener("pointerup", () => this.next());
	}

	private addThumbItens(){
		const thumbContainer = document.createElement('div');
		thumbContainer.id = 'slide-thumb';

		this.slides.forEach(slide => {
			thumbContainer.innerHTML += `
				<span><span class="thumb-item"></span></span>
			`;
		});

		this.controls.appendChild(thumbContainer);
		this.thumbItens = Array.from(document.querySelectorAll(".thumb-item"))
	}

	private init(){
		this.addControls();
		this.addThumbItens();
		this.show(this.index);
	}
}
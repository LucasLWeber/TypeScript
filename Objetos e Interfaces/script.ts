 /* Instance of */
 
class Produto {
	nome: string;
	preco: number;
	constructor(nome: string, preco: number){
		this.nome = nome;
		this.preco = preco;
	}

	precoReal(){
		return `R$ ${this.preco}`;
	}
}

class Livro extends Produto{
	autor: string;
	constructor(nome: string, preco: number, autor: string){
		super(nome, preco);
		this.autor = autor;
	}
}

class Jogo {
	jogadores: number;
	constructor(jogadores: number){
		this.jogadores = jogadores;
	}
}

function buscarProduto(busca: string) {
	if (busca === "O Hobbit")
		return new Livro("O hobbit", 49.99, "J. R. R. Tolkien");

	if (busca === "Dark Souls")
		return new Jogo(1);

	return null;
}

const livro = new Produto("A Guerra dos Tronos", 199.99);
// console.log(livro instanceof Produto);


const produto = buscarProduto("O Hobbit");
if(produto instanceof Livro)
	// console.log(produto.autor);


/* Interface no DOM */
interface Carro {
	nome: string;
}
const honda: Carro = {
	nome: "Honda",
}

/* Exercicio */
const anchor: HTMLElement | null = document.getElementById("origamid");

if (anchor instanceof HTMLAnchorElement && anchor !== null){
	anchor.setAttribute("href", anchor.href.replace("http", "https"));
	console.log(anchor?.getAttribute("href"));
}

/* Exercicio */

const elementos = document.querySelectorAll('.link');

elementos.forEach(elemento => {
	if (elemento instanceof HTMLElement)
		alteraElemento(elemento);
});

function alteraElemento(elemento: HTMLElement){
	elemento.style.color = "red";
	elemento.style.border = "1px solid blue";
}

/* Eventos e CallBack */

const button = document.querySelector('button');

function handleClick( e: PointerEvent) {
	console.log(e.currentTarget);
	e.pageX;
}

// button?.addEventListener('pointerdown', handleClick);

function toogleMenu(event: Event) {
	if (event instanceof MouseEvent) {
		event.pageX;
	} else if (event instanceof TouchEvent) {
		event.touches[0].pageX;
	}
}

document.documentElement.addEventListener('mousedown', toogleMenu);
document.documentElement.addEventListener('touchstart', toogleMenu);


// Estado dos elementos
// menu inativo:
// class="" em nav
// aria-expanded="false" em button
// aria-label="Abrir Menu" em button

// menu ativo:
// class="active" em nav
// aria-expanded="true" em button
// aria-label="Fechar Menu" em button


function toggleMenu(e: PointerEvent) {
	const nav = document.querySelector('#nav');
	const button = e.currentTarget;
	nav?.classList.toggle('active'); 
	if (button instanceof HTMLElement) {
		nav?.classList.contains('active') 
			? button.setAttribute('aria-label', 'Fechar Menu') 
			: button.setAttribute('aria-label', 'Abrir Menu')
		nav?.classList.contains('active') 
			? button.setAttribute('aria-expanded', 'true') 
			: button.setAttribute('aria-expanded', 'false')
	}
}

document.querySelector('#btn-mobile')?.addEventListener('pointerdown', toggleMenu as EventListener);
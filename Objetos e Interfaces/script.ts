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

/* Generics */
function retorno<variavel>(a: variavel): variavel{
	return a;
}

/* console.log(retorno<string>("A game"));
console.log(retorno<number>(200)); */

const numeros = [1, 2, 3, 4, 5, 6, 7, 8];
const frutas = ["Banana", "Pera", "Uva", "Morango", "Abacate", "Maçã"];

function firstFive<T>(lista: T[]) {
	return lista.slice(0, 5);
}

/* console.log(firstFive(frutas)); */

function notNull<T>(arg: T) {
	return arg !== null ? arg : null;
}

function tipoDado<T>(arg: T){
	const resultado = {
		dado: arg,
		tipo: typeof arg
	};
	return resultado;
}

function extractText<T extends HTMLElement>(el: T) {
	return {
		text: el.innerHTML,
		el
	}
}
/*  const link = document.querySelector('a');
if (link)
	console.log(extractText(link)); */

// Recriando seletor JQuery com TS

function $<T extends Element>(selector: string) : T | null {
	return document.querySelector(selector);
}

const link = $<HTMLAnchorElement>('a')?.href;

async function getData<T>(url: string) : Promise<T>{
	const response = await fetch(url);
	return await response.json();
}

interface Notebook {
	nome: string;
	preco: number;
}

async function handleData() {
	const notebook = await getData<Notebook>('https://api.origamid.dev/json/notebook.json');
	console.log(notebook);
}

/* Functions */

function abort(message: string): never {
	throw new Error(message);
}

/* abort("Ocorreu um erro");
console.log("Tente novamente");*/ // retorno never cancela o restante do programa, essa linha nunca será executada

// Function overload
// Ao compilar as functios que contêm apenas a notação são descartados, porém assim garante-se a segurança de tipo
function normalizar(valor: string): string;
function normalizar(valor: string[]): string[];
function normalizar(valor: string | string[]): string | string[] {
	if (typeof valor === 'string' )
		return valor.trim().toLocaleLowerCase();
	else 
 		return valor.map(item => item.trim().toLocaleLowerCase());
}

/* console.log(normalizar("BananAAAAA "));
console.log(normalizar(["BananAAAAA ", "  UVA"])); */

// Crie uma função que arredonda um valor passado para cima.
// A função pode receber string ou number.
// A função deve retornar o mesmo tipo que ela receber.

function arredondaParaCima(arg: string): string;
function arredondaParaCima(arg: number): number;
function arredondaParaCima(arg: string | number): string | number{
	return typeof arg === 'number' ? Math.ceil(arg) : Math.ceil(+arg).toString();
}
/* console.log(arredondaParaCima('11.21314')) */


// Exercício Type Guard
// 1 - Faça um fetch da API: https://api.origamid.dev/json/cursos.json
// 2 - Defina a interface da API
// 3 - Crie um Type Guard, que garanta que a API possui nome, horas e tags
// 4 - Use Type Guards para garantir a Type Safety do código
// 5 - Preencha os dados da API na tela.


interface Curso {
	nome: string;
	horas: number;
	aulas: number;
	gratuito: boolean;
	tags: string[];
	idAulas: number[];
	nivel: 'iniciante' | 'avançado';
  }

async function fetchCursos(){
	const response = await fetch('https://api.origamid.dev/json/cursos.json');
	const data = response.json();
	handleCursos(data);
}

fetchCursos();

function isCurso(curso: unknown): curso is Curso {
	if (
		curso &&
		typeof curso === 'object' &&
		'nome' in curso
	) {
		return true;
	} else {
		return false;
	}
}

function handleCursos(data: unknown) {
	if(Array.isArray(data))
		data.filter(item => isCurso(item)).forEach(item => document.body.innerHTML += `
			<h2>Nome: ${item.nome}</h2>
			<p>Horas: ${item.horas}</p>
			<span>Nível: ${item.nivel}</span>
			`)
}

// Type Assertion



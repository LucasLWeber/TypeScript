"use strict";
/* Instance of */
class Produto {
    nome;
    preco;
    constructor(nome, preco) {
        this.nome = nome;
        this.preco = preco;
    }
    precoReal() {
        return `R$ ${this.preco}`;
    }
}
class Livro extends Produto {
    autor;
    constructor(nome, preco, autor) {
        super(nome, preco);
        this.autor = autor;
    }
}
class Jogo {
    jogadores;
    constructor(jogadores) {
        this.jogadores = jogadores;
    }
}
function buscarProduto(busca) {
    if (busca === "O Hobbit")
        return new Livro("O hobbit", 49.99, "J. R. R. Tolkien");
    if (busca === "Dark Souls")
        return new Jogo(1);
    return null;
}
const livro = new Produto("A Guerra dos Tronos", 199.99);
// console.log(livro instanceof Produto);
const produto = buscarProduto("O Hobbit");
if (produto instanceof Livro)
    // console.log(produto.autor);
    /* Interface no DOM */
    ;
const honda = {
    nome: "Honda",
};
/* Exercicio */
const anchor = document.getElementById("origamid");
if (anchor instanceof HTMLAnchorElement && anchor !== null) {
    anchor.setAttribute("href", anchor.href.replace("http", "https"));
    console.log(anchor?.getAttribute("href"));
}
/* Exercicio */
const elementos = document.querySelectorAll('.link');
elementos.forEach(elemento => {
    if (elemento instanceof HTMLElement)
        alteraElemento(elemento);
});
function alteraElemento(elemento) {
    elemento.style.color = "red";
    elemento.style.border = "1px solid blue";
}
/* Eventos e CallBack */
const button = document.querySelector('button');
function handleClick(e) {
    console.log(e.currentTarget);
    e.pageX;
}
// button?.addEventListener('pointerdown', handleClick);
function toogleMenu(event) {
    if (event instanceof MouseEvent) {
        event.pageX;
    }
    else if (event instanceof TouchEvent) {
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
function toggleMenu(e) {
    const nav = document.querySelector('#nav');
    const button = e.currentTarget;
    nav?.classList.toggle('active');
    if (button instanceof HTMLElement) {
        nav?.classList.contains('active')
            ? button.setAttribute('aria-label', 'Fechar Menu')
            : button.setAttribute('aria-label', 'Abrir Menu');
        nav?.classList.contains('active')
            ? button.setAttribute('aria-expanded', 'true')
            : button.setAttribute('aria-expanded', 'false');
    }
}
document.querySelector('#btn-mobile')?.addEventListener('pointerdown', toggleMenu);
/* Generics */
function retorno(a) {
    return a;
}
/* console.log(retorno<string>("A game"));
console.log(retorno<number>(200)); */
const numeros = [1, 2, 3, 4, 5, 6, 7, 8];
const frutas = ["Banana", "Pera", "Uva", "Morango", "Abacate", "Maçã"];
function firstFive(lista) {
    return lista.slice(0, 5);
}
/* console.log(firstFive(frutas)); */
function notNull(arg) {
    return arg !== null ? arg : null;
}
function tipoDado(arg) {
    const resultado = {
        dado: arg,
        tipo: typeof arg
    };
    return resultado;
}
function extractText(el) {
    return {
        text: el.innerHTML,
        el
    };
}
/*  const link = document.querySelector('a');
if (link)
    console.log(extractText(link)); */
// Recriando seletor JQuery com TS
function $(selector) {
    return document.querySelector(selector);
}
const link = $('a')?.href;
async function getData(url) {
    const response = await fetch(url);
    return await response.json();
}
async function handleData() {
    const notebook = await getData('https://api.origamid.dev/json/notebook.json');
    console.log(notebook);
}
/* Functions */
function abort(message) {
    throw new Error(message);
}
function normalizar(valor) {
    if (typeof valor === 'string')
        return valor.trim().toLocaleLowerCase();
    else
        return valor.map(item => item.trim().toLocaleLowerCase());
}
function arredondaParaCima(arg) {
    return typeof arg === 'number' ? Math.ceil(arg) : Math.ceil(+arg).toString();
}
/* console.log(arredondaParaCima('11.21314')) */

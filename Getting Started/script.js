"use strict";
// AULA 1 -  ANOTATION E INFERENCE
// Como ocorre por de trás dos panos
let produto = "Livro";
let preco = 200;
// Boa prática, com uso de Type Inference
let product = "Livro";
let price = 200;
const carro = {
    marca: "Audi",
    portas: 5
};
// Exemplo de Inference, barato possui duas possibilidades de tipos
const barato = (price < 400) ? true : "Produto acima do orçamento";
function somar(a, b) {
    return a + b;
}
somar(1, 2);
const nintendo = {
    nome: "Nintendo",
    preco: "2000"
};
function transformarPreco(produto) {
    produto.preco = "R$ " + produto.preco;
    return produto;
}
const produtoNovo = transformarPreco(nintendo);
// Exercicios
// Exercicio 1 - Corrigir bugs
function normalizarTexto(texto) {
    return texto.trim().toLowerCase();
}
// Exercicio 2 - transformar para TS
const input = document.querySelector("input");
const total = localStorage.getItem("total");
if (input && total) {
    input.value = total;
    calcularGanho(Number(input.value));
}
function calcularGanho(value) {
    const p = document.querySelector("p");
    if (p)
        p.innerText = `ganho total: ${value + 100 - value * 0.2}`;
}
function totalMudou() {
    if (input) {
        localStorage.setItem("total", input.value);
        calcularGanho(Number(input.value));
        console.log("calc");
    }
}
if (input)
    input.addEventListener("keyup", totalMudou);
// AULA 2 - string, number e boolean
const frase = "Front end";
const valor = 500;
const condi = valor > 100;
console.log(typeof frase);
console.log(typeof valor);
console.log(typeof condi);
// Type Guard
if (typeof frase === "string") {
    console.log("frase é uma string");
}
else {
    console.log("frase não é uma string");
}
const frase1 = new String("Front end"); // Criando objeto do tipo String
const frase2 = String("Front end"); // "Parse" para string
const frase3 = "Front end"; // string pura
// frase2, frase3 herdam métodos que estão no protóripo do Objeto String
console.log(typeof frase1); // Object
console.log(typeof frase2); // string
console.log(typeof frase3); // string
console.log(typeof String); // function -> função construtora
// AULA 3 - Union Types
let value = 300;
value = "200";
function isNumber(value) {
    return typeof valor === "number";
}
const button = document.querySelector("button");
// Optional Chaining Sintax
button?.click();
// Exercicio 
// 1 - Crie uma função chamada toNumber
// 2 - A função pode receber number | string
// 3 - Se a função receber um número, retorne um número
// 4 - Se a função receber uma string, retorne um número
// 5 - Se ela receber algo diferente, retorne um erro. (throw "value deve ser um número ou uma string")
function toNumber(value) {
    if (typeof value === "number")
        return value;
    else if (typeof value === "string")
        return Number(value);
    else
        throw "value must be number | string";
}
let teste = 10;
teste = "teste";
function preencherDados(dados) {
    document.body.innerHTML += `
		<hr>
		<div>
			<h2>${dados.nome}</h2>
			<p>${dados.preco}</p>
			<p>Inclui teclado: ${dados.teclado ? 'sim' : 'não'}</p>
		</div>	
	`;
}
const computador = {
    nome: "Computador",
    preco: 2000,
    teclado: true
};
const notebook = {
    nome: "Notebook",
    preco: 2500,
    teclado: false
};
preencherDados(computador);
preencherDados(notebook);
async function fetchProduct() {
    const response = await fetch('https://api.origamid.dev/json/notebook.json');
    const data = await response.json();
    showProduct(data);
}
function showProduct(data) {
    document.body.innerHTML += `
		<hr>
		<div>
			<h2>${data.nome}</h2>
			<p>R$ ${data.preco}</p>
			<p>${data.descricao}</p>
			<div>
				<h4>Fabricante ${data.empresaFabricante.nome}</h4>
			</div>
			<div>
				<h4>Montadora ${data.empresaMontadora.nome}</h4>
			</div>
		</div>
	`;
}
fetchProduct();
// AULA 5 - Arrays
const numeros = [10, 20, 30, 40, 50];
const valores = [10, 'taxas', 30, 'produtos', 50];
function maiorQueDez(data) {
    return data.filter((n) => n > 10);
}
function filtrarValores(data) {
    return data.filter((item) => typeof item === 'number');
}
console.log(maiorQueDez(numeros));
console.log(filtrarValores(valores));
async function fetchCursos() {
    const response = await fetch('https://api.origamid.dev/json/cursos.json');
    const data = await response.json();
    mostrarCursos(data);
}
fetchCursos();
function mostrarCursos(cursos) {
    cursos.forEach(curso => {
        let cor;
        curso.nivel === 'iniciante' ? cor = 'blue' : cor = 'red';
        document.body.innerHTML +=
            `
		<hr>
		<div>
			<h2 style="color: ${cor};">${curso.nome}</h2>
			<p>Horas: ${curso.horas}</p>
			<p>Tipo: ${curso.gratuito ? 'Gratuito' : 'Pago'}</p>
			<p>Tags: ${curso.tags.join(', ')}</p>
			<p>Aulas: ${curso.idAulas.join(' | ')}</p>
		</div>
		`;
    });
}
// AULA 6 - Any
// Não usar -> usar any em TypeScript é a mesma coisa que codar js vanilla
function normalizar(text) {
    return text.trim().toLowerCase();
}
console.log(normalizar("   DesIng"));
console.log(normalizar(10)); // erro

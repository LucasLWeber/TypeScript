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
console.log(produtoNovo);
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

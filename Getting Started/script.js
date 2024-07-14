"use strict";
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

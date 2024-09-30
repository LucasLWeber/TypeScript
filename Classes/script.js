"use strict";
class Produto {
    tipo = 'produto';
    nome;
    constructor(nome) {
        this.nome = nome;
    }
}
const livro = new Produto();
const fetchVendas = async () => {
    const response = await fetch("https://api.origamid.dev/json/vendas.json");
    const data = await response.json();
    console.log(`R$ ${somarVendas(data).toFixed(2)}`);
};
fetchVendas();
const somarVendas = (data) => {
    return data.reduce((acc, item) => {
        const preco = item[1];
        return acc + preco;
    }, 0);
};

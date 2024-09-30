class Produto{
	private tipo = 'produto';
	nome?: string;
	constructor(nome?: string){
		this.nome = nome;
	}
}	

const livro = new Produto();

// Tuples
// 1 - Faça um fetch das vendas: https://api.origamid.dev/json/vendas.json
// 2 - Defina o tipo/interface de cada venda (tuple)
// 3 - Some o total das vendas e mostre na tela

type Venda = [string, number, string, Produto]

interface Produto {
	marca: string;
	cor: string;
}


const fetchVendas = async () => {
	const response = await fetch("https://api.origamid.dev/json/vendas.json");
	const data: Venda[] = await response.json();
	console.log(`R$ ${somarVendas(data).toFixed(2)}`);
}

fetchVendas();


const somarVendas = (data: Venda[]): number => {
	return data.reduce((acc, item) => {
		const preco = item[1];
		return acc + preco;
	}, 0)
}
export const API_URL = "https://api.origamid.dev/json/transacoes.json";

export type PaymentType =  "Cartão de Crédito" | "Boleto"
export type PaymentStatus = "Paga" | "Recusada pela operadora de cartão" | "Aguardando pagamento" | "Estornada"

export interface OriginalPayment {
	Status: PaymentStatus;
	ID: number;
	Data: string;
	Nome: string;
	["Forma de Pagamento"]: PaymentType;
	Email: string;
	["Valor (R$)"]: string;
	["Cliente Novo"]: 0 | 1;
}

export interface Payment {
	status: PaymentStatus;
	id: number;
	date: Date;
	name: string;
	email: string;
	coin: string;
	value: number | null;
	paymentType: PaymentType
	newClient: boolean;
}

export interface CountList {
	[key: string]: number
}

export function normalize(transaction: OriginalPayment): Payment{
	return{
		status: transaction.Status,
		id: transaction.ID,
		date: stringToDate(transaction.Data),
		name: transaction.Nome,
		email: transaction.Email,
		coin: transaction["Valor (R$)"],
		value: coinToNumber(transaction["Valor (R$)"]),
		paymentType: transaction["Forma de Pagamento"],
		newClient: Boolean(transaction["Cliente Novo"])
	}
}

export function coinToNumber(coin: string): number | null{
	const number = +coin.replaceAll(".", "").replace(",", ".");
	return isNaN(number) ? null : number;
}

export function stringToDate(text: string): Date{
	const [data, tempo] = text.split(" ");
	const [day, month, year] = data.split("/").map(Number);
	const [hour, minute] = tempo.split(":").map(Number);
	return new Date(year, month - 1, day, hour, minute);
}

export function countBy(arr: (string | number)[]){
	return arr.reduce((acc: CountList, cur) => {
		acc[cur] = acc[cur] ? acc[cur] + 1 : 1;
		return acc;
	}, {});
}

export function fillObjectList(list: CountList, containerId: string): void {
	const containerElement = document.querySelector<HTMLElement>(containerId);
	if(containerElement){
		Object.keys(list).forEach(key => {
			containerElement.innerHTML += `
				<p>${key}: <span class="fw-bold">${list[key]}</span></p>
			`;
		})
	}
}
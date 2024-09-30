import { countBy, Payment } from "./utils.js";

export class Statistic{
	private transactions;
	total;
	payment;
	status;
	highestSalesDay;

	constructor(transactions: Payment[]){
		this.transactions = transactions;
		this.total = this.setTotal();
		this.payment = countBy(this.transactions.map(({ paymentType }) => paymentType));
		this.status = countBy(this.transactions.map(({ status }) => status));
		this.highestSalesDay = Object.entries(this.setHighestSalesDay()).sort((a, b) => {return b[1] - a[1]})[0];
	}

	private setTotal(){
		return this.transactions
				.filter(t => t.value !== null)
				.reduce((acc, cur) => acc + (cur.value || 0), 0) 
	}

	private setHighestSalesDay(){
		const week = {
			["Domingo"]: 0,
			["Segunda-Feira"]: 0,
			["Terça-Feira"]: 0,
			["Quarta-Feira"]: 0,
			["Quinta-Feira"]: 0,
			["Sexta-Feira"]: 0,
			["Sábado"]: 0
		}

		this.transactions.forEach(t => {
			const day = t.date.getDay();
			switch(day){
				case 0:
					week["Domingo"] += 1;
					break;
				case 1:
					week["Segunda-Feira"] += 1;
					break;
				case 2:
					week["Terça-Feira"] += 1;
					break;
				case 3:
					week["Quarta-Feira"] += 1;
					break;
				case 4:
					week["Quinta-Feira"] += 1;
					break;
				case 5:
					week["Sexta-Feira"] += 1;
					break;
				case 6:
					week["Sábado"] += 1;
					break;
			}
	    })

		return week;
	}
}
import { fetchData } from "./fetchData.js";
import { Statistic } from "./Statistic.js";
import { API_URL, fillObjectList, normalize } from "./utils.js";
async function handleData() {
    const data = await fetchData(API_URL);
    if (!data)
        return;
    const transactions = data.map(normalize);
    fillData(transactions);
    fillStatistics(transactions);
}
function fillData(transactions) {
    const table = document.querySelector("#transactions tbody");
    if (!table)
        return;
    transactions.forEach(transaction => {
        table.innerHTML += `
			<tr>
				<td>${transaction.name}</td>
				<td>${transaction.email}</td>
				<td>R$ ${transaction.coin === "-" ? 0 : transaction.coin}</td>
				<td>${transaction.paymentType}</td>
				<td>${transaction.status}</td>
			</tr>
		`;
    });
}
function fillStatistics(transactions) {
    const data = new Statistic(transactions);
    const total = document.querySelector("#total span");
    const day = document.querySelector("#day span");
    if (total)
        total.innerText = data.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    if (day)
        day.innerText = data.highestSalesDay[0];
    fillObjectList(data.payment, "#payment");
    fillObjectList(data.status, "#status");
}
handleData();
//# sourceMappingURL=app.js.map
export const API_URL = "https://api.origamid.dev/json/transacoes.json";
export function normalize(transaction) {
    return {
        status: transaction.Status,
        id: transaction.ID,
        date: stringToDate(transaction.Data),
        name: transaction.Nome,
        email: transaction.Email,
        coin: transaction["Valor (R$)"],
        value: coinToNumber(transaction["Valor (R$)"]),
        paymentType: transaction["Forma de Pagamento"],
        newClient: Boolean(transaction["Cliente Novo"])
    };
}
export function coinToNumber(coin) {
    const number = +coin.replaceAll(".", "").replace(",", ".");
    return isNaN(number) ? null : number;
}
export function stringToDate(text) {
    const [data, tempo] = text.split(" ");
    const [day, month, year] = data.split("/").map(Number);
    const [hour, minute] = tempo.split(":").map(Number);
    return new Date(year, month - 1, day, hour, minute);
}
export function countBy(arr) {
    return arr.reduce((acc, cur) => {
        acc[cur] = acc[cur] ? acc[cur] + 1 : 1;
        return acc;
    }, {});
}
export function fillObjectList(list, containerId) {
    const containerElement = document.querySelector(containerId);
    if (containerElement) {
        Object.keys(list).forEach(key => {
            containerElement.innerHTML += `
				<p>${key}: <span class="fw-bold">${list[key]}</span></p>
			`;
        });
    }
}
//# sourceMappingURL=utils.js.map
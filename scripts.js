let arr =[];

let numeroCartas = prompt ("Com quantas cartas você quer jogar?\n\nSOMENTE NÚMEROS PARES!\n(min: 4 e max: 14)\n");
numeroCartas = Number(numeroCartas);

while (numeroCartas > 14 || numeroCartas < 4 || numeroCartas % 2 === 1 || isNaN(numeroCartas)) {
    numeroCartas = prompt ("Com quantas cartas você quer jogar?\n\nSOMENTE NÚMEROS PARES!\n(min: 2 e max: 14)\n");
    numeroCartas = Number(numeroCartas);
}

for (let i = 0; i < numeroCartas; i++) {
    let elemento = document.querySelector(".carta.escondido");
    elemento.classList.remove("escondido");
        arr.push(elemento);
}

arr.sort(comparador);
function comparador() { 
	return Math.random() - 0.5; 
}
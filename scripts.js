let arr =[];
let contador = 0;

// pede o número de cartas e continua até que o valor seja válido
let numeroCartas = prompt ("Com quantas cartas você quer jogar?\n\nSOMENTE NÚMEROS PARES!\n(min: 4 e max: 14)\n");
numeroCartas = Number(numeroCartas);

while (numeroCartas > 14 || numeroCartas < 4 || numeroCartas % 2 === 1 || isNaN(numeroCartas)) {
    numeroCartas = prompt ("Com quantas cartas você quer jogar?\n\nSOMENTE NÚMEROS PARES!\n(min: 2 e max: 14)\n");
    numeroCartas = Number(numeroCartas);
}

// insere as imagens das cartas em um array
for (let i = 0; i < numeroCartas; i++) {
    let elemento = document.querySelector(".baralho .frente.nao-inserido");
    elemento.classList.remove("nao-inserido");
    arr.push(elemento);
}

// embaralha o array
arr.sort(comparador);
function comparador() { 
	return Math.random() - 0.5; 
}

// aparecer a qtde escolhida de cartas + insere a imagem da carta que está no array dentro da div carta
for (let i = 0; i < numeroCartas; i++) {
    let elemento = document.querySelector(".carta.escondido");
    elemento.classList.remove("escondido");
    elemento.appendChild(arr[i]);
}

// desvira as cartas a cada duas cartas viradas (refazer depois da aula)
function revirarCarta(){
     while (contador !== 0) {
         let elemento = document.querySelector(".virado")
         elemento.querySelector(".verso").classList.remove("escondido");
         elemento.querySelector(".frente").classList.add("transparente");
         elemento.classList.remove("virado");
         contador = contador - 1;
     }
}

// vira uma carta + contador++ + chama a função acima se contador = 2
function virarCarta(elemento) {
    elemento.querySelector(".verso").classList.add("escondido");
    elemento.querySelector(".frente").classList.remove("transparente");
    elemento.classList.add("virado");
    contador++;

    if (contador === 2) {
         // esperar 1s
         revirarCarta();
         }
}



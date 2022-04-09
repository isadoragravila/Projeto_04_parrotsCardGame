let gifs =["images/tripletsparrot.gif", "images/unicornparrot.gif" , "images/fiestaparrot.gif", "images/metalparrot.gif", "images/revertitparrot.gif", "images/bobrossparrot.gif" , "images/explodyparrot.gif"];
let embaralhado = [];
let contador = 0;
let cartasClicadas = [];
let jogadas = 0;

// pede o número de cartas e continua até que o valor seja válido
let numeroCartas = prompt ("Com quantas cartas você quer jogar?\n\nSOMENTE NÚMEROS PARES!\n(min: 4 e max: 14)\n");
numeroCartas = Number(numeroCartas);

while (numeroCartas > 14 || numeroCartas < 4 || numeroCartas % 2 === 1 || isNaN(numeroCartas)) {
    numeroCartas = prompt ("Com quantas cartas você quer jogar?\n\nSOMENTE NÚMEROS PARES!\n(min: 2 e max: 14)\n");
    numeroCartas = Number(numeroCartas);
}

// insere os gifs das cartas em um array
for (let i = 0; i < numeroCartas/2; i++) {
    embaralhado.push(gifs[i]);
    embaralhado.push(gifs[i]);
}

// embaralha o array (ok)
embaralhado.sort(comparador);
    function comparador() {
        return Math.random() - 0.5; 
    }

// aparece a qtde escolhida de cartas + insere os gifs do array embaralhado nas cartas
for (let i = 0; i < numeroCartas; i++) {
    let conteudo = document.querySelector(".conteudo");
    conteudo.innerHTML += `
    <div class="carta" onclick="cliqueNaCarta(this)">
        <div class="front-face face"></div>
        <div class="back-face face"></div>
        <img class="frente" src="images/front.png" />
        <img class="verso transparente" src="${embaralhado[i]}" />
    </div>`;
}

//ao clicar o gif aparece, ao clicar em duas, espera 1segundo e chama a função virarCarta
function cliqueNaCarta (elemento) {
    if (elemento.classList.contains("clicado") === false) {
        jogadas++;
        elemento.classList.add("clicado");
        elemento.querySelector(".frente").classList.add("transparente");
        elemento.querySelector(".verso").classList.remove("transparente");
        cartasClicadas.push(elemento.innerHTML);
        contador++;
        if (contador === 2) {
            setTimeout(virarCarta, 1000);
        }
        let teste = document.querySelectorAll(".frente.transparente");
        if (teste.length === numeroCartas) {
            setTimeout(fimDeJogo, 500);
        }
    }
}

//se as cartas são iguais, elas permanecem viradas, se elas são diferentes elas desviram
function virarCarta () {
    if (cartasClicadas[0] !== cartasClicadas[1]) {
        while (contador !== 0) {
            document.querySelector(".clicado").querySelector(".frente").classList.remove("transparente");
            document.querySelector(".clicado").querySelector(".verso").classList.add("transparente");
            document.querySelector(".clicado").classList.remove("clicado");
            contador--;
        }
    }  else {
        document.querySelector(".clicado").classList.remove("clicado");
        document.querySelector(".clicado").classList.remove("clicado");
        contador = 0;
    }
    cartasClicadas = [];
}

//quando todos os pares são encontrados o jogo acaba
function fimDeJogo () {
    alert(`Você ganhou em ${jogadas} jogadas!`);
}

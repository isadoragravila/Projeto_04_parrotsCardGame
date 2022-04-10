let gifs =["images/tripletsparrot.gif", "images/unicornparrot.gif" , "images/fiestaparrot.gif", "images/metalparrot.gif", "images/revertitparrot.gif", "images/bobrossparrot.gif" , "images/explodyparrot.gif"];
let embaralhado = [];
let contador = 0;
let cartasClicadas = [];
let jogadas = 0;
let relogio;
let idInterval;

// pede o número de cartas
let numeroCartas = prompt ("Com quantas cartas você quer jogar?\n\nSOMENTE NÚMEROS PARES!\n(min: 4 e max: 14)\n");
numeroCartas = Number(numeroCartas);


function distribuirCartas () {
    // continua a pedir o número de cartas até que o valor seja válido
    while (numeroCartas > 14 || numeroCartas < 4 || numeroCartas % 2 === 1 || isNaN(numeroCartas)) {
        numeroCartas = prompt ("Com quantas cartas você quer jogar?\n\nSOMENTE NÚMEROS PARES!\n(min: 4 e max: 14)\n");
        numeroCartas = Number(numeroCartas);
    }
    
    embaralhado = [];
    contador = 0;
    cartasClicadas = [];
    jogadas = 0;
    document.querySelector(".conteudo").innerHTML = "";

    // insere os gifs das cartas em um array
    for (let i = 0; i < numeroCartas/2; i++) {
        embaralhado.push(gifs[i]);
        embaralhado.push(gifs[i]);
    }
    
    // embaralha o array
    embaralhado.sort(comparador);
        function comparador() {
            return Math.random() - 0.5; 
        }
    
    // aparece a qtde escolhida de cartas + insere os gifs do array embaralhado nas cartas
    for (let i = 0; i < numeroCartas; i++) {
        let conteudo = document.querySelector(".conteudo");
        conteudo.innerHTML += `
        <div class="carta" onclick="cliqueNaCarta(this)">
            <div class="front-face face"><img src="images/front.png" /></div>
            <div class="back-face face"><img src="${embaralhado[i]}" /></div>
        </div>`;
    }

    relogio = 0;
    document.querySelector(".relogio").innerHTML = `${relogio} s`;
    contarTempo ();
}

distribuirCartas ();

// ao clicar o gif aparece, ao clicar em duas, espera 1segundo e chama a função esconderCarta
function cliqueNaCarta (elemento) {
    if (elemento.classList.contains("clicado") === false) {
        jogadas++;
        elemento.classList.add("clicado");
        elemento.querySelector(".front-face").classList.add("virar");
        elemento.querySelector(".back-face").classList.add("virar");
        cartasClicadas.push(elemento.innerHTML);
        contador++;
        if (contador === 2) {
            setTimeout(esconderCarta, 1000);
        }
        let cartasAbertas = document.querySelectorAll(".front-face.virar");
        if (cartasAbertas.length === numeroCartas) {
            setTimeout(fimDeJogo, 500);
        }
    }
}

// se as cartas são iguais, elas permanecem viradas, se elas são diferentes elas desviram
function esconderCarta () {
    if (cartasClicadas[0] !== cartasClicadas[1]) {
        while (contador !== 0) {
            document.querySelector(".clicado").querySelector(".front-face").classList.remove("virar");
            document.querySelector(".clicado").querySelector(".back-face").classList.remove("virar");
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

// quando todos os pares são encontrados o jogo acaba e chama a função reiniciarPartida
function fimDeJogo () {
    clearInterval(idInterval);
    alert(`PARABÉNS!\n\nVocê ganhou em ${jogadas} jogadas, em um tempo de ${relogio} segundos!`);
    reiniciarPartida ();
}

// verifica se o usuário quer jogar de novo
function reiniciarPartida () {
    let verificador = prompt ("Você gostaria de reiniciar a partida?\n\nRespostas válidas: sim ou não\n");
    if (verificador === "sim") {
        numeroCartas = prompt ("Com quantas cartas você quer jogar?\n\nSOMENTE NÚMEROS PARES!\n(min: 4 e max: 14)\n");
        numeroCartas = Number(numeroCartas);
        distribuirCartas ();
    } else if (verificador === "não") {
        alert("Muito obrigado por jogar PARROTS CARD GAME!\n\nVolte sempre!");
    }
}

// relógio
function contarTempo() {
    idInterval = setInterval(incrementador, 1000);
}

function incrementador () {
    relogio++;
    document.querySelector(".relogio").innerHTML = `${relogio} s`;
}
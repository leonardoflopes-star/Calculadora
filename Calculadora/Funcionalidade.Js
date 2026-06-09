let contador = 0;         // Valor que aparece no visor (obrigatória do exercício)
let valorA = null;        // Primeiro número da operação
let operacao = null;      // Qual operação foi escolhida (+, -, *, /)
let iniciarNovoNumero = true; // Se o próximo clique substitui o visor ou junta números


const numeroH1 = document.getElementById("numero");

function atualizarTela() {
    numeroH1.textContent = contador;

    
    if (contador > 0) {
        numeroH1.className = "positivo";
    } else if (contador < 0) {
        numeroH1.className = "negativo";
    } else {
        numeroH1.className = "neutro";
    }
}




const botoesNumeros = document.querySelectorAll(".btn-num");

botoesNumeros.forEach(botao => {
    botao.addEventListener("click", function() {
        const numeroClicado = botao.textContent; 

        if (iniciarNovoNumero) {
            
            contador = Number(numeroClicado);
            iniciarNovoNumero = false;
        } else {
            
            contador = Number(numeroH1.textContent + numeroClicado);
        }
        
        atualizarTela();
    });
});


function prepararOperacao(op) {
    
    if (valorA !== null && !iniciarNovoNumero) {
        calcularResultado();
    }

    valorA = contador;   
    operacao = op;       
    iniciarNovoNumero = true; 
}

document.getElementById("btnAdicao").addEventListener("click", () => prepararOperacao("+"));
document.getElementById("btnSubtracao").addEventListener("click", () => prepararOperacao("-"));
document.getElementById("btnMultiplicacao").addEventListener("click", () => prepararOperacao("*"));
document.getElementById("btnDivisao").addEventListener("click", () => prepararOperacao("/"));


function calcularResultado() {
    
    if (valorA === null || operacao === null) return;

    let valorB = contador; // O número atual no visor vira o valor B

    if (operacao === "+") {
        contador = valorA + valorB;
    } else if (operacao === "-") {
        contador = valorA - valorB;
    } else if (operacao === "*") {
        contador = valorA * valorB;
    } else if (operacao === "/") {
        if (valorB !== 0) {
            contador = valorA / valorB;
        } else {
            alert("Erro: Não é possível dividir por zero!");
            // Reinicia a calculadora em caso de erro
            contador = 0;
            valorA = null;
            operacao = null;
            iniciarNovoNumero = true;
            atualizarTela();
            return;
        }
    }

    valorA = null;
    operacao = null;
    iniciarNovoNumero = true;

    atualizarTela();
}

document.getElementById("btnIgual").addEventListener("click", calcularResultado);


document.getElementById("btnIncremento").addEventListener("click", function() {
    contador++;
    atualizarTela();
});

document.getElementById("btnDecremento").addEventListener("click", function() {
    contador--;
    atualizarTela();
});

document.getElementById("btnZerar").addEventListener("click", function() {
    contador = 0;
    valorA = null;
    operacao = null;
    iniciarNovoNumero = true;
    atualizarTela();
});
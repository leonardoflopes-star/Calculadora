// --- VARIÁVEIS DE ESTADO (MEMÓRIA) ---
let contador = 0;         // Valor que aparece no visor (obrigatória do exercício)
let valorA = null;        // Primeiro número da operação
let operacao = null;      // Qual operação foi escolhida (+, -, *, /)
let iniciarNovoNumero = true; // Se o próximo clique substitui o visor ou junta números

// Seleciona o elemento obrigatório do visor
const numeroH1 = document.getElementById("numero");

// --- FUNÇÃO DE ATUALIZAÇÃO DA TELA ---
function atualizarTela() {
    numeroH1.textContent = contador;

    // Lógica do Bônus de cor
    if (contador > 0) {
        numeroH1.className = "positivo";
    } else if (contador < 0) {
        numeroH1.className = "negativo";
    } else {
        numeroH1.className = "neutro";
    }
}

// --- ADICIONANDO OS ADDEVENTLISTENER("CLICK") ---

// 1. Números Virtuais (0-9)
const botoesNumeros = document.querySelectorAll(".btn-num");

botoesNumeros.forEach(botao => {
    botao.addEventListener("click", function() {
        const numeroClicado = botao.textContent; // Pega o número do botão (ex: "7")

        if (iniciarNovoNumero) {
            // Se acabou de clicar em uma operação, substitui o valor do visor
            contador = Number(numeroClicado);
            iniciarNovoNumero = false;
        } else {
            // Se já estava digitando, junta os números como texto e depois converte
            contador = Number(numeroH1.textContent + numeroClicado);
        }
        
        atualizarTela();
    });
});

// 2. Operações Matemáticas
// CORREÇÃO AQUI: Mudado para 'op' (sem espaço)
function prepararOperacao(op) {
    // Se já existe uma operação pendente, calcula antes de receber o próximo operador
    if (valorA !== null && !iniciarNovoNumero) {
        calcularResultado();
    }

    valorA = contador;   // Salva o número atual como o valor A
    operacao = op;       // Salva qual operação vai ser feita
    iniciarNovoNumero = true; // Avisa que o próximo número digitado será o valor B
}

document.getElementById("btnAdicao").addEventListener("click", () => prepararOperacao("+"));
document.getElementById("btnSubtracao").addEventListener("click", () => prepararOperacao("-"));
document.getElementById("btnMultiplicacao").addEventListener("click", () => prepararOperacao("*"));
document.getElementById("btnDivisao").addEventListener("click", () => prepararOperacao("/"));

// 3. Botão Igual (=)
function calcularResultado() {
    // Se não há operação definida ou valor A na memória, não faz nada
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

    // Limpa a memória para a próxima conta
    valorA = null;
    operacao = null;
    iniciarNovoNumero = true;

    atualizarTela();
}

document.getElementById("btnIgual").addEventListener("click", calcularResultado);

// 4. Controles Obrigatórios do Contador (Incremento/Decremento)
document.getElementById("btnIncremento").addEventListener("click", function() {
    contador++;
    atualizarTela();
});

document.getElementById("btnDecremento").addEventListener("click", function() {
    contador--;
    atualizarTela();
});

// 5. Botão Zerar
document.getElementById("btnZerar").addEventListener("click", function() {
    contador = 0;
    valorA = null;
    operacao = null;
    iniciarNovoNumero = true;
    atualizarTela();
});
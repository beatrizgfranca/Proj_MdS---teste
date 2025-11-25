// --- Seletores principais ---
const selectAcao = document.getElementById("selectAcao");
const btnConfirmar = document.getElementById("btnConfirmarAcao");
const feedback = document.getElementById("feedback");
const selectPredio = document.getElementById("selectPredio");
const selectAndar = document.getElementById("selectAndar");
const inputNovoPredio = document.getElementById("inputNovoPredio");
const inputNovaSala = document.getElementById("inputNovaSala");

// --- Função para esconder tudo antes de mostrar ---
function esconderTudo() {
    document.getElementById("divInputNovoPredio").style.display = "none";
    document.getElementById("divSelectPredio").style.display = "none";
    document.getElementById("divSelectAndar").style.display = "none";
    document.getElementById("divInputNovaSala").style.display = "none";
    btnConfirmar.style.display = "none";
    feedback.innerHTML = "";
}

// --- Quando escolher o que deseja cadastrar ---
function exibirSeletores() {
    esconderTudo();

    const acao = selectAcao.value;

    if (acao === "Predio") {
        document.getElementById("divInputNovoPredio").style.display = "block";
        btnConfirmar.style.display = "block";
    }

    if (acao === "Andar" || acao === "Sala") {
        carregarPredios();
        document.getElementById("divSelectPredio").style.display = "block";
    }
}

// --- Função para pegar a lista de Prédios ---
async function carregarPredios() {
    try {
        const response = await fetch('/api/localizacao/predios', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include' // Envia o token JWT automaticamente através dos cookies HttpOnly
        });
        const data = await response.json();
        preencherListaPredios(data.predios);
    } catch (error) {
        console.error("Erro ao carregar prédios", error);
        feedback.innerHTML = "Erro ao carregar prédios!";
        feedback.style.color = "red";
    }
}

// --- Função para preencher o select de prédios ---
function preencherListaPredios(predios) {
    selectPredio.innerHTML = '<option value="">-- Escolha um Prédio --</option>';
    predios.forEach(predio => {
        selectPredio.innerHTML += `<option value="${predio.id}">${predio.nome}</option>`;
    });
}

// --- Função para carregar andares com base no prédio selecionado ---
async function carregarAndares(predioId) {
    try {
        const response = await fetch(`/api/localizacao/predio/${predioId}/andares`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include' // Envia o token JWT automaticamente através dos cookies HttpOnly
        });
        const data = await response.json();
        preencherListaAndares(data.andares);
    } catch (error) {
        console.error("Erro ao carregar andares", error);
        feedback.innerHTML = "Erro ao carregar andares!";
        feedback.style.color = "red";
    }
}

// --- Função para preencher o select de andares ---
function preencherListaAndares(andares) {
    selectAndar.innerHTML = '<option value="">-- Escolha um Andar --</option>';
    andares.forEach(andar => {
        selectAndar.innerHTML += `<option value="${andar.numero}">${andar.numero}º Andar</option>`;
    });
}

// --- Função para carregar salas com base no prédio e andar selecionados ---
async function carregarSalas(predioId, andarNumero) {
    try {
        const response = await fetch(`/api/localizacao/predio/${predioId}/andar/${andarNumero}/salas`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include' // Envia o token JWT automaticamente através dos cookies HttpOnly
        });
        const data = await response.json();
        preencherListaSalas(data.salas);
    } catch (error) {
        console.error("Erro ao carregar salas", error);
        feedback.innerHTML = "Erro ao carregar salas!";
        feedback.style.color = "red";
    }
}

// --- Função para preencher o select de salas ---
function preencherListaSalas(salas) {
    // Se não houver salas, desabilita o campo de salas
    if (salas.length === 0) {
        feedback.innerHTML = "Nenhuma sala encontrada.";
        feedback.style.color = "red";
    } else {
        feedback.innerHTML = "";
    }
}

// --- Função para cadastrar um novo prédio ---
async function cadastrarPredio() {
    const nomePredio = inputNovoPredio.value;
    const userId = "user_id_aqui"; // Substitua pelo ID do usuário

    try {
        const response = await fetch('/api/localizacao/predio', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome: nomePredio, userId }), // Envia as informações no body
            credentials: 'include' // Envia o token JWT automaticamente através dos cookies HttpOnly
        });
        const result = await response.json();
        if (result.success) {
            feedback.innerHTML = "Prédio cadastrado com sucesso!";
            feedback.style.color = "green";
            carregarPredios(); // Atualiza a lista de prédios
        } else {
            feedback.innerHTML = "Erro: " + result.message;
            feedback.style.color = "red";
        }
    } catch (error) {
        console.error("Erro ao cadastrar prédio", error);
        feedback.innerHTML = "Erro ao cadastrar prédio!";
        feedback.style.color = "red";
    }
}

// --- Função para cadastrar um novo andar ---
async function cadastrarAndar() {
    const predioId = selectPredio.value;
    const andarNumero = selectAndar.value;
    const userId = "user_id_aqui"; // Substitua pelo ID do usuário

    try {
        const response = await fetch(`/api/localizacao/andar`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                predioId: predioId,
                numero: andarNumero,
                userId: userId
            }),
            credentials: 'include' // Envia o token JWT automaticamente através dos cookies HttpOnly
        });
        const result = await response.json();
        if (result.success) {
            feedback.innerHTML = "Andar cadastrado com sucesso!";
            feedback.style.color = "green";
            carregarAndares(predioId); // Atualiza a lista de andares
        } else {
            feedback.innerHTML = "Erro: " + result.message;
            feedback.style.color = "red";
        }
    } catch (error) {
        console.error("Erro ao cadastrar andar", error);
        feedback.innerHTML = "Erro ao cadastrar andar!";
        feedback.style.color = "red";
    }
}

// --- Função para cadastrar uma nova sala ---
async function cadastrarSala() {
    const predioId = selectPredio.value;
    const andarNumero = selectAndar.value;
    const userId = "user_id_aqui"; // Substitua pelo ID do usuário
    const salaNome = inputNovaSala.value;

    try {
        const response = await fetch(`/api/localizacao/sala`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                predioId: predioId,
                andarNumero: andarNumero,
                nomeSala: salaNome,
                userId: userId
            }),
            credentials: 'include' // Envia o token JWT automaticamente através dos cookies HttpOnly
        });
        const result = await response.json();
        if (result.success) {
            feedback.innerHTML = "Sala cadastrada com sucesso!";
            feedback.style.color = "green";
            carregarSalas(predioId, andarNumero); // Atualiza a lista de salas
        } else {
            feedback.innerHTML = "Erro: " + result.message;
            feedback.style.color = "red";
        }
    } catch (error) {
        console.error("Erro ao cadastrar sala", error);
        feedback.innerHTML = "Erro ao cadastrar sala!";
        feedback.style.color = "red";
    }
}

// --- Evento de envio do formulário ---
document.querySelector(".form-agendamento").addEventListener("submit", async (e) => {
    e.preventDefault();
    // Pode chamar as funções de cadastro aqui com as validações necessárias.
});

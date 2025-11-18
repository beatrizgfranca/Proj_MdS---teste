// ===== SELETORES PRINCIPAIS =====
const blocoSelect = document.getElementById("select-block");
const andarSelect = document.getElementById("select-floor");
const salaSelect = document.getElementById("select-room");
const placeholder = document.getElementById("placeholder");

const plantGround = document.getElementById("plant-ground");
const plantFirst = document.getElementById("plant-first");

// ===== POP-UP DO CALENDÁRIO =====
const modal = document.getElementById("modal-calendar");
const calendarInput = document.getElementById("calendar-input");
const dateDisplay = document.getElementById("date-display");
const okBtn = document.getElementById("modal-ok");
const cancelBtn = document.getElementById("modal-cancel");

// ===== RODAPÉ =====
const yearSpan = document.getElementById("year");
const footerText = document.getElementById("footer-text");
const footerInput = document.getElementById("footer-input");
const footerApply = document.getElementById("footer-apply");

// ===== SALAS DISPONÍVEIS =====
const salas = {
  A: {
    ground: [
      "Lab. Avaliação Q. Alimentos",
      "Sala de Aula 1",
      "Lab. Microbiologia e Controle Qualidade",
      "Lab. Bromatologia",
      "Cozinha Experimental",
      "Lab. Informática",
      "Sala de Aula 2",
      "Sala de Aula 3",
      "Sala de Aula 4",
      "Auditório"
    ],
    first: [
      "Lab. Instrumentação II",
      "Sanit. Fem.",
      "Sanit. Masc.",
      "Lab. Controle de Processos",
      "Compressor",
      "Manutenção",
      "CCM",
      "Lab. UPLAB",
      "Planta de Leite e Derivados",
      "Lab. IOT",
      "Sala de Apoio",
      "Sala NR1"
    ]
  },
  C: {
    first: [
      "Lab. Redes",
      "Lab. Sist. Eletrônicos",
      "Sala Especialistas",
      "Sanit. Masc.",
      "Sanit. Fem.",
      "Sala de Apoio",
      "Laboratório de Informática 1",
      "Laboratório de Informática 2",
      "Laboratório de Informática 3",
      "Laboratório de Informática 4",
      "Laboratório de Instrumentação I",
      "MDI"
    ],
    ground: [
      "Lab. Instrumentação II",
      "Sanit. Fem.",
      "Sanit. Masc.",
      "Lab. Controle de Processos",
      "Compressor",
      "Manutenção",
      "CCM",
      "Lab. UPLAB",
      "Planta de Leite e Derivados",
      "Lab. IOT",
      "Sala de Apoio",
      "Sala NR1"
    ]
  }
};

// ===== FUNÇÃO: ATUALIZAR ANDARES =====
blocoSelect.addEventListener("change", () => {
  const bloco = blocoSelect.value;

  if (bloco) {
    andarSelect.disabled = false;
    andarSelect.value = "";
    salaSelect.innerHTML = '<option value="">Selecione a sala</option>';
    salaSelect.disabled = true;

    placeholder.hidden = false;
    plantGround.hidden = true;
    plantFirst.hidden = true;
  } else {
    andarSelect.disabled = true;
    salaSelect.disabled = true;
    placeholder.textContent = "Selecione um bloco e um andar para visualizar o mapa.";
  }
});

// ===== FUNÇÃO: ATUALIZAR SALAS =====
andarSelect.addEventListener("change", () => {
  const bloco = blocoSelect.value;
  const andar = andarSelect.value;

  salaSelect.innerHTML = '<option value="">Selecione a sala</option>';

  if (bloco && andar && salas[bloco]?.[andar]) {
    salas[bloco][andar].forEach((sala) => {
      const option = document.createElement("option");
      option.value = sala;
      option.textContent = sala;
      salaSelect.appendChild(option);
    });
    salaSelect.disabled = false;

    
  } 
});

// ===== FUNÇÃO: ATUALIZAR MAPA =====
function atualizarMapa(bloco, andar) {
  placeholder.hidden = true;
  plantGround.hidden = true;
  plantFirst.hidden = true;

  if (bloco === "A" && andar === "ground") {
    plantGround.src = "planta-blocoA-terreo.png";
    plantGround.hidden = false;
  } else if (bloco === "A" && andar === "first") {
    plantFirst.src = "planta-blocoA-1andar.png";
    plantFirst.hidden = false;
  } else if (bloco === "C" && andar === "ground") {
    plantGround.src = "planta-blocoC-terreo.png";
    plantGround.hidden = false;
  } else if (bloco === "C" && andar === "first") {
    plantFirst.src = "planta-blocoC-1andar.png";
    plantFirst.hidden = false;
  } else {
    placeholder.hidden = false;
  }
}

// ===== POP-UP DO CALENDÁRIO ==


// Botão OK — insere a data e fecha
okBtn.addEventListener("click", () => {
  const selectedDate = calendarInput.value;
  if (selectedDate) {
    const dataFormatada = new Date(selectedDate).toLocaleDateString("pt-BR");
    dateDisplay.value = dataFormatada;
  }
  modal.setAttribute("aria-hidden", "true");
});

// Botão Cancelar — fecha sem alterar
cancelBtn.addEventListener("click", () => {
  modal.setAttribute("aria-hidden", "true");
});

// Fecha o modal clicando fora
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.setAttribute("aria-hidden", "true");
  }
});

// ===== RODAPÉ DINÂMICO =====
yearSpan.textContent = new Date().getFullYear();

footerApply.addEventListener("click", () => {
  const novoTexto = footerInput.value.trim();
  if (novoTexto) {
    footerText.textContent = novoTexto;
  }
});

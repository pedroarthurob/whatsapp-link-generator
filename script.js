document.addEventListener("DOMContentLoaded", () => {
  const numeroInput = document.getElementById("whatsapp-number");
  const mensagemInput = document.getElementById("custom-message");
  const postInput = document.getElementById("instagram-post-link");
  const form = document.getElementById("link-form");
  const generatedInput = document.getElementById("generated-link");
  const copyButton = document.getElementById("copy-button");
  const push = document.getElementById("push-message");
  const generateButton = document.getElementById("generate-link");

  const numeroSalvo = localStorage.getItem("whatsappNumber");
  const mensagemSalva = localStorage.getItem("customMessage");
  const postSalvo = localStorage.getItem("instagramPostLink");

  if (numeroSalvo) numeroInput.value = numeroSalvo;
  if (mensagemSalva) mensagemInput.value = mensagemSalva;
  if (postSalvo) postInput.value = postSalvo;

  copyButton.disabled = true;

  function showPushMessage(text) {
    push.textContent = text;
    push.classList.add("show");
    setTimeout(() => push.classList.remove("show"), 2500);
  }

  function atualizarLink() {
    const numero = numeroInput.value.trim();
    const postLink = postInput.value.trim();
    const mensagem = mensagemInput.value.trim();

    if (!numero) {
      generatedInput.value = "";
      copyButton.disabled = true;
      return;
    }

    let textoFinal = mensagem;
    if (postLink) {
      textoFinal += ` (Post: ${postLink})`;
    }

    const linkFinal = `https://wa.me/55${numero}?text=${encodeURIComponent(textoFinal)}`;

    generatedInput.value = linkFinal;
    copyButton.disabled = false;

    localStorage.setItem("whatsappNumber", numero);
    localStorage.setItem("customMessage", mensagem);
    localStorage.setItem("instagramPostLink", postLink);
  }

  function isValidWhatsappNumber(num) {
    return /^\d{10}$|^\d{11}$/.test(num);
  }

  numeroInput.addEventListener("input", () => {
    const valido = isValidWhatsappNumber(numeroInput.value.trim());
    if (valido) {
      generateButton.classList.remove("disabled");
    } else {
      generateButton.classList.add("disabled");
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const numero = numeroInput.value.trim();
    if (!isValidWhatsappNumber(numero)) {
      showPushMessage("Número inválido! Informe 10 ou 11 dígitos numéricos.");
      return;
    }
    atualizarLink();
    showPushMessage("Link gerado com sucesso!");
  });

  copyButton.addEventListener("click", () => {
    if (copyButton.disabled) return;
    const text = generatedInput.value;
    navigator.clipboard.writeText(text)
      .then(() => showPushMessage("Link copiado!"))
      .catch(() => showPushMessage("Não foi possível copiar"));
  });

  generatedInput.addEventListener("click", () => {
    generatedInput.select();
  });
});

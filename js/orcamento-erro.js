/* Página de erro do pedido sem JavaScript no envio: explica o motivo que a função mandou (fase 195b). */
(function () {
  "use strict";
  var MOTIVOS = {
    grande: "Os anexos passaram de 20 MB no total. Tente de novo com menos arquivos, ou mande os maiores pelo e-mail.",
    limite: "Recebemos muitos pedidos deste endereço agora. Tente mais tarde ou fale pelo WhatsApp.",
    dados: "Algum campo ou arquivo não foi aceito (e-mail, telefone com DDD ou tipo de arquivo). Confira e tente de novo.",
    formulario: "O formulário chegou incompleto. Tente de novo.",
    falha: "O sistema não respondeu. Tente de novo em alguns minutos.",
  };
  var m = new URLSearchParams(window.location.search).get("m");
  if (m && MOTIVOS[m]) document.getElementById("erro-motivo").textContent = MOTIVOS[m];
})();

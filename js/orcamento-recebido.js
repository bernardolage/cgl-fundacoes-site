/* Página "Pedido recebido": mostra o protocolo e o prazo que vieram do sistema (fase 195b).
   Sem JavaScript, a página mostra o texto geral. Tudo entra como texto (textContent), nunca como HTML. */
(function () {
  "use strict";
  var q = new URLSearchParams(window.location.search);
  var prot = q.get("p");
  if (!prot || !/^S-\d{4}-\d{3,6}$/.test(prot)) return;
  var elP = document.getElementById("rec-protocolo");
  elP.textContent = "Protocolo do seu pedido: ";
  var cod = document.createElement("span");
  cod.className = "protocolo";
  cod.textContent = prot;
  elP.appendChild(cod);

  var canal = { whatsapp: "pelo WhatsApp", ambos: "pelo WhatsApp e por e-mail", email: "por e-mail" }[q.get("c") || ""] || "";
  var prazo = q.get("prazo");
  var elPrazo = document.getElementById("rec-prazo");
  if (q.get("s") === "1" && prazo && !isNaN(Date.parse(prazo))) {
    var d = new Date(prazo);
    var f = new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo", weekday: "long", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
    var hoje = new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo", day: "2-digit", month: "2-digit" });
    var quando = hoje.format(d) === hoje.format(new Date()) ? "hoje até as " + d.toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit" }) : f.format(d);
    elPrazo.textContent = "Seu orçamento será formalizado " + quando + (canal ? ", " + canal : "") + ".";
  } else {
    elPrazo.textContent = "Retorno em até 2 dias úteis" + (canal ? ", " + canal : "") + ".";
  }

  var ROTULO = { servico: "o serviço", ficha_cadastral: "a ficha cadastral", projeto: "o projeto (ou quantidade, diâmetro e profundidade)",
    tipo_obra: "o tipo de obra", equipamento: "o equipamento", periodo: "o período", operador: "se é com operador",
    volume: "o volume de concreto", tipo_pedido: "o tipo do pedido", cidade: "a cidade", inicio: "o início da obra", contato: "o contato" };
  var falta = (q.get("f") || "").split(",").filter(function (x) { return ROTULO[x]; });
  if (q.get("s") !== "1" && falta.length) {
    var box = document.getElementById("rec-falta");
    var p = document.createElement("p");
    p.textContent = "Para receber o orçamento no mesmo dia, da próxima vez mande também: " + falta.map(function (x) { return ROTULO[x]; }).join(", ") + ".";
    box.appendChild(p);
    box.hidden = false;
  }
})();

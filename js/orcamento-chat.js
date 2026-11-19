/* ============================================================
   CGL FUNDAÇÕES — orcamento-chat.js
   Conversa guiada do pedido de orçamento, por cima do formulário do index.html.
   Perguntas, textos e regras ficam no conteudo.js (orcamento.perguntas, orcamento.selo).
   Sem JavaScript (ou se este arquivo falhar), o formulário completo continua lá e envia sozinho.
   O pedido vai para a função site-orcamento: iniciar -> anexo (URL de envio assinada) -> enviar.
   O selo mostrado aqui é só uma estimativa; quem decide é o sistema, no envio.
   ============================================================ */
(function () {
  "use strict";
  var C = window.CONTEUDO;
  var O = C && C.orcamento;
  var chat = document.getElementById("orc-chat");
  var form = document.getElementById("orcamento-form");
  var seloEl = document.getElementById("orc-selo");
  if (!O || !O.perguntas || !chat || !form || !window.fetch || !window.FormData) return;

  var MAX_BYTES = 25 * 1024 * 1024, MAX_POR_TIPO = 5;
  var FUNDACAO = { helice: 1, raiz: 1, secante: 1, trado: 1, pre_moldada: 1 };
  var EXT_OK = { pdf: 1, jpg: 1, jpeg: 1, png: 1 };
  var EXT_PROJETO = { pdf: 1, jpg: 1, jpeg: 1, png: 1, dwg: 1, dxf: 1 };
  var PULOU = "__pulou";
  var PQ = {};
  O.perguntas.forEach(function (q) { PQ[q.id] = q; });
  var TIPOS = {};
  O.anexos.forEach(function (a) { TIPOS[a.tipo] = a; });

  var est = {
    resp: {},          // id da pergunta -> valor (texto, número, lista) ou PULOU
    extra: {},         // name do campo extra -> valor
    anexos: { ficha_cadastral: [], sondagem: [], projeto: [] },
    anexosFeito: false,
    pedido: null,      // { id, token }
    iniciando: null,
    interagiu: false,
    log: [],           // ids já desenhados no histórico
    enviando: false,
  };

  // ---------------------------------------------------------------- utilitários
  function el(tag, cls, texto) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (texto != null) e.textContent = texto;
    return e;
  }
  function botao(texto, cls, aoClicar) {
    var b = el("button", cls || "orc-btn", texto);
    b.type = "button";
    if (aoClicar) b.addEventListener("click", aoClicar);
    return b;
  }
  function digitos(s) { return String(s || "").replace(/\D/g, ""); }
  function extensao(nome) { var m = /\.([a-z0-9]{2,5})$/i.exec(nome || ""); return m ? m[1].toLowerCase() : ""; }
  function mimePorExt(ext) {
    return { pdf: "application/pdf", jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png",
      dwg: "image/vnd.dwg", dxf: "image/vnd.dxf" }[ext] || "application/octet-stream";
  }
  function hojeISO() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function respondida(id) { return Object.prototype.hasOwnProperty.call(est.resp, id); }
  function valor(id) { var v = est.resp[id]; return v === PULOU ? undefined : v; }
  function enviados(tipo) { return est.anexos[tipo].filter(function (a) { return a.estado === "enviada"; }); }
  function validos(tipo) { return est.anexos[tipo].filter(function (a) { return a.estado !== "erro"; }); }
  function emAndamento() {
    return Object.keys(est.anexos).some(function (t) {
      return est.anexos[t].some(function (a) { return a.estado === "enviando"; });
    });
  }

  // ---------------------------------------------------------------- ramos e ordem
  function ramo() {
    var s = valor("P1");
    if (s === "bomba" || s === "compressor_gerador") return "locacao";
    if (s === "nao_sei") return "nao_sei";
    return "fundacao";
  }
  function aplica(id) {
    if (id === "ANEXOS" || id === "ANEXO_FICHA") return true;
    var q = PQ[id];
    if (!q) return false;
    if (!q.se) return true;
    return Object.keys(q.se).every(function (k) {
      var cond = q.se[k];
      if (k === "semAnexo") return validos(cond).length === 0; // arquivo ainda subindo já dispensa a pergunta
      var lista = Array.isArray(cond) ? cond : [cond];
      return lista.indexOf(valor(k)) >= 0;
    });
  }
  function passos() {
    var r = ramo(), lista = [];
    O.ordem[r].forEach(function (id) {
      if (id === "CONTATO") {
        if (r === "locacao") lista.push("ANEXO_FICHA");
        O.ordem.contato.forEach(function (c) { lista.push(c); });
      } else lista.push(id);
    });
    return lista.filter(aplica);
  }
  function feito(id) { return (id === "ANEXOS" || id === "ANEXO_FICHA") ? est.anexosFeito : respondida(id); }
  function atual() {
    var p = passos();
    for (var i = 0; i < p.length; i++) if (!feito(p[i])) return { id: p[i], n: i + 1, total: p.length };
    return null;
  }

  // ---------------------------------------------------------------- textos das respostas
  function textoOpcao(q, v) {
    var o = (q.opcoes || []).filter(function (x) { return x.v === v; })[0];
    return o ? o.texto : (v === "nao_sei" ? "Não sei" : String(v));
  }
  function textoResposta(id) {
    if (id === "ANEXOS" || id === "ANEXO_FICHA") {
      var tipos = id === "ANEXO_FICHA" ? ["ficha_cadastral"] : Object.keys(est.anexos);
      return tipos.map(function (t) {
        var n = est.anexos[t].filter(function (a) { return a.estado !== "erro"; }).length;
        return TIPOS[t].texto + ": " + (n ? n + (n > 1 ? " arquivos" : " arquivo") : "não tenho agora");
      }).join(" · ");
    }
    var q = PQ[id], v = est.resp[id];
    if (v === PULOU) return "Pulei";
    var t;
    if (q.tipo === "cidade") t = [v, est.extra[q.nameUf]].filter(Boolean).join("/");
    else if (q.tipo === "data") t = String(v).split("-").reverse().join("/");
    else if (q.tipo === "diametros") t = v === "nao_sei" ? "Não sei" : v.map(function (d) { return d + " mm"; }).join(", ");
    else if (q.tipo === "multipla") t = v.map(function (x) { return textoOpcao(q, x); }).join(", ");
    else if (q.tipo === "opcoes") t = typeof v === "number" ? String(v) + (q.id === "F4" ? " m" : q.id === "L4" ? " m³" : "") : textoOpcao(q, v);
    else t = String(v);
    if (q.extra && est.extra[q.extra.name]) {
      var ex = est.extra[q.extra.name];
      t += " (" + (q.extra.tipo === "mes" ? String(ex).split("-").reverse().join("/") : ex) + ")";
    }
    return t;
  }

  // ---------------------------------------------------------------- comunicação com o sistema
  function chamar(corpo) {
    return fetch(O.funcao, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(corpo) })
      .then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (j) {
          if (!r.ok || j.error) { var e = new Error(j.error || "Falha ao falar com o sistema."); e.status = r.status; throw e; }
          return j;
        });
      });
  }
  function garantirPedido() {
    if (est.pedido) return Promise.resolve(est.pedido);
    if (est.iniciando) return est.iniciando;
    est.iniciando = chamar({ acao: "iniciar" }).then(function (j) {
      est.pedido = { id: j.id, token: j.token };
      // Sem tempo limite para responder: o rascunho é renovado enquanto a página está aberta.
      setInterval(function () {
        if (est.pedido) chamar({ acao: "renovar", id: est.pedido.id, token: est.pedido.token }).catch(function () {});
      }, 45 * 60 * 1000);
      return est.pedido;
    }, function (e) { est.iniciando = null; throw e; });
    return est.iniciando;
  }

  // Arquivo terminou (ou falhou): atualiza a lista, o selo e o histórico, sem mexer na pergunta que o cliente responde.
  var anexosUI = null; // { contas: { tipo: elemento }, botao } do passo de anexos na tela
  function contaTexto(n) { return n ? n + (n > 1 ? " arquivos escolhidos" : " arquivo escolhido") : "Nenhum arquivo ainda"; }
  function atualizarAnexosUI() {
    if (!anexosUI || !document.body.contains(anexosUI.botao)) return;
    var algum = false;
    Object.keys(anexosUI.contas).forEach(function (t) {
      var n = validos(t).length; if (n) algum = true;
      anexosUI.contas[t].textContent = contaTexto(n);
    });
    if (!algum) algum = Object.keys(est.anexos).some(function (t) { return validos(t).length > 0; });
    anexosUI.botao.textContent = algum ? "Continuar" : "Não tenho agora, continuar";
  }
  function depoisDoArquivo() {
    desenharArquivos(); desenharSelo(); desenharLog(); atualizarAnexosUI();
    if (!atual()) desenhar(true); // na revisão, libera o botão de enviar
  }

  function enviarArquivo(tipo, arquivo) {
    var ext = extensao(arquivo.name);
    var item = { nome: arquivo.name, tipo: tipo, ext: ext, estado: "enviando", pct: 0, msg: "" };
    var okExt = tipo === "projeto" ? EXT_PROJETO : EXT_OK;
    est.anexos[tipo].push(item);
    function falhou(msg) { item.estado = "erro"; item.msg = msg; depoisDoArquivo(); }
    if (!okExt[ext]) return falhou(tipo === "projeto" ? "envie PDF, JPG, PNG, DWG ou DXF" : "envie PDF, JPG ou PNG");
    if (!arquivo.size || arquivo.size > MAX_BYTES) return falhou("arquivo vazio ou maior que 25 MB");
    if (est.anexos[tipo].filter(function (a) { return a.estado !== "erro"; }).length > MAX_POR_TIPO) {
      return falhou("no máximo " + MAX_POR_TIPO + " arquivos de " + TIPOS[tipo].texto.toLowerCase());
    }
    desenharArquivos(); atualizarAnexosUI();
    garantirPedido().then(function (p) {
      return chamar({ acao: "anexo", id: p.id, token: p.token, tipo: tipo, nome: arquivo.name, tamanho: arquivo.size });
    }).then(function (j) {
      // O navegador envia direto ao Storage pela URL assinada; o tipo vem da extensão, com o arquivo reembalado em Blob.
      var corpo = new FormData();
      corpo.append("cacheControl", "3600");
      corpo.append("", new Blob([arquivo], { type: j.mime || mimePorExt(ext) }), arquivo.name);
      return new Promise(function (ok, erro) {
        var x = new XMLHttpRequest();
        x.open(j.metodo || "PUT", j.url);
        x.setRequestHeader("x-upsert", "false");
        x.upload.addEventListener("progress", function (e) {
          if (e.lengthComputable) {
            var pct = Math.round(e.loaded * 100 / e.total);
            if (pct - item.pct >= 20 || pct === 100) { item.pct = pct; desenharArquivos(); }
          }
        });
        x.addEventListener("load", function () { if (x.status >= 200 && x.status < 300) ok(); else erro(new Error("falha no envio")); });
        x.addEventListener("error", function () { erro(new Error("falha na conexão")); });
        x.send(corpo);
      });
    }).then(function () {
      item.estado = "enviada"; item.pct = 100;
      depoisDoArquivo();
    }, function (e) { falhou(e.message || "falha no envio"); });
  }

  // ---------------------------------------------------------------- selo (estimativa)
  function agoraBrasilia() {
    var p = {};
    new Intl.DateTimeFormat("en-US", { timeZone: "America/Sao_Paulo", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false })
      .formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    return { util: ["Sat", "Sun"].indexOf(p.weekday) < 0, hhmm: (p.hour === "24" ? "00" : p.hour) + ":" + p.minute };
  }
  function bom(id) { var v = valor(id); return v !== undefined && v !== "" && v !== "nao_sei" && !(Array.isArray(v) && !v.length); }
  function itensSelo() {
    var r = ramo(), s = valor("P1"), itens = [];
    itens.push({ chave: "ficha", texto: "Ficha cadastral anexada", ok: enviados("ficha_cadastral").length > 0 });
    if (r === "locacao") {
      var loc = (s !== "compressor_gerador" || bom("L1")) && bom("L2") && bom("L3") && (s !== "bomba" || bom("L4"));
      itens.push({ chave: "locacao", texto: s === "bomba" ? "Período, operador e volume de concreto" : "Equipamento, período e operador", ok: loc });
    } else {
      var projeto = enviados("projeto").some(function (a) { return EXT_OK[a.ext]; });
      itens.push({ chave: "projeto", texto: "Projeto em PDF ou imagem (ou quantidade, diâmetro e profundidade)",
        ok: projeto || (bom("F2") && bom("F3") && bom("F4")) });
    }
    var basicos = bom("P1") && s !== "nao_sei" && bom("P2") && bom("P4") && !!est.extra.uf && bom("P5") && (r === "locacao" || bom("F1"));
    itens.push({ chave: "respostas", texto: r === "locacao" ? "Serviço, tipo do pedido, cidade e início" : "Serviço, tipo do pedido, tipo de obra, cidade e início", ok: basicos });
    itens.push({ chave: "contato", texto: "Nome, e-mail e telefone", ok: bom("C1") && bom("C3") && bom("C4") });
    var h = agoraBrasilia();
    itens.push({ chave: "hora", texto: "Enviado em dia útil até as " + O.selo.corte.replace(":00", "h"), ok: h.util && h.hhmm <= O.selo.corte, hora: true });
    return itens;
  }
  function desenharSelo() {
    if (!seloEl) return;
    if (!O.selo.ativo) { seloEl.hidden = true; return; }
    var itens = itensSelo();
    var assinatura = itens.map(function (i) { return i.ok ? 1 : 0; }).join("");
    if (assinatura === seloEl.dataset.assinatura) return; // só redesenha (e anuncia) quando algo muda
    seloEl.dataset.assinatura = assinatura;
    seloEl.hidden = false;
    seloEl.textContent = "";
    seloEl.appendChild(el("h3", "orc-selo-titulo", O.selo.titulo));
    var ul = el("ul", "orc-selo-lista");
    itens.forEach(function (i) {
      var li = el("li", i.ok ? "orc-selo-ok" : "orc-selo-falta");
      li.appendChild(el("span", "orc-selo-marca", i.ok ? "✓" : "○"));
      li.appendChild(el("span", null, i.texto + ": " + (i.ok ? "ok" : (i.hora ? "fora do horário (sai no próximo dia útil)" : "falta"))));
      ul.appendChild(li);
    });
    seloEl.appendChild(ul);
    seloEl.appendChild(el("p", "orc-selo-nota", "Sem estes itens você também pode enviar; o retorno é em até 2 dias úteis."));
  }

  // ---------------------------------------------------------------- arquivos (lista que acompanha a conversa)
  var arqEl = el("div", "orc-arquivos");
  arqEl.setAttribute("aria-live", "polite");
  function desenharArquivos() {
    arqEl.textContent = "";
    var todos = [];
    Object.keys(est.anexos).forEach(function (t) { est.anexos[t].forEach(function (a) { todos.push(a); }); });
    if (!todos.length) return;
    var ul = el("ul");
    todos.forEach(function (a) {
      var st = a.estado === "enviada" ? "enviado" : a.estado === "erro" ? "não enviado: " + a.msg : (a.pct ? a.pct + "%" : "enviando");
      ul.appendChild(el("li", "orc-arq-" + a.estado, TIPOS[a.tipo].texto + " · " + a.nome + ": " + st));
    });
    arqEl.appendChild(ul);
  }

  // ---------------------------------------------------------------- montagem da conversa
  var topo = el("div", "orc-chat-topo");
  var progresso = el("p", "orc-progresso");
  var linkForm = botao("Prefiro preencher um formulário", "orc-link", function () { usarFormulario(); });
  topo.appendChild(progresso); topo.appendChild(linkForm);
  var logEl = el("div", "orc-log");
  logEl.setAttribute("role", "log");
  logEl.setAttribute("aria-live", "polite");
  logEl.setAttribute("aria-label", "Conversa do pedido de orçamento");
  var atualEl = el("div", "orc-atual");
  chat.appendChild(topo); chat.appendChild(logEl); chat.appendChild(atualEl); chat.appendChild(arqEl);

  function balaoResposta(id) {
    var div = el("div", "orc-par");
    div.dataset.id = id;
    var perg = id === "ANEXOS" || id === "ANEXO_FICHA" ? "Anexos" : PQ[id].texto;
    div.appendChild(el("p", "orc-balao orc-balao-cgl", perg));
    var r = el("p", "orc-balao orc-balao-cliente");
    r.appendChild(el("span", null, textoResposta(id)));
    var alt = botao("Alterar", "orc-link orc-alterar", function () { alterar(id); });
    alt.setAttribute("aria-label", "Alterar a resposta de: " + perg);
    r.appendChild(alt);
    div.appendChild(r);
    return div;
  }
  function desenharLog() {
    var p = passos(), feitos = [];
    for (var i = 0; i < p.length && feito(p[i]); i++) feitos.push(p[i]);
    var prefixo = est.log.length <= feitos.length && est.log.every(function (id, k) { return feitos[k] === id; });
    if (!prefixo) { logEl.textContent = ""; est.log = []; }
    else {
      // atualiza o texto das respostas já desenhadas (anexos podem ter terminado de subir)
      Array.prototype.forEach.call(logEl.children, function (div) {
        var span = div.querySelector(".orc-balao-cliente span");
        if (span && div.dataset.id) span.textContent = textoResposta(div.dataset.id);
      });
    }
    feitos.slice(est.log.length).forEach(function (id) { logEl.appendChild(balaoResposta(id)); est.log.push(id); });
  }

  function responder(id, v) {
    est.resp[id] = v;
    est.interagiu = true;
    if (id === "P1") garantirPedido().catch(function () {}); // o tempo do pedido começa a contar aqui
    desenhar();
  }
  function alterar(id) {
    est.interagiu = true;
    if (id === "ANEXOS" || id === "ANEXO_FICHA") est.anexosFeito = false;
    else delete est.resp[id];
    desenhar();
  }

  function campoErro(input, msgEl, msg) {
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    msgEl.textContent = msg || "";
  }
  function entrada(tipo, rotulo, idCampo, opc) {
    opc = opc || {};
    var wrap = el("div", "campo");
    var lab = el("label", null, rotulo); lab.htmlFor = idCampo;
    var inp;
    if (opc.longo) { inp = el("textarea"); inp.rows = 3; }
    else {
      inp = el("input");
      inp.type = { mes: "month", numero: "number", telefone: "tel", email: "email", data: "date" }[tipo] || "text";
      if (tipo === "numero") { inp.inputMode = "numeric"; if (opc.min != null) inp.min = opc.min; if (opc.max != null) inp.max = opc.max; }
      if (tipo === "data") inp.min = hojeISO();
    }
    inp.id = idCampo;
    if (opc.max && tipo !== "numero") inp.maxLength = opc.max;
    if (opc.autocomplete) inp.autocomplete = opc.autocomplete;
    if (opc.valor != null) inp.value = opc.valor;
    var msg = el("p", "orc-erro"); msg.id = idCampo + "-erro";
    inp.setAttribute("aria-describedby", msg.id);
    wrap.appendChild(lab); wrap.appendChild(inp); wrap.appendChild(msg);
    return { wrap: wrap, input: inp, msg: msg };
  }
  function validar(tipo, v, q) {
    v = String(v || "").trim();
    if (!v) return q && q.obrigatoria ? "Preencha este campo." : null;
    if (tipo === "email" && !/^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[^\s@<>()",;:]{2,}$/.test(v)) return "Confira o e-mail.";
    if (tipo === "telefone") { var d = digitos(v); if (d.length > 11 && d.indexOf("55") === 0) d = d.slice(2); if (d.length < 10 || d.length > 11) return "Informe o número com DDD (10 ou 11 dígitos)."; }
    if (tipo === "data" && v < hojeISO()) return "Escolha uma data a partir de hoje.";
    if (tipo === "numero" && (isNaN(Number(v.replace(",", "."))))) return "Digite só o número.";
    return null;
  }
  function numeroDe(v) { return Number(String(v).replace(",", ".")); }

  function pularOuNaoSei(q, rodape) {
    var temNaoSei = (q.opcoes || []).some(function (o) { return o.v === "nao_sei"; });
    if (!q.obrigatoria && !temNaoSei) rodape.appendChild(botao("Pular", "orc-btn orc-btn-sec", function () { responder(q.id, PULOU); }));
  }

  // --------------------------------------------------- desenho da pergunta atual, por tipo
  function desenharAnexos(soFicha) {
    var box = el("div", "orc-pergunta");
    box.appendChild(el("p", "orc-balao orc-balao-cgl", soFicha
      ? "Se tiver, anexe a ficha cadastral da empresa para quem o orçamento será feito (opcional)."
      : "Comece pelos documentos. O que eles já dizem, não perguntamos."));
    var contas = {};
    (soFicha ? ["ficha_cadastral"] : Object.keys(est.anexos)).forEach(function (t) {
      var a = TIPOS[t];
      var slot = el("div", "orc-anexo");
      var idc = "orc-chat-anexo-" + t;
      var lab = el("label", "orc-anexo-rotulo", a.texto); lab.htmlFor = idc;
      var inp = el("input"); inp.type = "file"; inp.id = idc; inp.multiple = true; inp.accept = a.formatos;
      var ajuda = el("p", "orc-ajuda", a.ajuda + (t === "ficha_cadastral" ? " " + O.avisoFicha : ""));
      ajuda.id = idc + "-ajuda"; inp.setAttribute("aria-describedby", ajuda.id);
      inp.addEventListener("change", function () {
        Array.prototype.forEach.call(inp.files, function (f) { enviarArquivo(t, f); });
        inp.value = "";
      });
      // arrastar e soltar é só um atalho do campo de arquivo
      slot.addEventListener("dragover", function (e) { e.preventDefault(); slot.classList.add("orc-anexo-sobre"); });
      slot.addEventListener("dragleave", function () { slot.classList.remove("orc-anexo-sobre"); });
      slot.addEventListener("drop", function (e) {
        e.preventDefault(); slot.classList.remove("orc-anexo-sobre");
        Array.prototype.forEach.call(e.dataTransfer.files || [], function (f) { enviarArquivo(t, f); });
      });
      slot.appendChild(lab); slot.appendChild(inp); slot.appendChild(ajuda);
      contas[t] = el("p", "orc-anexo-conta", contaTexto(validos(t).length));
      slot.appendChild(contas[t]);
      box.appendChild(slot);
    });
    var algum = Object.keys(est.anexos).some(function (t) { return validos(t).length > 0; });
    var rod = el("div", "orc-rodape");
    var seguir = botao(algum ? "Continuar" : "Não tenho agora, continuar", "orc-btn", function () {
      est.anexosFeito = true; est.interagiu = true; desenhar();
    });
    rod.appendChild(seguir);
    anexosUI = { contas: contas, botao: seguir };
    box.appendChild(rod);
    return box;
  }

  function desenharPergunta(q) {
    var box = el("div", "orc-pergunta");
    var titulo = el("p", "orc-balao orc-balao-cgl", q.texto + (q.obrigatoria ? " *" : ""));
    titulo.id = "orc-q-" + q.id;
    box.appendChild(titulo);
    var rod = el("div", "orc-rodape");

    if (q.tipo === "opcoes") {
      var grupo = el("div", "orc-opcoes-chat"); grupo.setAttribute("role", "group"); grupo.setAttribute("aria-labelledby", titulo.id);
      var extraBox = el("div", "orc-extra");
      q.opcoes.forEach(function (o) {
        grupo.appendChild(botao(o.texto, "orc-btn orc-btn-opcao", function () {
          var ex = q.extra;
          if (ex && (ex.quando === o.v || ex.quando === "*")) {
            // abre o campo complementar antes de seguir
            Array.prototype.forEach.call(grupo.children, function (b) { b.setAttribute("aria-pressed", b.textContent === o.texto ? "true" : "false"); });
            if (extraBox.dataset.aberto) { extraBox.dataset.aberto = o.v; extraBox.querySelector("input").focus(); return; }
            extraBox.dataset.aberto = o.v;
            var c = entrada(ex.tipo || "texto", ex.texto, "orc-x-" + ex.name, { max: ex.max, min: ex.min, valor: est.extra[ex.name] });
            extraBox.appendChild(c.wrap);
            extraBox.appendChild(botao("Continuar", "orc-btn", function () {
              var obrig = ex.name === "inicio_mes" || ex.name === "whatsapp";
              var err = validar(ex.tipo || "texto", c.input.value, { obrigatoria: obrig });
              if (!err && ex.tipo === "numero" && c.input.value && (numeroDe(c.input.value) < ex.min || numeroDe(c.input.value) > ex.max)) err = "Valor fora do limite.";
              campoErro(c.input, c.msg, err); if (err) { c.input.focus(); return; }
              var v = c.input.value.trim();
              if (v) est.extra[ex.name] = ex.tipo === "numero" ? numeroDe(v) : v; else delete est.extra[ex.name];
              responder(q.id, extraBox.dataset.aberto);
            }));
            c.input.focus();
            return;
          }
          if (ex && ex.quando !== "*" && ex.quando !== o.v) delete est.extra[ex.name];
          responder(q.id, o.v);
        }));
      });
      box.appendChild(grupo);
      box.appendChild(extraBox);
      if (q.numero) {
        var cn = entrada("numero", q.numero.texto, "orc-n-" + q.id, { min: q.numero.min, max: q.numero.max });
        cn.wrap.classList.add("orc-numero");
        var okN = botao("OK", "orc-btn", function () {
          var v = cn.input.value.trim(), n = numeroDe(v);
          var err = !v ? "Digite o número ou escolha uma opção." : (isNaN(n) || n < q.numero.min || n > q.numero.max) ? "Valor fora do limite." : null;
          campoErro(cn.input, cn.msg, err); if (err) { cn.input.focus(); return; }
          responder(q.id, n);
        });
        cn.wrap.appendChild(okN);
        box.appendChild(cn.wrap);
      }
    } else if (q.tipo === "multipla" || q.tipo === "diametros") {
      var marcados = Array.isArray(est.resp[q.id]) ? est.resp[q.id].slice() : [];
      var opcoes = q.tipo === "multipla" ? q.opcoes
        : (O.diametros[valor("P1")] || []).map(function (d) { return { v: d, texto: d + " mm" }; });
      var g2 = el("div", "orc-opcoes-chat"); g2.setAttribute("role", "group"); g2.setAttribute("aria-labelledby", titulo.id);
      opcoes.forEach(function (o) {
        var b = botao(o.texto, "orc-btn orc-btn-opcao", function () {
          var i = marcados.indexOf(o.v);
          if (i >= 0) marcados.splice(i, 1); else marcados.push(o.v);
          b.setAttribute("aria-pressed", marcados.indexOf(o.v) >= 0 ? "true" : "false");
        });
        b.setAttribute("aria-pressed", marcados.indexOf(o.v) >= 0 ? "true" : "false");
        g2.appendChild(b);
      });
      box.appendChild(g2);
      var cOutro = null;
      if (q.tipo === "diametros") {
        cOutro = entrada("numero", opcoes.length ? "Outro diâmetro, em mm (opcional)" : "Diâmetro em mm", "orc-n-" + q.id, { min: 100, max: 3000 });
        box.appendChild(cOutro.wrap);
      }
      var msgM = el("p", "orc-erro"); msgM.setAttribute("aria-live", "polite"); box.appendChild(msgM);
      rod.appendChild(botao("Continuar", "orc-btn", function () {
        var lista = marcados.slice();
        if (cOutro && cOutro.input.value.trim()) {
          var n = numeroDe(cOutro.input.value);
          if (isNaN(n) || n < 100 || n > 3000 || Math.round(n) !== n) { campoErro(cOutro.input, cOutro.msg, "Diâmetro entre 100 e 3000 mm."); return; }
          if (lista.indexOf(n) < 0) lista.push(n);
        }
        if (!lista.length) { msgM.textContent = "Marque pelo menos uma opção, ou use " + (q.tipo === "diametros" ? "\"Não sei\"." : "\"Pular\"."); return; }
        if (q.tipo === "diametros") lista.sort(function (a, b) { return a - b; });
        responder(q.id, lista);
      }));
      if (q.tipo === "diametros") rod.appendChild(botao("Não sei", "orc-btn orc-btn-sec", function () { responder(q.id, "nao_sei"); }));
    } else if (q.tipo === "cidade") {
      var linha = el("div", "campo-linha");
      var cc = entrada("texto", "Cidade", "orc-c-cidade", { max: 80, valor: valor("P4") });
      var cu = el("div", "campo");
      var lu = el("label", null, "UF"); lu.htmlFor = "orc-c-uf";
      var su = el("select"); su.id = "orc-c-uf";
      su.appendChild(el("option", null, "Selecione"));
      su.firstChild.value = "";
      Array.prototype.forEach.call(form.querySelectorAll("select[name=uf] option"), function (op) {
        if (op.value) { var o2 = el("option", null, op.value); o2.value = op.value; su.appendChild(o2); }
      });
      if (est.extra.uf) su.value = est.extra.uf;
      cu.appendChild(lu); cu.appendChild(su);
      linha.appendChild(cc.wrap); linha.appendChild(cu);
      box.appendChild(linha);
      rod.appendChild(botao("Continuar", "orc-btn", function () {
        var cidade = cc.input.value.trim();
        if (!cidade || !su.value) { campoErro(cc.input, cc.msg, "Informe a cidade e a UF."); (cidade ? su : cc.input).focus(); return; }
        est.extra.uf = su.value;
        responder(q.id, cidade);
      }));
    } else {
      var tipo = q.tipo === "texto" ? "texto" : q.tipo;
      var ci = entrada(tipo, q.texto, "orc-i-" + q.id, { max: q.max, autocomplete: q.autocomplete, longo: q.longo,
        valor: typeof est.resp[q.id] === "string" && est.resp[q.id] !== PULOU ? est.resp[q.id] : "" });
      ci.wrap.querySelector("label").classList.add("orc-oculto");
      box.appendChild(ci.wrap);
      var cx = null;
      if (q.extra) {
        cx = entrada(q.extra.tipo || "texto", q.extra.texto, "orc-x-" + q.extra.name, { max: q.extra.max, valor: est.extra[q.extra.name] });
        box.appendChild(cx.wrap);
      }
      var seguir = function () {
        var err = validar(tipo, ci.input.value, q);
        campoErro(ci.input, ci.msg, err); if (err) { ci.input.focus(); return; }
        if (cx) {
          var v2 = cx.input.value.trim();
          if (q.extra.name === "cnpj" && v2 && digitos(v2).length !== 14) { campoErro(cx.input, cx.msg, "O CNPJ tem 14 dígitos."); cx.input.focus(); return; }
          if (v2) est.extra[q.extra.name] = v2; else delete est.extra[q.extra.name];
        }
        var v = ci.input.value.trim();
        responder(q.id, v ? v : PULOU);
      };
      if (!q.longo) ci.input.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); seguir(); } });
      rod.appendChild(botao("Continuar", "orc-btn", seguir));
    }
    pularOuNaoSei(q, rod);
    if (rod.children.length) box.appendChild(rod);
    return box;
  }

  // ---------------------------------------------------------------- revisão e envio
  function canalTexto() {
    var c = valor("C5");
    return c === "whatsapp" ? "pelo WhatsApp" : c === "ambos" ? "pelo WhatsApp e por e-mail" : "por e-mail";
  }
  function montarDados() {
    var dados = { respostas: {}, aviso_privacidade_versao: O.privacidadeVersao };
    passos().forEach(function (id) {
      var q = PQ[id];
      if (!q) return;
      var v = valor(id);
      if (q.extra && est.extra[q.extra.name] != null) {
        var ex = est.extra[q.extra.name];
        if (/^[A-Z][0-9]/.test(q.extra.name)) dados.respostas[q.extra.name] = ex; else dados[q.extra.name] = ex;
      }
      if (q.tipo === "cidade" && v) dados.uf = est.extra.uf;
      if (v === undefined) return;
      if (q.name === q.id) dados.respostas[q.name] = v; else dados[q.name] = v;
    });
    return dados;
  }
  function desenharRevisao() {
    var box = el("div", "orc-pergunta orc-revisao");
    box.appendChild(el("h3", "orc-revisao-titulo", "Confira e envie"));
    var dl = el("dl", "orc-revisao-lista");
    passos().forEach(function (id) {
      var dt = el("dt", null, id === "ANEXOS" || id === "ANEXO_FICHA" ? "Anexos" : PQ[id].texto);
      var dd = el("dd", null, textoResposta(id));
      dl.appendChild(dt); dl.appendChild(dd);
    });
    box.appendChild(dl);

    var itens = itensSelo();
    var faltam = itens.filter(function (i) { return !i.ok && !i.hora; });
    var hora = itens.filter(function (i) { return i.hora; })[0];
    var aviso = el("div", "orc-revisao-selo");
    if (O.selo.ativo && !faltam.length) {
      aviso.appendChild(el("p", "orc-selo-sim", (hora.ok ? O.selo.comSeloHoje : O.selo.comSeloAmanha) + ", " + canalTexto() + "."));
    } else {
      aviso.appendChild(el("p", null, O.selo.semSelo));
      if (O.selo.ativo) {
        aviso.appendChild(el("p", null, O.selo.falta + " " + faltam.map(function (i) { return i.texto.toLowerCase(); }).join("; ") + "."));
        if (faltam.some(function (i) { return i.chave === "ficha" || i.chave === "projeto"; })) {
          aviso.appendChild(botao("Voltar aos anexos", "orc-btn orc-btn-sec", function () {
            alterar(ramo() === "locacao" ? "ANEXO_FICHA" : "ANEXOS");
          }));
        }
      }
    }
    var soDesenho = enviados("projeto").length && !enviados("projeto").some(function (a) { return EXT_OK[a.ext]; });
    if (soDesenho) aviso.appendChild(el("p", "orc-ajuda", "O projeto veio só em DWG ou DXF. Se tiver, mande também o PDF: ele é lido mais rápido."));
    box.appendChild(aviso);

    var msg = el("p", "orc-erro"); msg.setAttribute("role", "alert");
    var enviar = botao(emAndamento() ? "Aguardando o envio dos arquivos..." : "Enviar pedido", "orc-btn orc-btn-enviar", function () {
      if (est.enviando || emAndamento()) return;
      est.enviando = true; enviar.disabled = true; enviar.textContent = "Enviando...";
      msg.textContent = "";
      garantirPedido().then(function (p) {
        return chamar({ acao: "enviar", id: p.id, token: p.token, dados: montarDados(),
          site_url: (form.querySelector("[name=site_url]") || {}).value || "", selo_ativo: O.selo.ativo !== false });
      }).then(function (j) {
        var q = new URLSearchParams({ p: j.protocolo, s: j.selo ? "1" : "0", c: valor("C5") || "email" });
        if (j.prazo) q.set("prazo", j.prazo);
        if (j.faltou && j.faltou.length) q.set("f", j.faltou.join(","));
        window.location.href = "orcamento/recebido/?" + q.toString();
      }, function (e) {
        est.enviando = false; enviar.disabled = false; enviar.textContent = "Enviar pedido";
        msg.textContent = (e.message || "Não foi possível enviar.") + " Se continuar, fale pelo WhatsApp " + (C.contato ? C.contato.celular : "") + " ou pelo e-mail " + (C.contato ? C.contato.email : "") + ".";
      });
    });
    enviar.disabled = emAndamento();
    box.appendChild(enviar);
    box.appendChild(msg);
    var priv = el("p", "orc-privacidade", O.avisoPrivacidade + " Veja a ");
    var a = el("a", null, "política de privacidade"); a.href = "privacidade/";
    priv.appendChild(a); priv.appendChild(document.createTextNode("."));
    box.appendChild(priv);
    return box;
  }

  // ---------------------------------------------------------------- desenho geral
  function desenhar(semFoco) {
    desenharLog();
    var a = atual();
    atualEl.textContent = "";
    if (!a) {
      progresso.textContent = "Revisão do pedido";
      atualEl.appendChild(desenharRevisao());
    } else {
      progresso.textContent = (a.id === "ANEXOS" || a.id === "ANEXO_FICHA" ? "Anexos" : "Pergunta " + a.n) + " de " + a.total;
      atualEl.appendChild(a.id === "ANEXOS" || a.id === "ANEXO_FICHA" ? desenharAnexos(a.id === "ANEXO_FICHA") : desenharPergunta(PQ[a.id]));
    }
    desenharSelo();
    if (est.interagiu && !semFoco) {
      var foco = atualEl.querySelector("button:not([disabled]), input, select, textarea");
      if (foco) foco.focus({ preventScroll: false });
    }
  }

  // ---------------------------------------------------------------- troca para o formulário completo
  function marcar(nome, v) {
    var lista = Array.isArray(v) ? v.map(String) : [String(v)];
    Array.prototype.forEach.call(form.querySelectorAll('[name="' + nome + '"]'), function (inp) {
      if (inp.type === "radio" || inp.type === "checkbox") inp.checked = lista.indexOf(inp.value) >= 0;
      else if (inp.type !== "file" && lista.length === 1) inp.value = lista[0];
    });
  }
  function usarFormulario() {
    var d = montarDados();
    Object.keys(d).forEach(function (k) { if (k !== "respostas") marcar(k, d[k]); });
    Object.keys(d.respostas).forEach(function (k) { marcar(k, d.respostas[k]); });
    chat.hidden = true;
    form.hidden = false;
    var voltar = document.getElementById("orc-voltar-chat");
    if (!voltar) {
      voltar = botao("Voltar para a conversa", "orc-link", function () { form.hidden = true; chat.hidden = false; est.interagiu = true; desenhar(); });
      voltar.id = "orc-voltar-chat";
      form.insertBefore(voltar, form.firstChild);
    }
    var aviso = form.querySelector(".orc-form-intro");
    if (aviso && Object.keys(est.anexos).some(function (t) { return est.anexos[t].length; })) {
      aviso.textContent = "Os arquivos escolhidos na conversa não passam para o formulário: escolha de novo abaixo.";
    }
    voltar.focus();
  }

  form.hidden = true;
  chat.hidden = false;
  desenharArquivos();
  desenhar();
})();

/* ============================================================
   CGL FUNDAÇÕES — app.js
   Monta o site a partir do arquivo conteudo.js.
   ============================================================ */
(function () {
  "use strict";
  var C = window.CONTEUDO;
  if (!C) { console.error("conteudo.js nao carregou."); return; }

  var $ = function (id) { return document.getElementById(id); };
  var el = function (tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  };

  var ICONES = {
    estaca:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M8 6c0 0 4 2 4-2M16 10c0 0-4 2-4-2M8 14c0 0 4 2 4-2M16 18c0 0-4 2-4-2"/></svg>',
    raiz:        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v8M12 10c0 4-4 5-4 12M12 10c0 4 4 5 4 12M12 10v12"/></svg>',
    secante:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="12" r="6"/><circle cx="15" cy="12" r="6"/></svg>',
    parede:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16"/><path d="M3 10h18M3 16h18M9 4v6M15 10v6M9 16v4"/></svg>',
    sondagem:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v13M9 15h6l-3 7-3-7zM7 6h10M8 10h8"/></svg>',
    terra:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 20h20M4 20l4-8 5 4 4-7 5 11"/></svg>',
    consultoria: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v12H8l-4 4z"/><path d="M8 9h8M8 12h5"/></svg>'
  };

  $("logo").innerHTML = "CGL <b>&middot;</b><small>Fundações</small>";
  var nav = $("nav");
  C.menu.forEach(function (m) {
    var a = el("a", null, m.texto);
    a.href = "#" + m.id;
    a.dataset.id = m.id;
    nav.appendChild(a);
  });
  if (C.sistema) {
    var aSis = el("a", "nav-sistema", C.sistema.texto);
    aSis.href = C.sistema.url;
    aSis.rel = "noopener";
    nav.appendChild(aSis);
  }
  var toggle = $("menu-toggle");
  toggle.addEventListener("click", function () {
    var aberto = nav.classList.toggle("aberto");
    toggle.classList.toggle("aberto", aberto);
    toggle.setAttribute("aria-expanded", aberto ? "true" : "false");
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      nav.classList.remove("aberto");
      toggle.classList.remove("aberto");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  $("hero-fundo").style.backgroundImage = "url('" + C.hero.imagem + "')";
  $("hero-tag").textContent = C.empresa.slogan;
  $("hero-titulo").textContent = C.hero.titulo;
  $("hero-sub").textContent = C.hero.subtitulo;
  var hb = $("hero-botoes");
  var b1 = el("a", "btn btn-accent", C.hero.botaoPrimario); b1.href = "#orcamento";
  var b2 = el("a", "btn btn-outline", C.hero.botaoSecundario); b2.href = "#servicos";
  hb.appendChild(b1); hb.appendChild(b2);

  var ng = $("numeros-grid");
  C.numeros.forEach(function (n) {
    ng.appendChild(el("div", null,
      '<div class="numero-valor">' + n.valor + '</div>' +
      '<div class="numero-rotulo">' + n.rotulo + '</div>'));
  });

  $("sobre-imagem").style.backgroundImage = "url('" + C.sobre.imagem + "')";
  $("sobre-tag").textContent = C.sobre.chamada;
  $("sobre-titulo").textContent = C.sobre.titulo;
  var sp = $("sobre-paragrafos");
  C.sobre.paragrafos.forEach(function (p) { sp.appendChild(el("p", null, p)); });
  var sv = $("sobre-valores");
  C.sobre.valores.forEach(function (v) {
    sv.appendChild(el("div", "valor-item",
      "<h3>" + v.titulo + "</h3><p>" + v.texto + "</p>"));
  });

  $("servicos-tag").textContent = C.servicos.chamada;
  $("servicos-titulo").textContent = C.servicos.titulo;
  var sg = $("servicos-grid");
  C.servicos.lista.forEach(function (s) {
    var card = el("div", "servico-card");
    card.innerHTML =
      '<div class="servico-icone">' + (ICONES[s.icone] || ICONES.consultoria) + '</div>' +
      '<h3>' + s.nome + '</h3><p>' + s.descricao + '</p>';
    sg.appendChild(card);
  });

  $("equip-tag").textContent = C.equipamentos.chamada;
  $("equip-titulo").textContent = C.equipamentos.titulo;
  $("equip-descricao").textContent = C.equipamentos.texto;
  var ed = $("equip-destaques");
  C.equipamentos.destaques.forEach(function (d) {
    ed.appendChild(el("div", "equip-item",
      "<h3>" + d.titulo + "</h3><p>" + d.texto + "</p>"));
  });

  $("obras-tag").textContent = C.obras.chamada;
  $("obras-titulo").textContent = C.obras.titulo;
  var og = $("obras-grid");
  C.obras.lista.forEach(function (o) {
    var card = el("div", "obra-card");
    card.innerHTML =
      '<div class="obra-foto" style="background-image:url(\'' + o.imagem + '\')"></div>' +
      '<div class="obra-info"><span class="obra-local">' + o.local + '</span>' +
      '<h3>' + o.nome + '</h3><p>' + o.descricao + '</p></div>';
    og.appendChild(card);
  });

  $("orc-tag").textContent = C.orcamento.chamada;
  $("orc-titulo").textContent = C.orcamento.titulo;
  $("orc-texto").textContent = C.orcamento.texto;
  var sel = $("f-servico");
  sel.appendChild(el("option", null, "Selecione..."));
  C.orcamento.servicosDisponiveis.forEach(function (s) {
    var op = el("option", null, s); op.value = s; sel.appendChild(op);
  });
  var waNum = C.contato.whatsapp;
  $("orc-whatsapp").href = "https://wa.me/" + waNum;
  $("whatsapp-flutuante").href = "https://wa.me/" + waNum +
    "?text=" + encodeURIComponent("Olá! Gostaria de informações sobre fundações.");

  $("contato-tag").textContent = C.contato.chamada;
  $("contato-titulo").textContent = C.contato.titulo;
  var ct = C.contato;
  var info = $("contato-info");
  var ICO = {
    pin:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    fone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h4l2 5-3 2a13 13 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 4 5a2 2 0 0 1 2-2z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
    hora: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'
  };
  function blocoContato(icone, titulo, conteudoHtml) {
    return '<div class="contato-bloco"><div class="contato-icone">' + icone +
      '</div><div><h3>' + titulo + '</h3>' + conteudoHtml + '</div></div>';
  }
  info.innerHTML =
    blocoContato(ICO.pin, "Endereço", "<p>" + ct.endereco + "</p>") +
    blocoContato(ICO.fone, "Telefones",
      "<p>" + ct.telefone + "</p>" +
      '<p><a href="https://wa.me/' + waNum + '">' + ct.celular + " (WhatsApp)</a></p>") +
    blocoContato(ICO.mail, "E-mail",
      '<p><a href="mailto:' + ct.email + '">' + ct.email + "</a></p>") +
    blocoContato(ICO.hora, "Atendimento", "<p>" + ct.horario + "</p>");
  $("contato-mapa").innerHTML =
    '<iframe src="' + ct.mapaIncorporar + '" loading="lazy" ' +
    'referrerpolicy="no-referrer-when-downgrade" title="Mapa CGL Fundações"></iframe>';

  $("rodape-interno").innerHTML =
    "<span>" + C.rodape.texto + "</span>" +
    "<span>" + C.rodape.cnpj + "</span>" +
    (C.sistema ? '<a class="rodape-sistema" href="' + C.sistema.url + '" rel="noopener">' + C.sistema.texto + "</a>" : "");

  var form = $("orcamento-form");
  var aviso = $("form-aviso");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var nome = $("f-nome").value.trim();
    var email = $("f-email").value.trim();
    var tel = $("f-telefone").value.trim();
    if (!nome || !email || !tel) {
      aviso.textContent = "Preencha nome, e-mail e telefone.";
      aviso.className = "form-aviso erro";
      return;
    }
    var corpo =
      "Nome: " + nome + "\n" +
      "Empresa: " + $("f-empresa").value + "\n" +
      "E-mail: " + email + "\n" +
      "Telefone: " + tel + "\n" +
      "Cidade/UF: " + $("f-cidade").value + "\n" +
      "Serviço: " + $("f-servico").value + "\n\n" +
      "Descrição da obra:\n" + $("f-mensagem").value;
    aviso.textContent = C.orcamento.mensagemSucesso;
    aviso.className = "form-aviso ok";
    window.location.href = "mailto:" + C.contato.email +
      "?subject=" + encodeURIComponent("Pedido de orçamento - " + nome) +
      "&body=" + encodeURIComponent(corpo);
    form.reset();
  });

  var cab = $("cabecalho");
  var secoes = C.menu.map(function (m) { return document.getElementById(m.id); });
  function aoRolar() {
    cab.classList.toggle("rolado", window.scrollY > 20);
    var pos = window.scrollY + 120, atual = C.menu[0].id;
    secoes.forEach(function (s, i) {
      if (s && s.offsetTop <= pos) { atual = C.menu[i].id; }
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.classList.toggle("ativo", a.dataset.id === atual);
    });
  }
  window.addEventListener("scroll", aoRolar, { passive: true });
  aoRolar();

})();

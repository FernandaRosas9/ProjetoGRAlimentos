/* ==========================================================================
   GR ALIMENTOS — Catálogo: renderização, busca e filtros
   ========================================================================== */

const Catalogo = {
  estado: {
    busca: "",
    categorias: new Set(),
    disponibilidade: "todos",   // "todos" | "pronta" | "encomenda"
    ordem: "padrao",            // "padrao" | "nome" | "categoria"
  },

  iniciar() {
    this.grade = $("#produtos-grade");
    if (!this.grade) return;

    this.montarFiltrosCategoria();
    this.ligarEventos();
    this.aplicarParametroDaURL();
    this.renderizar();
  },

  /* ---- Monta os checkboxes de categoria a partir dos produtos ------- */
  montarFiltrosCategoria() {
    const caixa = $("#filtro-categorias");
    if (!caixa) return;

    const usadas = [...new Set(PRODUTOS.map((p) => p.categoria))];
    caixa.innerHTML = usadas.map((cat) => {
      const qtd = PRODUTOS.filter((p) => p.categoria === cat).length;
      return `
        <label>
          <input type="checkbox" name="categoria" value="${esc(cat)}">
          <span>${esc(CATEGORIAS[cat] || cat)} <small style="color:var(--texto-suave)">(${qtd})</small></span>
        </label>`;
    }).join("");
  },

  ligarEventos() {
    const busca = $("#busca");
    if (busca) {
      busca.addEventListener("input", (e) => {
        this.estado.busca = e.target.value.trim().toLowerCase();
        this.renderizar();
      });
    }

    $("#filtro-categorias")?.addEventListener("change", (e) => {
      if (e.target.name !== "categoria") return;
      if (e.target.checked) this.estado.categorias.add(e.target.value);
      else this.estado.categorias.delete(e.target.value);
      this.renderizar();
    });

    $$('input[name="disponibilidade"]').forEach((r) => {
      r.addEventListener("change", (e) => {
        this.estado.disponibilidade = e.target.value;
        this.renderizar();
      });
    });

    $("#ordenar")?.addEventListener("change", (e) => {
      this.estado.ordem = e.target.value;
      this.renderizar();
    });

    $("#limpar-filtros")?.addEventListener("click", () => this.limpar());

    $("#abrir-filtros")?.addEventListener("click", (e) => {
      const painel = $("#filtros");
      const aberto = painel.classList.toggle("aberto");
      e.currentTarget.setAttribute("aria-expanded", String(aberto));
      e.currentTarget.textContent = aberto ? "Ocultar filtros" : "Mostrar filtros";
    });

    /* Botões "Adicionar ao pedido" e "Pedir agora" (delegação de evento) */
    this.grade.addEventListener("click", (e) => {
      const botao = e.target.closest("[data-add]");
      if (!botao) return;
      Carrinho.adicionar(botao.dataset.add, 1);
    });
  },

  /* ---- Permite chegar pelo link catalogo.html?categoria=requeijao --- */
  aplicarParametroDaURL() {
    const params = new URLSearchParams(location.search);
    const cat = params.get("categoria");
    if (cat && CATEGORIAS[cat]) {
      this.estado.categorias.add(cat);
      const input = $(`#filtro-categorias input[value="${cat}"]`);
      if (input) input.checked = true;
    }
    const q = params.get("busca");
    if (q) {
      this.estado.busca = q.toLowerCase();
      const busca = $("#busca");
      if (busca) busca.value = q;
    }
  },

  limpar() {
    this.estado.busca = "";
    this.estado.categorias.clear();
    this.estado.disponibilidade = "todos";
    this.estado.ordem = "padrao";

    const busca = $("#busca");
    if (busca) busca.value = "";
    $$('#filtro-categorias input[name="categoria"]').forEach((c) => { c.checked = false; });
    const radio = $('input[name="disponibilidade"][value="todos"]');
    if (radio) radio.checked = true;
    const ordenar = $("#ordenar");
    if (ordenar) ordenar.value = "padrao";

    this.renderizar();
  },

  filtrar() {
    const { busca, categorias, disponibilidade, ordem } = this.estado;

    let lista = PRODUTOS.filter((p) => {
      if (categorias.size && !categorias.has(p.categoria)) return false;
      if (disponibilidade === "pronta" && !p.disponivel) return false;
      if (disponibilidade === "encomenda" && p.disponivel) return false;
      if (busca) {
        const alvo = `${p.nome} ${p.descricao} ${p.linha} ${p.embalagem} ${CATEGORIAS[p.categoria] || ""}`.toLowerCase();
        if (!alvo.includes(busca)) return false;
      }
      return true;
    });

    if (ordem === "nome") {
      lista = [...lista].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    } else if (ordem === "categoria") {
      lista = [...lista].sort((a, b) =>
        (CATEGORIAS[a.categoria] || "").localeCompare(CATEGORIAS[b.categoria] || "", "pt-BR")
        || a.nome.localeCompare(b.nome, "pt-BR"));
    }

    return lista;
  },

  renderizar() {
    const lista = this.filtrar();

    const contador = $("#contador-resultados");
    if (contador) {
      contador.textContent = lista.length === 1
        ? "1 produto encontrado"
        : `${lista.length} produtos encontrados`;
    }

    if (!lista.length) {
      this.grade.innerHTML = `
        <div class="vazio">
          <p><strong>Nenhum produto encontrado com esses filtros.</strong></p>
          <p>Tente outra busca ou fale com a gente pelo WhatsApp — trabalhamos com itens sob encomenda.</p>
          <a class="btn btn--zap btn--pequeno" data-zap="Olá! Procurei no catálogo do site e não encontrei o produto que preciso. Podem me ajudar?" href="#">Falar no WhatsApp</a>
        </div>`;
      aplicarConfig();
      return;
    }

    this.grade.innerHTML = lista.map((p) => cartaoProduto(p)).join("");
    aplicarConfig();
  },
};

/* --------------------------------------------------------------------------
   Cartão de produto — reutilizado no catálogo e nos destaques da home
   -------------------------------------------------------------------------- */
function cartaoProduto(p) {
  const selo = p.disponivel
    ? '<span class="selo selo--disponivel">Pronta entrega</span>'
    : '<span class="selo selo--encomenda">Sob encomenda</span>';

  const msg = `${CONFIG.mensagens.saudacaoProduto}\n\n• ${p.nome}\n• ${p.embalagem} — ${p.unidadeCaixa}\n\nPodem me passar preço e disponibilidade?`;

  return `
    <article class="produto">
      <div class="produto__midia">
        <img src="${esc(p.imagem)}" alt="${esc(p.nome)}" loading="lazy" width="400" height="300">
        <div class="produto__selos">${selo}</div>
      </div>
      <div class="produto__corpo">
        <span class="produto__categoria">${esc(CATEGORIAS[p.categoria] || p.categoria)}</span>
        <h3 class="produto__nome">${esc(p.nome)}</h3>
        <p class="produto__descricao">${esc(p.descricao)}</p>
        <div class="produto__meta">
          <span>Embalagem: <strong>${esc(p.embalagem)}</strong></span>
          <span>${esc(p.unidadeCaixa)}</span>
          <span>Validade: <strong>${esc(p.validade)}</strong></span>
        </div>
        <div class="produto__acoes">
          <button type="button" class="btn btn--primario btn--pequeno" data-add="${esc(p.id)}">Adicionar ao pedido</button>
          <a class="btn btn--secundario btn--pequeno" data-zap="${esc(msg)}" href="#">WhatsApp</a>
        </div>
      </div>
    </article>`;
}

/* --------------------------------------------------------------------------
   Destaques da home
   -------------------------------------------------------------------------- */
function renderizarDestaques() {
  const caixa = $("#destaques-grade");
  if (!caixa) return;
  const destaques = PRODUTOS.filter((p) => p.destaque).slice(0, 4);
  caixa.innerHTML = destaques.map((p) => cartaoProduto(p)).join("");
  caixa.addEventListener("click", (e) => {
    const botao = e.target.closest("[data-add]");
    if (botao) Carrinho.adicionar(botao.dataset.add, 1);
  });
  aplicarConfig();
}

document.addEventListener("DOMContentLoaded", () => {
  Catalogo.iniciar();
  renderizarDestaques();
});

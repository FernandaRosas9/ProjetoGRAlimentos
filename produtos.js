/* ==========================================================================
   GR ALIMENTOS — Base de dados do catálogo
   --------------------------------------------------------------------------
   ⚠️ Produtos e embalagens são PROVISÓRIOS (baseados nas linhas citadas no
   relatório: iogurtes, requeijão e leite fermentado). Substitua pela lista
   real fornecida pela empresa.

   Campos de cada produto:
     id          — identificador único (usado pelo carrinho). Não repetir.
     nome        — nome comercial exibido no cartão
     categoria   — "iogurtes" | "requeijao" | "leite-fermentado" | "bebida-lactea" | "queijos"
     linha       — texto livre exibido como marca/linha do produto
     descricao   — uma frase curta
     embalagem   — como o produto é vendido
     unidadeCaixa— quantas unidades vêm na caixa/fardo
     validade    — validade aproximada
     disponivel  — true  => "Pronta entrega"
                   false => "Sob encomenda"
     destaque    — true exibe o produto na home
     imagem      — caminho da imagem (troque por foto real quando houver)
   ========================================================================== */

const PRODUTOS = [
  /* ------------------------------ IOGURTES ------------------------------ */
  {
    id: "iog-morango-900",
    nome: "Iogurte de Morango 900g",
    categoria: "iogurtes",
    linha: "Iogurtes Carolina",
    descricao: "Iogurte batido sabor morango, cremoso e adoçado na medida.",
    embalagem: "Pote 900 g",
    unidadeCaixa: "Caixa com 6 potes",
    validade: "30 dias sob refrigeração",
    disponivel: true,
    destaque: false,
    imagem: "img/produtos/iogurte-morango.svg",
  },
  {
    id: "iog-coco-900",
    nome: "Iogurte de Coco 900g",
    categoria: "iogurtes",
    linha: "Iogurtes Carolina",
    descricao: "Sabor coco com textura leve — um dos mais pedidos no varejo.",
    embalagem: "Pote 900 g",
    unidadeCaixa: "Caixa com 6 potes",
    validade: "30 dias sob refrigeração",
    disponivel: true,
    destaque: false,
    imagem: "img/produtos/iogurte-coco.svg",
  },
  {
    id: "iog-ameixa-900",
    nome: "Iogurte de Ameixa 900g",
    categoria: "iogurtes",
    linha: "Iogurtes Carolina",
    descricao: "Iogurte com calda de ameixa, sabor tradicional e boa saída.",
    embalagem: "Pote 900 g",
    unidadeCaixa: "Caixa com 6 potes",
    validade: "30 dias sob refrigeração",
    disponivel: true,
    destaque: false,
    imagem: "img/produtos/iogurte-ameixa.svg",
  },
  {
    id: "iog-salada-frutas-900",
    nome: "Iogurte Salada de Frutas 900g",
    categoria: "iogurtes",
    linha: "Iogurtes Carolina",
    descricao: "Mix de frutas em pedaços, indicado para consumo familiar.",
    embalagem: "Pote 900 g",
    unidadeCaixa: "Caixa com 6 potes",
    validade: "30 dias sob refrigeração",
    disponivel: true,
    destaque: false,
    imagem: "img/produtos/iogurte-salada-frutas.svg",
  },
  {
    id: "iog-natural-500",
    nome: "Iogurte Natural Integral 500g",
    categoria: "iogurtes",
    linha: "Iogurtes Carolina",
    descricao: "Sem adição de sabor, para consumo direto ou uso culinário.",
    embalagem: "Pote 500 g",
    unidadeCaixa: "Caixa com 12 potes",
    validade: "25 dias sob refrigeração",
    disponivel: true,
    destaque: false,
    imagem: "img/produtos/iogurte-natural.svg",
  },
  {
    id: "iog-graos-170",
    nome: "Iogurte com Grãos 170g",
    categoria: "iogurtes",
    linha: "Iogurtes Carolina",
    descricao: "Porção individual com cereais — ótimo giro em padarias e conveniências.",
    embalagem: "Pote 170 g",
    unidadeCaixa: "Bandeja com 24 unidades",
    validade: "25 dias sob refrigeração",
    disponivel: false,
    destaque: false,
    imagem: "img/produtos/iogurte-graos.svg",
  },

  /* ---------------------------- BEBIDA LÁCTEA --------------------------- */
  {
    id: "beb-morango-1l",
    nome: "Bebida Láctea Morango 1L",
    categoria: "bebida-lactea",
    linha: "Iogurtes Carolina",
    descricao: "Bebida láctea sabor morango, embalagem econômica de 1 litro.",
    embalagem: "Garrafa 1 L",
    unidadeCaixa: "Caixa com 12 garrafas",
    validade: "30 dias sob refrigeração",
    disponivel: true,
    destaque: false,
    imagem: "img/produtos/bebida-lactea-morango.svg",
  },
  {
    id: "beb-chocolate-1l",
    nome: "Bebida Láctea Chocolate 1L",
    categoria: "bebida-lactea",
    linha: "Iogurtes Carolina",
    descricao: "Sabor chocolate, alta aceitação no público infantil.",
    embalagem: "Garrafa 1 L",
    unidadeCaixa: "Caixa com 12 garrafas",
    validade: "30 dias sob refrigeração",
    disponivel: true,
    destaque: true,
    imagem: "img/produtos/bebida-lactea-chocolate.jpg",
  },

  /* ------------------------------ REQUEIJÃO ----------------------------- */
  {
    id: "req-copo-200",
    nome: "Requeijão Cremoso 200g",
    categoria: "requeijao",
    linha: "Iogurtes Carolina",
    descricao: "Requeijão cremoso tradicional em copo, pronto para gôndola.",
    embalagem: "Copo 200 g",
    unidadeCaixa: "Caixa com 24 copos",
    validade: "60 dias sob refrigeração",
    disponivel: true,
    destaque: true,
    imagem: "img/produtos/requeijao-copo.jpg",
  },
  {
    id: "req-barra-3kg",
    nome: "Requeijão em Barra 3kg",
    categoria: "requeijao",
    linha: "Iogurtes Carolina",
    descricao: "Formato food service, indicado para lanchonetes e pizzarias.",
    embalagem: "Barra 3 kg",
    unidadeCaixa: "Caixa com 2 barras",
    validade: "60 dias sob refrigeração",
    disponivel: true,
    destaque: true,
    imagem: "img/produtos/requeijao-barra.jpg",
  },

  /* -------------------------- LEITE FERMENTADO -------------------------- */
  {
    id: "lf-pack-6",
    nome: "Leite Fermentado — Pack 6x80g",
    categoria: "leite-fermentado",
    linha: "Iogurtes Carolina",
    descricao: "Leite fermentado em pack de 6 frascos, giro rápido no varejo.",
    embalagem: "Pack 6 × 80 g",
    unidadeCaixa: "Caixa com 8 packs",
    validade: "28 dias sob refrigeração",
    disponivel: true,
    destaque: true,
    imagem: "img/produtos/leite-fermentado.jpg",
  },

  /* ------------------------------- QUEIJOS ------------------------------ */
  {
    id: "queijo-minas-500",
    nome: "Queijo Minas Frescal 500g",
    categoria: "queijos",
    linha: "Linha complementar",
    descricao: "Queijo minas frescal peça de 500 g. Disponível sob encomenda.",
    embalagem: "Peça 500 g",
    unidadeCaixa: "Caixa com 10 peças",
    validade: "20 dias sob refrigeração",
    disponivel: false,
    destaque: false,
    imagem: "img/produtos/queijo-minas.jpg",
  },
];

/* Rótulos das categorias — usados nos filtros e nos cartões. */
const CATEGORIAS = {
  "iogurtes":         "Iogurtes",
  "bebida-lactea":    "Bebidas lácteas",
  "requeijao":        "Requeijão",
  "leite-fermentado": "Leite fermentado",
  "queijos":          "Queijos",
};

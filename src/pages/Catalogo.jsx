import React, { useState } from "react";

const produtosCatalogo = [
  {
    categoria: "Calçados",
    itens: [
      { nome: "Bota Gogowear", imagem: "plublic/img/Captura de tela 2025-07-14 131113.png" },
      { nome: "Bota Brown Estival", imagem: "plublic/img/Captura de tela 2025-07-14 131128.png" },
      { nome: "Bota Dubai", imagem: "plublic/img/Captura de tela 2025-07-14 131135.png" },
      { nome: "Sapato de Segurança", imagem: "plublic/img/Captura de tela 2025-07-14 131143.png" },
      { nome: "Bota Nobuck Lilac", imagem: "plublic/img/Captura de tela 2025-07-14 131151.png" },
      { nome: "Sapato Nobuck Lilac", imagem: "plublic/img/Captura de tela 2025-07-14 131159.png" },
      { nome: "Bota Bracol", imagem: "plublic/img/Captura de tela 2025-07-14 131210.png" },
      { nome: "Bota Borracha Cano Curto", imagem: "plublic/img/Captura de tela 2025-07-14 131223.png" },
      { nome: "Bota Borracha Cano Médio", imagem: "plublic/img/Captura de tela 2025-07-14 131229.png" },
      { nome: "Bota Borracha Cano Longo", imagem: "plublic/img/Captura de tela 2025-07-14 131236.png" },
    ],
    
  },
  // Adicione mais categorias aqui se quiser
  {
    categoria: "Oculos",
    itens: [
      { nome: "Óculos de Sol", imagem: "/produtos/oculos-sol.png" },
      { nome: "Óculos de Proteção", imagem: "/produtos/oculos-protecao.png" },
      { nome: "Óculos de Segurança", imagem: "/produtos/oculos-seguranca.png" },
      { nome: "Óculos de Natação", imagem: "/produtos/oculos-natacao.png" },
    ],
  },
  {
    categoria: "Acessórios",
    itens: [
      { nome: "Cinto de Segurança", imagem: "/produtos/cinto-seguranca.png" },
      { nome: "Luvas de Proteção", imagem: "/produtos   /luvas-protecao.png" },
      { nome: "Capacete de Segurança", imagem: "/produtos/capacete-seguranca.png" },
      { nome: "Máscara de Proteção", imagem: "/produtos/mascara-protecao.png" },
    ],
  },
  {
    categoria: "Prudutos de Limpeza",
    itens: [
      { nome: "Detergente Neutro", imagem: "/produtos/detergente-neutro.png" },
      { nome: "Desinfetante", imagem: "/produtos/desinfetante.png" },
      { nome: "Álcool Gel", imagem: "/produtos/alcool-gel.png" },
      { nome: "Sabão em Pó", imagem: "/produtos/sabao-po.png" },
    ],
  },   
];

export default function Catalogo() {
  const [carrinho, setCarrinho] = useState({});
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(produtosCatalogo[0].categoria);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prev) => ({
      ...prev,
      [produto]: (prev[produto] || 0) + 1,
    }));
  };

  const removerDoCarrinho = (produto) => {
    setCarrinho((prev) => {
      const quantidadeAtual = prev[produto] || 0;
      if (quantidadeAtual <= 1) {
        const novo = { ...prev };
        delete novo[produto];
        return novo;
      } else {
        return { ...prev, [produto]: quantidadeAtual - 1 };
      }
    });
  };

  const gerarMensagemWhatsapp = () => {
    if (Object.keys(carrinho).length === 0) {
      alert("Você ainda não selecionou nenhum item.");
      return;
    }

    const linhas = Object.entries(carrinho).map(
      ([produto, quantidade]) => `🔸 ${produto} — ${quantidade} unidade(s)`
    );

    const texto = `Pedido de orçamento:\n\n${linhas.join("\n")}\n\nCliente: `;
    const url = `https://api.whatsapp.com/send?phone=5591985378022&text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank");
  };

  const categoriaAtual = produtosCatalogo.find((c) => c.categoria === categoriaSelecionada);

  return (
    <div className="flex p-4 max-w-7xl mx-auto">
      {/* Sidebar de Categorias */}
      <div className="w-48 pr-4 border-r">
        <h2 className="text-lg font-semibold mb-2">Categorias</h2>
        <ul className="space-y-2">
          {produtosCatalogo.map((cat) => (
            <li
              key={cat.categoria}
              className={`cursor-pointer p-2 rounded hover:bg-gray-200 ${
                categoriaSelecionada === cat.categoria ? "bg-gray-300 font-bold" : ""
              }`}
              onClick={() => setCategoriaSelecionada(cat.categoria)}
            >
              {cat.categoria}
            </li>
          ))}
        </ul>
      </div>

      {/* Produtos */}
      <div className="flex-1 pl-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Catálogo de Produtos</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categoriaAtual.itens.map((produto) => (
            <div key={produto.nome} className="border rounded-xl p-4 flex flex-col items-center">
              <img src={produto.imagem} alt={produto.nome} className="h-32 object-contain mb-2" />
              <span className="text-center font-medium">{produto.nome}</span>
              <div className="flex items-center gap-2 mt-2">
                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => removerDoCarrinho(produto.nome)}>-</button>
                <span>{carrinho[produto.nome] || 0}</span>
                <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => adicionarAoCarrinho(produto.nome)}>+</button>
              </div>
            </div>
          ))}
        </div>

        {/* Resumo */}
        {Object.keys(carrinho).length > 0 && (
          <div className="mt-6 border-t pt-4">
            <h2 className="text-xl font-semibold mb-2">Resumo do Pedido</h2>
            <ul className="mb-4">
              {Object.entries(carrinho).map(([produto, quantidade]) => (
                <li key={produto}>🔸 {produto} — {quantidade} unidade(s)</li>
              ))}
            </ul>
            <button onClick={gerarMensagemWhatsapp} className="w-full bg-blue-600 text-white px-4 py-2 rounded">
              Enviar via WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

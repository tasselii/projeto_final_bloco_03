import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { listar } from "../../../services/Service";
import type Produto from "../../../models/Produto";
import CardProdutos from "../cardproduto/CardProdutos";

function ListarProdutosPorNome() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([]);
  const [filtroPreco, setFiltroPreco] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const { nome } = useParams<{ nome: string }>();

  async function buscarProdutosPeloNomeNaAPI() {
    if (!nome) {
      setProdutos([]);
      setProdutosFiltrados([]);
      return;
    }

    setIsLoading(true);
    try {
      await listar(`/produtos/nome/${nome}`, setProdutos);
    } catch (error: any) {
      console.error("Erro ao carregar produtos por nome:", error);
      setProdutos([]);
    } finally {
      setIsLoading(false);
    }
  }

  function aplicarFiltros() {
    let tempProdutos = [...produtos];

    if (filtroPreco) {
      tempProdutos = tempProdutos.filter((produto) => {
        const preco = produto.preco;
        if (filtroPreco === "20") return preco <= 20;
        if (filtroPreco === "2") return preco > 2 && preco <= 30;
        if (filtroPreco === "50") return preco > 50;
        return true;
      });
    }
    setProdutosFiltrados(tempProdutos);
  }

  function limparFiltroPreco() {
    setFiltroPreco("");
  }

  useEffect(() => {
    buscarProdutosPeloNomeNaAPI();
    setFiltroPreco("");
  }, [nome]);

  useEffect(() => {
    aplicarFiltros();
  }, [produtos, filtroPreco]);

  return (
    <>
      <div className=" flex flex-col justify-center container">
        <div className="flex flex-col mx-4">
          <h1 className="text-4xl text-center my-4">
            Resultados da busca por <span className="italic text-teal-800">{nome}</span>
          </h1>

          {isLoading && (
            <PacmanLoader
              color="#0D9488"
              margin={0}
              size={80}
              speedMultiplier={2}
              aria-label="Pacman-loading"
              className="mx-auto my-8"
            />
          )}

          {!isLoading && produtosFiltrados.length === 0 && (
            <div className="text-center my-4">
              <h2 className="text-2xl text-indigo-50">Nenhum produto encontrado para "{nome}"</h2>
            </div>
          )}

          <div className="flex gap-4">
            <div className="flex flex-col w-1/5 ml-4 my-15 p-4 border rounded-lg border-slate-400">
              <h3 className="text-base font-bold py-2">Preço:</h3>
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="preco"
                  value="20"
                  checked={filtroPreco === "20"}
                  onChange={(e) => setFiltroPreco(e.target.value)}
                />
                <label htmlFor="20"> Até R$ 20,00</label>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="preco"
                  value="2"
                  checked={filtroPreco === "2"}
                  onChange={(e) => setFiltroPreco(e.target.value)}
                />
                <label htmlFor="5"> R$ 2,00 - R$30,00</label>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="preco"
                  value="50"
                  checked={filtroPreco === "50"}
                  onChange={(e) => setFiltroPreco(e.target.value)}
                />
                <label htmlFor="m50">Acima de R$ 50,00</label>
              </div>
              <div className="mt-8">
                <button
                  className="flex justify-center w-1/2 py-2 mx-auto font-bold text-white rounded bg-teal-500 hover:bg-teal-700"
                  onClick={limparFiltroPreco}>
                  Limpar
                </button>
              </div>
            </div>

            {!isLoading && produtosFiltrados.length > 0 && (
              <div className="container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {produtosFiltrados.map((produto) => (
                  <CardProdutos key={produto.id} produto={produto} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListarProdutosPorNome;
